// app.js — File JS duy nhất tạo toàn bộ trang "Chúc mừng 20/10" + nhạc nền tổng hợp + ảnh/ảnh động (floating petals)
// Cách dùng: tạo một file index.html rỗng với chỉ <script src="app.js"></script> trong body,
// hoặc paste toàn bộ nội dung này vào console để thử.

(() => {
  // --- Meta + Title ---
  document.title = 'Chúc mừng 20/10';
  const metaViewport = document.createElement('meta');
  metaViewport.name = 'viewport';
  metaViewport.content = 'width=device-width,initial-scale=1';
  const metaCharset = document.createElement('meta');
  metaCharset.charset = 'utf-8';
  document.head.appendChild(metaCharset);
  document.head.appendChild(metaViewport);

  // --- CSS động ---
  const css = `
  :root{
    --bg1: #fff7fb;
    --bg2: #fff0f6;
    --accent: #ff477e;
    --muted: #6b6b6b;
    --card-bg: rgba(255,255,255,0.85);
  }
  *{box-sizing:border-box}
  html,body{height:100%}
  body{
    margin:0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(160deg,var(--bg1),var(--bg2));
    display:flex;
    align-items:center;
    justify-content:center;
    padding:18px;
    color:#222;
    overflow-x:hidden;
  }
  .container{width:100%;max-width:980px;position:relative;z-index:10}
  .card{
    background: linear-gradient(180deg, rgba(255,255,255,0.95), var(--card-bg));
    border-radius:16px;
    padding:24px;
    box-shadow: 0 8px 30px rgba(16, 24, 40, 0.08);
    backdrop-filter: blur(6px);
  }
  h1{
    margin:0 0 8px 0;
    font-size:2rem;
    color:var(--accent);
    letter-spacing:0.4px;
  }
  .subtitle{
    margin:0 0 14px 0;
    color:var(--muted);
  }
  .greeting{
    display:flex;
    gap:14px;
    align-items:center;
    flex-wrap:wrap;
  }
  .rose{width:160px;height:160px;flex:0 0 160px;display:flex;align-items:center;justify-content:center}
  .rose-svg{width:140px;height:140px;filter:drop-shadow(0 6px 18px rgba(255,77,136,0.12))}
  .message{flex:1;min-width:220px}
  .message p{margin:0 0 12px 0;font-size:1.05rem;color:#333}
  .controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px}
  .btn{
    background:var(--accent);
    color:white;
    border:0;
    padding:10px 14px;
    border-radius:10px;
    cursor:pointer;
    font-weight:600;
    transition:transform .12s ease, box-shadow .12s ease;
  }
  .btn:active{transform:translateY(1px)}
  .btn:hover{box-shadow:0 6px 18px rgba(255,71,126,0.18)}
  .btn-outline{
    background:transparent;
    color:var(--accent);
    border:2px solid rgba(255,71,126,0.18);
    font-weight:700;
    padding:8px 12px;
  }
  .notes{margin-top:12px;color:var(--muted);font-size:.95rem}
  .footer{text-align:center;margin-top:12px;color:var(--muted);font-size:.95rem}
  #confettiCanvas{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:20}
  /* floating petals layer */
  .petal-layer{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:5}
  .petal{
    position:absolute;
    width:28px;
    height:28px;
    opacity:0.9;
    will-change:transform,opacity;
    filter:drop-shadow(0 6px 16px rgba(0,0,0,0.06));
    transform-origin:center;
  }
  @keyframes floatDown {
    0% { transform: translateY(-10vh) rotate(0deg) scale(0.8); opacity:0 }
    10% { opacity:1 }
    100% { transform: translateY(110vh) rotate(360deg) scale(1); opacity:0.95 }
  }
  /* mini music controls */
  .music-controls{display:flex;gap:8px;align-items:center}
  .slider{width:110px}
  .bg-image-input{display:flex;gap:8px;align-items:center;margin-left:6px}
  .bg-preview{width:56px;height:40px;border-radius:8px;object-fit:cover;border:1px solid rgba(0,0,0,0.06)}
  .small{font-size:.9rem;padding:6px 10px;border-radius:8px}
  /* responsive */
  @media (max-width:640px){
    .rose{width:120px;height:120px}
    .rose-svg{width:110px;height:110px}
    .card{padding:16px}
    h1{font-size:1.5rem}
    .slider{width:80px}
  }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // --- DOM chính ---
  const container = document.createElement('div');
  container.className = 'container';

  const card = document.createElement('main');
  card.className = 'card';

  const h1 = document.createElement('h1');
  h1.textContent = 'Chúc mừng ngày 20/10!';

  const subtitle = document.createElement('p');
  subtitle.className = 'subtitle';
  subtitle.textContent = 'Gửi tới những người phụ nữ tuyệt vời — chúc bạn luôn hạnh phúc, mạnh mẽ và tràn đầy yêu thương.';

  const greeting = document.createElement('div');
  greeting.className = 'greeting';

  const rose = document.createElement('div');
  rose.className = 'rose';
  rose.innerHTML = `
    <svg viewBox="0 0 200 200" class="rose-svg" aria-hidden="true" role="img">
      <defs>
        <radialGradient id="g1" cx="30%" cy="30%">
          <stop offset="0%" stop-color="#fff1f5"/>
          <stop offset="100%" stop-color="#ff8fb8"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#g1)" />
      <g transform="translate(40,30)">
        <path d="M40 60 C10 20, 70 10, 70 60 C75 95, 20 95, 40 60 Z" fill="#ff4d88"/>
        <path d="M58 48 C76 20, 110 32, 92 62 C78 86, 46 76, 58 48 Z" fill="#ff6da3" opacity="0.9"/>
        <path d="M24 44 C4 18, 28 -2, 52 14 C34 26, 18 36, 24 44 Z" fill="#ff6da3" opacity="0.95"/>
        <rect x="34" y="72" width="4" height="40" rx="2" fill="#2e8b57" />
        <path d="M38 90 C10 110, 60 110, 38 90 Z" fill="#2e8b57" />
      </g>
    </svg>
  `;

  const message = document.createElement('div');
  message.className = 'message';
  const msgP = document.createElement('p');
  msgP.textContent = 'Ngày đặc biệt, yêu thương thật nhiều — gửi tặng bạn đóa hoa và nụ cười.';

  // Buttons and music controls
  const controls = document.createElement('div');
  controls.className = 'controls';

  const celebrateBtn = document.createElement('button');
  celebrateBtn.id = 'celebrateBtn';
  celebrateBtn.className = 'btn';
  celebrateBtn.textContent = 'Bấm để mừng 20/10';

  const shareBtn = document.createElement('button');
  shareBtn.id = 'shareBtn';
  shareBtn.className = 'btn btn-outline';
  shareBtn.textContent = 'Chia sẻ';

  // Music controls
  const musicWrap = document.createElement('div');
  musicWrap.className = 'music-controls';

  const playBtn = document.createElement('button');
  playBtn.className = 'btn small';
  playBtn.textContent = 'Phát nhạc';

  const volSlider = document.createElement('input');
  volSlider.type = 'range';
  volSlider.min = '0';
  volSlider.max = '1';
  volSlider.step = '0.01';
  volSlider.value = '0.55';
  volSlider.className = 'slider';

  const muteBtn = document.createElement('button');
  muteBtn.className = 'btn btn-outline small';
  muteBtn.textContent = 'Tắt âm';

  // Background image input (user có thể nhập URL để thay hình nền)
  const bgInputWrap = document.createElement('div');
  bgInputWrap.className = 'bg-image-input';
  const bgInput = document.createElement('input');
  bgInput.type = 'text';
  bgInput.placeholder = 'URL ảnh nền (tuỳ chọn)';
  bgInput.style.padding = '8px';
  bgInput.style.borderRadius = '8px';
  bgInput.style.border = '1px solid rgba(0,0,0,0.06)';
  bgInput.style.width = '220px';
  const bgApply = document.createElement('button');
  bgApply.className = 'btn btn-outline small';
  bgApply.textContent = 'Áp dụng';
  const bgPreview = document.createElement('img');
  bgPreview.className = 'bg-preview';
  bgPreview.alt = 'preview';
  bgPreview.src = '';
  bgPreview.style.display = 'none';

  bgInputWrap.appendChild(bgInput);
  bgInputWrap.appendChild(bgApply);
  bgInputWrap.appendChild(bgPreview);

  musicWrap.appendChild(playBtn);
  musicWrap.appendChild(volSlider);
  musicWrap.appendChild(muteBtn);
  controls.appendChild(celebrateBtn);
  controls.appendChild(shareBtn);
  controls.appendChild(musicWrap);
  controls.appendChild(bgInputWrap);

  message.appendChild(msgP);
  message.appendChild(controls);

  greeting.appendChild(rose);
  greeting.appendChild(message);

  const notes = document.createElement('div');
  notes.className = 'notes';
  notes.textContent = 'Ghi chú: Nhấn "Phát nhạc" để bật nhạc nền (trình duyệt yêu cầu thao tác người dùng). Bạn có thể dán URL ảnh nền và bấm "Áp dụng".';

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.textContent = 'Thiết kế với ♥ — Chúc một ngày 20/10 thật ý nghĩa!';

  card.appendChild(h1);
  card.appendChild(subtitle);
  card.appendChild(greeting);
  card.appendChild(notes);
  card.appendChild(footer);

  container.appendChild(card);
  document.body.innerHTML = ''; // dọn body trước khi append
  document.body.appendChild(container);

  // Canvas cho confetti
  const canvas = document.createElement('canvas');
  canvas.id = 'confettiCanvas';
  document.body.appendChild(canvas);

  // Petal animation layer
  const petalLayer = document.createElement('div');
  petalLayer.className = 'petal-layer';
  document.body.appendChild(petalLayer);

  // --- Confetti particle system (giữ lại) ---
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const particles = [];
  const colors = ['#ff6b9a', '#ffd166', '#8bd3c7', '#ff9b72', '#c89bff'];

  function rand(min, max){ return Math.random()*(max-min)+min; }

  class Particle {
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.w = rand(6,12);
      this.h = rand(6,12);
      this.vx = rand(-6,6);
      this.vy = rand(-12,-4);
      this.r = rand(0,360);
      this.rr = rand(-6,6);
      this.color = colors[Math.floor(rand(0,colors.length))];
      this.gravity = rand(0.15,0.35);
      this.ttl = 200 + Math.random()*80;
    }
    update(){
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.r += this.rr;
      this.ttl--;
    }
    draw(ctx){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r * Math.PI / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
      ctx.restore();
    }
  }

  function emit(x,y,amount=30){
    for(let i=0;i<amount;i++){
      particles.push(new Particle(x + rand(-10,10), y + rand(-10,10)));
    }
  }

  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  addEventListener('resize', () => {
    resize();
    // reposition petals if needed (not strict)
  });

  function loop(){
    ctx.clearRect(0,0,W,H);
    for(let i = particles.length - 1; i >= 0; i--){
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if(p.ttl <= 0 || p.y > H + 50 || p.x < -50 || p.x > W + 50){
        particles.splice(i,1);
      }
    }
    requestAnimationFrame(loop);
  }

  setTimeout(()=> emit(W/2, H/3, 80), 400);

  // --- Petals: tạo nhiều petal SVG và animate bằng CSS ---
  const petalSVG = (color) => `
    <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2 C14 5, 20 6, 19 11 C18 16, 14 20, 10 19 C6 18,4 14,5 9 C6 4,10 1,12 2 Z" fill="${color}"/>
    </svg>
  `;

  function spawnPetal() {
    const p = document.createElement('div');
    p.className = 'petal';
    const color = ['#ff8fb8','#ff5e9e','#ffc2db','#ffd166'][Math.floor(rand(0,4))];
    p.innerHTML = petalSVG(color);
    const startX = rand(-5,105); // percent of viewport width (set using left in %)
    p.style.left = `${startX}vw`;
    p.style.top = `${-6}vh`;
    const scale = rand(0.6,1.2);
    p.style.width = `${28*scale}px`;
    p.style.height = `${28*scale}px`;
    const duration = rand(8,20);
    p.style.animation = `floatDown ${duration}s linear forwards`;
    p.style.animationDelay = `${rand(0,4)}s`;
    petalLayer.appendChild(p);
    // remove after animation to keep DOM clean
    setTimeout(()=> {
      if (p.parentNode) p.parentNode.removeChild(p);
    }, (duration + 6) * 1000);
  }

  // spawn petals periodically
  const petalInterval = setInterval(() => {
    const count = Math.floor(rand(1,3));
    for(let i=0;i<count;i++) spawnPetal();
  }, 900);

  // --- Audio (WebAudio) — tạo nhạc nền tổng hợp nhẹ ---
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  let masterGain = null;
  let isPlaying = false;
  let melodyTimer = null;
  let activeOscs = [];

  function initAudio() {
    if (audioCtx) return;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = Number(volSlider.value);
    masterGain.connect(audioCtx.destination);

    // gentle reverb-like (convolver omitted for simplicity)
    // create filter for mellow sound
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.7;
    filter.connect(masterGain);

    // store filter as destination for oscillators
    audioCtx._filter = filter;
  }

  function startAmbient() {
    if (!audioCtx) initAudio();
    if (isPlaying) return;
    isPlaying = true;

    // small chord progression pattern (synth pads using 2 oscillators per voice)
    const progression = [
      [440, 550, 660], // A major-ish cluster
      [392, 494, 588], // G cluster
      [440, 523.25, 659.25], // A, C#, E (A major)
      [349.23, 440, 523.25] // F, A, C (F major-ish)
    ];
    let idx = 0;

    function playChord(chord, dur = 1800) {
      // create ensemble of oscillators with slight detune
      const now = audioCtx.currentTime;
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.0, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.6);
      gainNode.gain.linearRampToValueAtTime(0.06, now + dur / 1000 - 0.4);
      gainNode.gain.linearRampToValueAtTime(0.0, now + dur / 1000);
      gainNode.connect(audioCtx._filter);

      const oscs = [];
      chord.forEach((freq, i) => {
        // two oscillators per note for richness
        const o1 = audioCtx.createOscillator();
        o1.type = 'sine';
        o1.frequency.value = freq * rand(0.995,1.005);
        o1.detune.value = rand(-8,8);
        const o2 = audioCtx.createOscillator();
        o2.type = 'triangle';
        o2.frequency.value = freq * rand(0.995,1.01);
        o2.detune.value = rand(-10,10);

        o1.connect(gainNode);
        o2.connect(gainNode);
        o1.start(now);
        o2.start(now);
        o1.stop(now + dur/1000 + 0.1);
        o2.stop(now + dur/1000 + 0.1);
        oscs.push(o1, o2);
      });
      // track to possibly stop if needed
      activeOscs.push({oscs, gainNode});
      // cleanup after done
      setTimeout(() => {
        // remove from activeOscs
        for (let j = 0; j < activeOscs.length; j++) {
          if (activeOscs[j].gainNode === gainNode) activeOscs.splice(j,1);
        }
      }, dur + 200);
    }

    // start loop
    playChord(progression[idx], 2000);
    idx = (idx + 1) % progression.length;
    melodyTimer = setInterval(() => {
      playChord(progression[idx], 2000);
      idx = (idx + 1) % progression.length;
    }, 2000);
  }

  function stopAmbient() {
    if (!isPlaying) return;
    isPlaying = false;
    if (melodyTimer) {
      clearInterval(melodyTimer);
      melodyTimer = null;
    }
    // reduce gain and stop remaining oscillators
    if (masterGain) {
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    }
    // active oscillators will stop by themselves (we scheduled stops)
    activeOscs = [];
  }

  // --- UI interactions ---
  playBtn.addEventListener('click', async () => {
    // user gesture required for autoplay in many browsers
    if (!audioCtx) initAudio();
    // resume context if suspended
    if (audioCtx.state === 'suspended') {
      try { await audioCtx.resume(); } catch(e){ /* ignore */ }
    }
    if (!isPlaying) {
      startAmbient();
      playBtn.textContent = 'Tạm dừng nhạc';
    } else {
      stopAmbient();
      playBtn.textContent = 'Phát nhạc';
    }
  });

  volSlider.addEventListener('input', () => {
    if (masterGain) masterGain.gain.setTargetAtTime(Number(volSlider.value), audioCtx ? audioCtx.currentTime : 0, 0.01);
  });

  muteBtn.addEventListener('click', () => {
    if (!masterGain) initAudio();
    if (masterGain.gain.value > 0.001) {
      masterGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.01);
      muteBtn.textContent = 'Bật âm';
      volSlider.dataset.prev = volSlider.value;
      volSlider.value = '0';
    } else {
      const prev = volSlider.dataset.prev || '0.55';
      volSlider.value = prev;
      masterGain.gain.setTargetAtTime(Number(prev), audioCtx.currentTime, 0.01);
      muteBtn.textContent = 'Tắt âm';
    }
  });

  // background image apply
  bgApply.addEventListener('click', () => {
    const url = bgInput.value.trim();
    if (!url) {
      // remove custom bg
      document.body.style.background = '';
      bgPreview.style.display = 'none';
      return;
    }
    // quick validation: try loading image
    const img = new Image();
    img.onload = () => {
      document.body.style.background = `linear-gradient(160deg,var(--bg1),var(--bg2)), url('${url}') center/cover no-repeat`;
      bgPreview.src = url;
      bgPreview.style.display = 'block';
    };
    img.onerror = () => {
      alert('Không tải được ảnh từ URL này. Vui lòng kiểm tra và thử lại.');
    };
    img.src = url;
  });

  // Celebrate button
  celebrateBtn.addEventListener('click', (e) => {
    const rect = celebrateBtn.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    emit(x, y, 120);
    let count = 0;
    const interval = setInterval(()=>{
      emit(rand(x-150,x+150), rand(y-150,y+150), 60);
      count++;
      if(count>6) clearInterval(interval);
    }, 220);
    if (h1.animate) {
      h1.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.06)' },
        { transform: 'scale(1)' }
      ], { duration: 800, iterations: 1, easing: 'cubic-bezier(.2,.8,.2,1)'});
    }
    // also trigger a small petal burst
    for (let i=0;i<10;i++) spawnPetal();
    // start music automatically on user gesture if not started
    if (!isPlaying) {
      playBtn.click();
      playBtn.textContent = 'Tạm dừng nhạc';
    }
  });

  // Share button: share or copy
  shareBtn.addEventListener('click', async () => {
    const text = 'Chúc mừng 20/10! Gửi tới bạn niềm vui và hạnh phúc 💐';
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, text });
        return;
      } catch (err) { /* continue to clipboard */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      const prev = shareBtn.textContent;
      shareBtn.textContent = 'Đã sao chép!';
      setTimeout(()=> shareBtn.textContent = prev, 1800);
    } catch (e) {
      alert('Không thể sao chép tự động. Hãy sao chép thủ công:\n\n' + text);
    }
  });

  // click anywhere emits small confetti/petals
  document.addEventListener('click', (ev) => {
    emit(ev.clientX, ev.clientY, 28);
    // spawn small petals near click
    for (let i=0;i<3;i++) spawnPetal();
  });

  // keyboard support
  celebrateBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') celebrateBtn.click();
  });

  // start confetti loop
  loop();

  // Endless ambient: keep the petalInterval and melodyTimer running until user stops music
  // If user navigates away, stop audio to free resources
  window.addEventListener('pagehide', () => {
    stopAmbient();
    clearInterval(petalInterval);
  });

  // --- Done: file JS duy nhất đã tạo giao diện, confetti, floating petals, và music synth nhẹ ---
  // Bạn bây giờ có: 1) Nút "Phát nhạc" để bật/tắt nhạc nền tổng hợp; 2) Slider điều chỉnh âm lượng và mute; 3) Layer ảnh nền có thể gán bằng URL; 4) Hiệu ứng confetti & petals.
  // Nếu bạn muốn mình thay nhạc synth bằng file mp3 (ví dụ: gắn URL mp3 mặc định hoặc mã hóa base64), hoặc muốn mình thêm nút tải về/chia sẻ ảnh nền -> nói mình sẽ cập nhật.
})();
