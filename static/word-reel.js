(function () {
  const root = document.querySelector('[data-word-reel]');
  if (!root) return;

  const words = [
    '好奇', '热爱', '专注', '突破', '协作', '创造', '远见', '行动', '坚持', '成长',
    '勇气', '温度', '思考', '探索', '连接', '表达', '沉淀', '进化', '闪光', '自由'
  ];

  const viewport = root.querySelector('.word-reel__viewport');
  const lane = root.querySelector('.word-reel__lane');
  const historyList = root.querySelector('.word-reel__history-list');
  const speedInput = root.querySelector('#word-speed');
  const speedValue = root.querySelector('.word-reel__speed-value');

  const state = {
    position: 0,
    velocity: 0.18,
    autoSpeed: 0.18,
    touchY: null,
    history: []
  };

  const wrap = (index) => ((index % words.length) + words.length) % words.length;
  const ease = (current, target, factor) => current + (target - current) * factor;

  function pushHistory(index) {
    const text = words[wrap(index)];
    if (state.history[state.history.length - 1] === text) return;
    state.history.push(text);
    if (state.history.length > 12) state.history.shift();
    historyList.innerHTML = state.history.map((item) => `<li>${item}</li>`).join('');
  }

  function spawnExit(word, fromTop) {
    const ghost = document.createElement('span');
    ghost.className = `word-reel__ghost ${fromTop ? 'is-top' : 'is-bottom'}`;
    ghost.textContent = word;
    lane.appendChild(ghost);
    window.setTimeout(() => ghost.remove(), 750);
  }

  function draw() {
    lane.innerHTML = '';

    for (let i = -4; i <= 4; i++) {
      const virtual = state.position + i;
      const index = Math.round(virtual);
      const distance = index - state.position;
      if (Math.abs(distance) > 1.8) continue;

      const word = words[wrap(index)];
      const el = document.createElement('div');
      el.className = 'word-reel__word';
      if (Math.abs(distance) < 0.22) el.classList.add('is-center');

      const y = distance * 78;
      const scale = Math.max(0.55, 1.1 - Math.abs(distance) * 0.34);
      const opacity = Math.max(0, 1 - Math.abs(distance) * 0.7);

      el.style.transform = `translate(-50%, calc(-50% + ${y}px)) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.textContent = word;
      lane.appendChild(el);
    }
  }

  function tick(prevInt) {
    const nextPosition = state.position + state.velocity * 0.016;
    const nextInt = Math.floor(nextPosition);

    if (nextInt > prevInt) {
      pushHistory(nextInt - 1);
      spawnExit(words[wrap(nextInt - 2)], true);
    }

    if (nextInt < prevInt) {
      spawnExit(words[wrap(nextInt + 2)], false);
    }

    state.position = nextPosition;
    state.velocity = ease(state.velocity, state.autoSpeed, 0.03);
    draw();

    requestAnimationFrame(() => tick(nextInt));
  }

  viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    state.velocity += event.deltaY * 0.00035;
    state.velocity = Math.max(-0.75, Math.min(0.75, state.velocity));
  }, { passive: false });

  viewport.addEventListener('touchstart', (event) => {
    state.touchY = event.touches[0].clientY;
  }, { passive: true });

  viewport.addEventListener('touchmove', (event) => {
    if (state.touchY == null) return;
    const currentY = event.touches[0].clientY;
    const delta = state.touchY - currentY;
    state.touchY = currentY;
    state.velocity += delta * 0.0006;
    state.velocity = Math.max(-0.75, Math.min(0.75, state.velocity));
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    state.touchY = null;
  }, { passive: true });

  speedInput.addEventListener('input', () => {
    const value = Number(speedInput.value);
    state.autoSpeed = value;
    speedValue.textContent = value.toFixed(2);
  });

  speedValue.textContent = state.autoSpeed.toFixed(2);
  pushHistory(-1);
  pushHistory(0);
  draw();
  requestAnimationFrame(() => tick(Math.floor(state.position)));
})();
