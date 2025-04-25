// Enhanced 3D effects and animations
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for container
    const container = document.querySelector('.container');
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        container.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // Reset position when mouse leaves
    document.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
});

// Challenges database
const challenges = [
    "Compliment 3 people today",
    "Write down 3 things you're grateful for",
    "Do 10 minutes of mindful breathing",
    "Learn one new fact about something you love",
    "Help someone without being asked",
    "Write a letter to your future self",
    "Try a new hobby for 15 minutes",
    "List 5 things you like about yourself",
    "Go a full hour without your phone",
    "Cook a simple healthy meal"
];

// DOM elements
const challengeText = document.getElementById('challengeText');
const getChallengeBtn = document.getElementById('getChallenge');
const completeChallengeBtn = document.getElementById('completeChallenge');
const shareSection = document.getElementById('shareSection');
const shareBtn = document.getElementById('shareBtn');
const thoughtsContainer = document.getElementById('thoughtsContainer');
const thoughtInput = document.getElementById('thoughtInput');
const postThoughtBtn = document.getElementById('postThought');

// Sample thoughts (in a real app, you'd use Firebase)
let thoughts = [
    "I'm scared of failing but I won't give up",
    "Today I helped my little sister with homework",
    "Why is it so hard to make real friends?",
    "I aced my math test after studying hard!",
    "Trying to be more confident day by day"
];

// Display initial thoughts
renderThoughts();

// Get random challenge with animation
getChallengeBtn.addEventListener('click', () => {
    // Add click animation
    getChallengeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        getChallengeBtn.style.transform = 'scale(1)';
    }, 100);
    
    // Challenge reveal animation
    challengeText.style.opacity = '0';
    challengeText.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        challengeText.textContent = challenges[randomIndex];
        challengeText.style.opacity = '1';
        challengeText.style.transform = 'translateY(0)';
        
        // Button transition
        getChallengeBtn.style.display = 'none';
        completeChallengeBtn.style.display = 'inline-block';
        completeChallengeBtn.style.animation = 'fadeIn 0.5s ease';
    }, 300);
});

// Complete challenge with celebration effect
completeChallengeBtn.addEventListener('click', () => {
    // Add click animation
    completeChallengeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        completeChallengeBtn.style.transform = 'scale(1)';
    }, 100);
    
    completeChallengeBtn.textContent = '✓ Completed!';
    completeChallengeBtn.style.backgroundColor = '#00b894';
    
    // Create confetti effect
    createConfetti();
    
    // Show share section
    shareSection.style.display = 'block';
    shareSection.style.animation = 'fadeIn 0.5s ease';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        completeChallengeBtn.textContent = 'I Did It!';
        completeChallengeBtn.style.backgroundColor = '';
    }, 2000);
});

// Share on WhatsApp with animation
shareBtn.addEventListener('click', () => {
    // Add click animation
    shareBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        shareBtn.style.transform = 'scale(1)';
    }, 100);
    
    const challenge = challengeText.textContent;
    const shareText = `I completed today's challenge: "${challenge}"! Try it yourself: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
});

// Post new thought with animation
postThoughtBtn.addEventListener('click', () => {
    // Add click animation
    postThoughtBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        postThoughtBtn.style.transform = 'scale(1)';
    }, 100);
    
    const newThought = thoughtInput.value.trim();
    if (newThought) {
        // Add thought with animation
        thoughts.unshift(newThought);
        renderThoughts();
        thoughtInput.value = '';
        
        // In a real app, you would save to Firebase here
        // saveThoughtToFirebase(newThought);
    }
});

// Allow pressing Enter to post thought
thoughtInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        postThoughtBtn.click();
    }
});

// Render thoughts to the page with animations
function renderThoughts() {
    thoughtsContainer.innerHTML = '';
    thoughts.forEach((thought, i) => {
        const thoughtElement = document.createElement('div');
        thoughtElement.className = 'thought';
        thoughtElement.textContent = thought;
        thoughtElement.style.opacity = '0';
        thoughtElement.style.transform = 'translateY(20px)';
        thoughtElement.style.animationDelay = `${i * 0.1}s`;
        thoughtsContainer.appendChild(thoughtElement);
        
        // Animate in
        setTimeout(() => {
            thoughtElement.style.opacity = '1';
            thoughtElement.style.transform = 'translateY(0)';
            thoughtElement.style.transition = 'all 0.3s ease';
        }, 10);
    });
}

// Create confetti effect
function createConfetti() {
    const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        
        confetti.animate([
            { top: '-10px', opacity: 1 },
            { top: `${Math.random() * 100 + 50}vh`, opacity: 0 }
        ], {
            duration: animationDuration * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
}

// In a real implementation, you would add Firebase code here
// to save and load challenges and thoughts from a database