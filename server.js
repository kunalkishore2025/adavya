const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware — keeps track of current challenge & solved stage flags
app.use(session({
  secret: 'cyber-freshers-2026-secret-key-scavenger-hunt',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 hour
  }
}));

// Serve static assets from /public (CSS, images, client scripts)
app.use(express.static(path.join(__dirname, 'public'), {
  index: 'index.html'
}));

// ─── Helper Functions / File Utilities ──────────────────────

/**
 * Reads Fake_Url.txt and separates into:
 * - First 60 lines: 'easy' syntax errors
 * - Next 40 lines: 'hard' syntax errors
 */
function getFakeUrls() {
  const filePath = path.join(__dirname, 'Fake_Url.txt');
  const lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  return {
    easyUrls: lines.slice(0, 60),
    hardUrls: lines.slice(60, 100)
  };
}

/**
 * Reads Good_Links.txt and returns an array of valid decoy URLs
 */
function getGoodLinks() {
  const filePath = path.join(__dirname, 'Good_Links.txt');
  return fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);
}

/**
 * Reads message.txt and parses comma-separated Plaintext,Ciphertext pairs
 */
function getMessagePairs() {
  const filePath = path.join(__dirname, 'message.txt');
  const lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  return lines.map(line => {
    const commaIndex = line.indexOf(',');
    return {
      plaintext: line.substring(0, commaIndex).trim(),
      ciphertext: line.substring(commaIndex + 1)
    };
  });
}

/**
 * Randomly pick N distinct elements from an array
 */
function pickRandomDistinct(arr, count) {
  const copy = [...arr];
  const selected = [];
  const numToPick = Math.min(count, copy.length);

  for (let i = 0; i < numToPick; i++) {
    const randIdx = Math.floor(Math.random() * copy.length);
    selected.push(copy[randIdx]);
    copy.splice(randIdx, 1);
  }

  return selected;
}

/**
 * Fisher-Yates in-place shuffle
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── STAGE 1: The Link Shuffle Routes ───────────────────────

/**
 * GET /api/links
 * Dynamically selects:
 * - 6 random easy URLs from Fake_Url.txt (first 60 lines)
 * - 4 random hard URLs from Fake_Url.txt (next 40 lines)
 * - 1 random valid URL text from Good_Links.txt
 * Shuffles all 11 items and returns them.
 */
app.get('/api/links', (req, res) => {
  try {
    const { easyUrls, hardUrls } = getFakeUrls();
    const goodLinks = getGoodLinks();

    const selectedEasy = pickRandomDistinct(easyUrls, 7);
    const selectedHard = pickRandomDistinct(hardUrls, 7);
    const selectedGood = pickRandomDistinct(goodLinks, 1);

    // Build the 10 bad items (route to /dead-end)
    const badItems = [...selectedEasy, ...selectedHard].map(url => ({
      text: url,
      href: '/dead-end',
      isValid: false
    }));

    // Build the 1 valid item (route to /challenge)
    const goodItem = {
      text: selectedGood[0] || 'https://cyber-ops.security-cell.org/terminal',
      href: '/challenge',
      isValid: true
    };

    // Combine and shuffle 11 items
    const allLinks = shuffleArray([...badItems, goodItem]);

    res.json({ links: allLinks });
  } catch (err) {
    console.error('Error in /api/links:', err);
    res.status(500).json({ error: 'Failed to generate link shuffle.' });
  }
});

/**
 * GET /dead-end
 * Generic "Dead End" HTML page displaying "Oops You hit a dead end"
 */
app.get('/dead-end', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dead-end.html'));
});

// ─── STAGE 2: Rail Fence Cipher Challenge Routes ────────────

/**
 * GET /challenge
 * Serves Stage 2: Rail Fence Cipher challenge page
 */
app.get('/challenge', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'challenge.html'));
});

/**
 * GET /api/challenge-question
 * Randomly selects one line from message.txt,
 * stores the expected ciphertext in session,
 * and sends only the Plaintext to the frontend.
 */
app.get('/api/challenge-question', (req, res) => {
  try {
    const pairs = getMessagePairs();
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    // Store current challenge in session
    req.session.currentChallenge = {
      plaintext: randomPair.plaintext,
      ciphertext: randomPair.ciphertext
    };

    // Return only plaintext
    res.json({ plaintext: randomPair.plaintext });
  } catch (err) {
    console.error('Error in /api/challenge-question:', err);
    res.status(500).json({ error: 'Failed to load challenge question.' });
  }
});

/**
 * POST /api/verify-cipher
 * Strictly verifies user's answer against the ciphertext paired with
 * the currently active challenge in the user's session.
 */
app.post('/api/verify-cipher', (req, res) => {
  if (!req.session.currentChallenge) {
    return res.status(400).json({
      success: false,
      message: 'SESSION EXPIRED — Please refresh the page to load a new challenge.'
    });
  }

  const userAnswer = (req.body.answer || '');
  const expected = req.session.currentChallenge.ciphertext;

  // Strict verification (with tolerance for trimmed newline/trailing carriage returns)
  const isMatch = (userAnswer === expected) || (userAnswer.trim() === expected.trim());

  if (isMatch) {
    // Set session flag marking Stage 2 as solved
    req.session.stage2Solved = true;
    return res.json({
      success: true,
      message: 'ACCESS GRANTED — Cipher verified.',
      redirect: '/payload'
    });
  } else {
    return res.json({
      success: false,
      message: 'ACCESS DENIED — Cipher text incorrect. Try again.'
    });
  }
});

// ─── STAGE 3: The Final Payload Routes ──────────────────────

/**
 * GET /payload
 * Protected page — only accessible after solving Stage 2.
 */
app.get('/payload', (req, res) => {
  if (!req.session || !req.session.stage2Solved) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'views', 'payload.html'));
});

/**
 * GET /download
 * Protected file download — only accessible after solving Stage 2.
 */
app.get('/download', (req, res) => {
  if (!req.session || !req.session.stage2Solved) {
    return res.status(403).json({
      error: 'ACCESS DENIED — Complete the cipher challenge first.'
    });
  }

  const filePath = path.join(__dirname, 'protected', 'Vault.zip');
  res.download(filePath, 'Vault_File.zip');

});

/**
 * POST /api/verify-secret
 * Endpoint to verify the final secret code VmljdG9yeSA=
 */
app.post('/api/verify-secret', (req, res) => {
  const code = (req.body.code || '').trim();
  if (code === 'You Succeeded!') {
    return res.json({ success: true, message: 'Hacked' });
  }
  return res.json({ success: false, message: 'Invalid code.' });
});

// Backwards compatibility for /success route
app.get('/success', (req, res) => {
  if (!req.session || !req.session.stage2Solved) {
    return res.redirect('/');
  }
  res.redirect('/payload');
});

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log('──────────────────────────────────────────');
  console.log("  Freshers' Hiest 2026 — 3-Stage Scavenger Hunt");
  console.log('──────────────────────────────────────────');
  console.log(`  🔐 Server running at http://localhost:${PORT}`);
  console.log('──────────────────────────────────────────');
});
