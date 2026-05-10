// 考卷邏輯
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');
    const scoreP = document.getElementById('score');

    // 正確答案
    const answers = {
        q1: 'b', // 台北
        q2: 'a', // 台灣島
        q3: 'b', // 5顆
        q4: 'a', // 玉山
        q5: 'b'  // 蓮花
    };

    submitBtn.addEventListener('click', function() {
        let score = 0;
        const form = document.getElementById('quiz-form');
        const formData = new FormData(form);

        for (let [key, value] of formData.entries()) {
            if (answers[key] === value) {
                score++;
            }
        }

        scoreP.textContent = `您答對了 ${score} / 5 題。`;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });

    // 滾動動畫
    const questions = document.querySelectorAll('.question');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    questions.forEach(question => {
        question.style.opacity = '0';
        question.style.transform = 'translateY(50px)';
        question.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(question);
    });

    // 粒子效果 (簡單版本)
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});