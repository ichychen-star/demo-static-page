// 考卷邏輯
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');
    const scoreP = document.getElementById('score');

    // 正確答案
    const answers = {
        q1: 'b', // 台北
        q2: 'a', // 台灣島
        q3: 'b', // 10月10日
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

        let message = '';
        if (score === 5) {
            message = `哇！全對了！您答對了 ${score} / 5 題。🎉🎊`;
        } else if (score >= 3) {
            message = `不錯哦！您答對了 ${score} / 5 題。👍`;
        } else {
            message = `加油！您答對了 ${score} / 5 題。下次再努力！💪`;
        }

        scoreP.innerHTML = message;
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
});