// 1. Elementlarni sozlash
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Sahifa stili
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = "#ffffff"; // Oq fon

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";

let width, height;
const dots = [];
const dotCount = 100; // Nuqtalar soni
const connectionDist = 150; // Chiziqlar paydo bo'lish masofasi

// 2. Ekranga moslashtirish
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// 3. Nuqtalar obyekti
class Dot {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7; // Harakat tezligi
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(169, 169, 169, 0.8)"; // Kulrang nuqta
        ctx.fill();
    }
}

// Nuqtalarni yaratish
for (let i = 0; i < dotCount; i++) {
    dots.push(new Dot());
}

// 4. Chiziqlarni chizish funksiyasi
function drawLines() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDist) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(169, 169, 169, ${1 - distance / connectionDist})`; // Yaqinlashgan sari yorqinlashadi
                ctx.lineWidth = 0.5;
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
            }
        }
    }
}

// 5. Animatsiya sikli
function animate() {
    ctx.clearRect(0, 0, width, height); // Ekran matnini tozalash
    
    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });
    
    drawLines();
    requestAnimationFrame(animate);
}

animate();

// 6. Asosiy matn (Gray text)
const mainText = document.createElement('div');
mainText.innerHTML = "<h1 style='font-size: 3rem;'>Interaktiv Fon</h1><p>Faqat sof JavaScript yordamida yasaldi.</p>";
mainText.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #555555;
    font-family: 'Segoe UI', sans-serif;
    text-align: center;
    pointer-events: none;
`;
document.body.appendChild(mainText);