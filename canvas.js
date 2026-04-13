
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);


document.body.style.margin = "0";
document.body.style.backgroundColor = "#ffffff"; // Oq fon


canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none"; 

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();


const bubbles = [];
const bubbleCount = 40;

class Bubble {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 100; 
        this.size = Math.random() * 15 + 5; 
        this.speed = Math.random() * 1 + 0.5; 
        this.opacity = Math.random() * 0.3 + 0.1; 
        this.swing = Math.random() * 2; 
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y / 50) * this.swing; 

        
        if (this.y < -this.size) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(128, 128, 128, ${this.opacity})`;
        ctx.fill();
    }
}


for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new Bubble());
}


function animate() {
    ctx.clearRect(0, 0, w, h);
    
    bubbles.forEach(b => {
        b.update();
        b.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

document.body.style.height = "3000px";