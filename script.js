(function () {
  'use strict';

  const ANSWERS = { q1:'b', q2:'a', q3:'b', q4:'a', q5:'a',
                    q6:'b', q7:'c', q8:'c', q9:'a', q10:'a' };
  const TOTAL   = 10;
  const CIRC    = 314;

  let current = 0;

  const elHero   = document.getElementById('section-hero');
  const elQuiz   = document.getElementById('section-quiz');
  const elResult = document.getElementById('section-result');
  const elRail   = document.getElementById('progress-rail');
  const elFill   = document.getElementById('progress-fill');
  const elStep   = document.getElementById('step-label');
  const btnStart = document.getElementById('btn-start');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');
  const btnRetry = document.getElementById('btn-retry');
  const cards    = document.querySelectorAll('.q-card');

  // Highlight selected choice
  document.querySelectorAll('.choice input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll(`input[name="${r.name}"]`).forEach(s =>
        s.closest('.choice').classList.remove('selected')
      );
      r.closest('.choice').classList.add('selected');
    });
  });

  function updateNav(idx) {
    elFill.style.width          = ((idx + 1) / TOTAL * 100) + '%';
    elStep.textContent          = `${idx + 1} / ${TOTAL}`;
    btnPrev.style.visibility    = idx === 0 ? 'hidden' : 'visible';
    btnNext.textContent         = idx === TOTAL - 1 ? '提交答案' : '下一題';
  }

  function navigate(dir) {
    const next = current + dir;
    if (next < 0 || next >= TOTAL) return;

    const from = cards[current];
    const to   = cards[next];

    // Snap entering card off-screen without transition
    to.style.transition = 'none';
    to.style.transform  = `translateX(${dir > 0 ? '28px' : '-28px'})`;
    to.style.opacity    = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        to.style.transition = '';
        to.style.transform  = '';
        to.style.opacity    = '';

        from.classList.add(dir > 0 ? 'exit-left' : 'exit-right');
        from.classList.remove('active');
        to.classList.add('active');

        current = next;
        updateNav(current);

        setTimeout(() => from.classList.remove('exit-left', 'exit-right'), 420);
      });
    });
  }

  btnStart.addEventListener('click', () => {
    elHero.hidden = true;
    elQuiz.hidden = false;
    elRail.classList.add('on');
    updateNav(0);
    requestAnimationFrame(() => elQuiz.scrollIntoView({ behavior: 'smooth' }));
  });

  btnNext.addEventListener('click', () => {
    if (current < TOTAL - 1) navigate(1);
    else showResult();
  });

  btnPrev.addEventListener('click', () => navigate(-1));

  function showResult() {
    let score = 0;
    Object.entries(ANSWERS).forEach(([name, correct]) => {
      const el = document.querySelector(`input[name="${name}"]:checked`);
      if (el && el.value === correct) score++;
    });

    elQuiz.hidden   = true;
    elResult.hidden = false;
    elRail.classList.remove('on');
    requestAnimationFrame(() => elResult.scrollIntoView({ behavior: 'smooth' }));

    const pct  = Math.round((score / TOTAL) * 100);
    const msgs = [
      '繼續加油，台灣還有很多值得探索的知識！',
      '已經有點基礎了，多讀讀台灣的故事吧。',
      '有進步的空間，再試一次吧！',
      '還不錯，繼續努力！',
      '答對一半了，慢慢來！',
      '過半了！你已經掌握不少台灣知識。',
      '不錯！繼續加油，很快就能全對了。',
      '相當好！只差三題，再努力一下。',
      '很優秀！知識非常豐富。',
      '幾乎完美！只差一題。',
      '滿分！你對台灣有非常深刻的了解。'
    ];

    document.getElementById('result-headline').textContent = `答對 ${score} / ${TOTAL}`;
    document.getElementById('result-desc').textContent     = msgs[score];
    document.getElementById('ring-pct').textContent        = `${pct}%`;

    setTimeout(() => {
      document.getElementById('ring-score').style.strokeDashoffset =
        CIRC - (pct / 100) * CIRC;
    }, 100);
  }

  btnRetry.addEventListener('click', () => {
    document.querySelectorAll('input[type="radio"]').forEach(r => {
      r.checked = false;
      r.closest('.choice').classList.remove('selected');
    });

    // Snap all cards to hidden state without animation
    cards.forEach(c => {
      c.classList.remove('active', 'exit-left', 'exit-right');
      c.style.transition = 'none';
      c.style.transform  = 'translateX(28px)';
      c.style.opacity    = '0';
    });
    cards[0].style.transform = 'translateX(0)';
    cards[0].style.opacity   = '1';
    cards[0].classList.add('active');

    document.getElementById('ring-score').style.strokeDashoffset = CIRC;

    current = 0;
    elResult.hidden = true;
    elQuiz.hidden   = false;
    elRail.classList.add('on');
    updateNav(0);
    requestAnimationFrame(() => elQuiz.scrollIntoView({ behavior: 'smooth' }));

    requestAnimationFrame(() => {
      cards.forEach(c => { c.style.transition = ''; });
    });
  });

}());
