let money = 0;
const moneyDisplay = document.getElementById("money");
const resultText = document.getElementById("result");
const wheel = document.getElementById("wheel");

// Earn 1€ per second
setInterval(() => {
    money += 1;
    moneyDisplay.textContent = money;
}, 1000);

function rollWheel() {
    const rewards = [-20, -10, 0, 5, 10, 25, 50];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    money += reward;
    if (money < 0) money = 0;

    moneyDisplay.textContent = money;

    // Spin animation
    wheel.style.transform = `rotate(${Math.floor(Math.random() * 360 + 720)}deg)`;

    if (reward > 0) {
        resultText.textContent = `🎉 You won ${reward} €!`;
    } else if (reward < 0) {
        resultText.textContent = `💀 You lost ${Math.abs(reward)} €!`;
    } else {
        resultText.textContent = `😐 Nothing happened.`;
    }
}

