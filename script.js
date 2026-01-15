const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const moneyEl = document.getElementById("money");
const resultEl = document.getElementById("result");
const rollBtn = document.getElementById("rollBtn");

let money = Number(localStorage.getItem("money")) || 0;
let angle = 0;
let spinning = false;

const rewards = [0, 5, 10, 25, 50, -10, -25];
const colors = ["#444", "#00ffcc", "#00ff00", "#ffaa00", "#ff00ff", "#ff3333", "#aa0000"];

moneyEl.textContent = money;

// 💰 Earn 1€ per second (FIXED)
setInterval(() => {
    money += 1;
    updateMoney();
}, 1000);

// 🎡 Draw wheel
function drawWheel() {
    const slices = rewards.length;
    const sliceAngle = (2 * Math.PI) / slices;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < slices; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.fillStyle = colors[i];
        ctx.arc(150, 150, 140, angle + i * sliceAngle, angle + (i + 1) * sliceAngle);
        ctx.fill();

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angle + (i + 0.5) * sliceAngle);
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(rewards[i] + "€", 60, 5);
        ctx.restore();
    }
}

drawWheel();

// 🎰 Roll logic
rollBtn.addEventListener("click", () => {
    if (spinning) return;

    spinning = true;
    rollBtn.disabled = true;
    resultEl.textContent = "";

    let spinTime = 0;
    let spinSpeed = Math.random() * 0.3 + 0.35;

    const spinInterval = setInterval(() => {
        angle += spinSpeed;
        spinSpeed *= 0.98;
        spinTime++;

        drawWheel();

        if (spinSpeed < 0.002) {
            clearInterval(spinInterval);
            finishSpin();
        }
    }, 16);
});

function finishSpin() {
    const sliceAngle = (2 * Math.PI) / rewards.length;
    const index = Math.floor(((2 * Math.PI - angle) % (2 * Math.PI)) / sliceAngle);
    const reward = rewards[index];

    money += reward;
    if (money < 0) money = 0;

    updateMoney();

    if (reward > 0) {
        resultEl.textContent = `🎉 YOU WON ${reward}€`;
    } else if (reward < 0) {
        resultEl.textContent = `💀 YOU LOST ${Math.abs(reward)}€`;
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 300);
    } else {
        resultEl.textContent = `😐 NO REWARD`;
    }

    spinning = false;
    rollBtn.disabled = false;
}

// 💾 Save money
function updateMoney() {
    moneyEl.textContent = money;
    localStorage.setItem("money", money);
}


