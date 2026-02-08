const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');
const heartsContainer = document.querySelector('.hearts-container');

let yesClicked = false;
let noClickCount = 0;
let noBtnScale = 1;

// Messages for "Are you sure?" popup
const sureMessages = [
    "Are you sure? 😢",
    "Really? Think again... 💔",
    "Come on, say yes! 💕",
    "Don't be shy! 😳",
    "I believe in you! 💪",
    "Last chance to say yes! 🥺",
    "Seriously? 😭",
    "This hurts... 💔",
    "Final warning! ⚠️",
    "One more click and I disappear! 👻"
];

// Generate falling hearts
function createFallingHearts() {
    const hearts = ['💕', '❤️', '💖', '💗', '💝', '💓'];
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        const size = 12 + Math.random() * 28;
        heart.style.fontSize = size + 'px';
        heart.style.animationDuration = (5 + Math.random() * 6) + 's';
        heart.style.animationDelay = Math.random() * 4 + 's';
        heart.style.opacity = 0.2 + Math.random() * 0.35;
        heartsContainer.appendChild(heart);
    }
}

// Create confetti when Yes is clicked
function createConfetti() {
    const colors = ['#f5576c', '#ffd700', '#ff69b4', '#764ba2', '#4facfe', '#00f2fe'];
    for (let i = 0; i < 120; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.background = color;
        confetti.style.boxShadow = `0 0 20px ${color}`;
        const size = 6 + Math.random() * 12;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
        confetti.style.animationDelay = Math.random() * 0.15 + 's';
        document.getElementById('confetti-container').appendChild(confetti);
    }
}

// Initialize falling hearts
createFallingHearts();

// Function to update popup message
function updatePopupMessage(message) {
    const popupContent = popup.querySelector('.popup-content');
    popupContent.querySelector('h2').textContent = message;
    popupContent.querySelector('p').textContent = '';
}

// Event listener for Yes button
yesBtn.addEventListener('click', function() {
    if (!yesClicked) {
        yesClicked = true;
        
        // Create confetti effect
        createConfetti();
        
        // Thanos snap effect for No button
        noBtn.classList.add('snap');
        
        // Add glow effect to Yes button
        yesBtn.style.boxShadow = '0 0 30px rgba(245, 87, 108, 0.8)';
        
        // Update popup with success message
        updatePopupMessage('Yeheey! 🎊');
        const popupContent = popup.querySelector('.popup-content');
        popupContent.querySelector('p').textContent = "Don't be late! ⏰";
        
        // Delay popup to match animation
        setTimeout(() => {
            popup.classList.remove('hidden');
        }, 200);
    }
});

// Event listener for No button
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if No button has been clicked 10 times
    if (noClickCount >= 10) {
        return; // Do nothing if already clicked 10 times
    }
    
    // Increment click count
    noClickCount++;
    
    // Shrink the No button with each click
    noBtnScale -= 0.1;
    noBtn.style.transform = `scale(${noBtnScale})`;
    
    // Show "Are you sure?" message
    const messageIndex = Math.min(noClickCount - 1, sureMessages.length - 1);
    updatePopupMessage(sureMessages[messageIndex]);
    popup.classList.remove('hidden');
    
    // Add wobble effect to No button
    noBtn.classList.add('wobble');
    setTimeout(() => {
        noBtn.classList.remove('wobble');
    }, 400);
    
    // Check if No button has been clicked 10 times
    if (noClickCount >= 10) {
        // Apply Thanos snap effect to No button after a delay
        setTimeout(() => {
            noBtn.classList.add('snap');
            
            // After snap, disable the No button and center Yes button
            setTimeout(() => {
                noBtn.disabled = true;
                noBtn.style.pointerEvents = 'none';
                noBtn.style.display = 'none';
                
                // Center the Yes button
                document.querySelector('.buttons-container').style.justifyContent = 'center';
            }, 600);
        }, 500);
    }
});



// Event listener for Close button
closeBtn.addEventListener('click', function() {
    popup.classList.add('hidden');
});

// Close popup when clicking outside of it
popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        popup.classList.add('hidden');
    }
});
