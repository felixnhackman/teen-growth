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

// Get random challenge
getChallengeBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    challengeText.textContent = challenges[randomIndex];
    getChallengeBtn.style.display = 'none';
    completeChallengeBtn.style.display = 'inline-block';
});

// Complete challenge
completeChallengeBtn.addEventListener('click', () => {
    completeChallengeBtn.textContent = '✓ Completed!';
    completeChallengeBtn.style.backgroundColor = '#00b894';
    shareSection.style.display = 'block';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        completeChallengeBtn.textContent = 'I Did It!';
        completeChallengeBtn.style.backgroundColor = '';
    }, 2000);
});

// Share on WhatsApp
shareBtn.addEventListener('click', () => {
    const challenge = challengeText.textContent;
    const shareText = `I completed today's challenge: "${challenge}"! Try it yourself: [WEBSITE_URL]`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
});

// Post new thought
postThoughtBtn.addEventListener('click', () => {
    const newThought = thoughtInput.value.trim();
    if (newThought) {
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

// Render thoughts to the page
function renderThoughts() {
    thoughtsContainer.innerHTML = '';
    thoughts.forEach(thought => {
        const thoughtElement = document.createElement('div');
        thoughtElement.className = 'thought';
        thoughtElement.textContent = thought;
        thoughtsContainer.appendChild(thoughtElement);
    });
}

// In a real implementation, you would add Firebase code here
// to save and load challenges and thoughts from a database