let nickname = '';
const botNames = ['Alex', 'Emma', 'Sam', 'Jordan', 'Taylor', 'Morgan'];
const randomMessages = [
    'Has anyone tried the new VS Code update? 👨‍💻',
    'Just deployed my first React app! 🚀',
    'Docker is making my life so much easier',
    'Anyone using TypeScript here?',
    'The new MacBook Pro is amazing!',
    'Web3 is the future 🌐',
    'Just pushed to main 😅',
    'Anyone else working remote?',
    'Flutter or React Native? 🤔',
    'GPT-4 is mind-blowing!'
];

const users = new Set();
let messageHistory = [];

function setNickname() {
    const input = document.getElementById('nicknameInput');
    nickname = input.value.trim();
    
    if (nickname) {
        const nicknameForm = document.getElementById('nicknameForm');
        nicknameForm.classList.add('hidden');
        
        document.getElementById('messageInput').disabled = false;
        document.getElementById('nicknameInput').disabled = true;
        
        addSystemMessage(`${nickname} joined the conversation`);
        users.add(nickname);
        updateUserList();
        setupMessageInput();
        simulateUsers();
        
        // Focus on message input after joining
        setTimeout(() => {
            document.getElementById('messageInput').focus();
        }, 300);
    }
}

function setupMessageInput() {
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && messageInput.value.trim()) {
            sendMessage(messageInput.value);
            messageInput.value = '';
        }
    });
}

function sendMessage(text) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessageToChat(timestamp, nickname, text);
}

function addMessageToChat(timestamp, user, text) {
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    const isCurrentUser = user === nickname;
    messageElement.style.textAlign = isCurrentUser ? 'right' : 'left';
    
    messageElement.innerHTML = `
        <span class="timestamp">${timestamp}</span>
        <strong style="color: ${stringToColor(user)}">${user}</strong>: ${text}
    `;
    
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    messageHistory.push({ timestamp, user, text });
}

function addSystemMessage(message) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.className = 'message system-message';
    messageElement.innerHTML = `<span class="timestamp">${timestamp}</span> ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    [...users].sort().forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color: ${stringToColor(user)}">${user}</span>`;
        userList.appendChild(li);
    });
}

// Generate consistent colors for usernames
function stringToColor(str) {
    const colors = [
        '#007AFF', // Blue
        '#4CD964', // Green
        '#FF2D55', // Red
        '#5856D6', // Purple
        '#FF9500', // Orange
        '#5AC8FA', // Light Blue
        '#FFCC00', // Yellow
        '#FF3B30', // Bright Red
    ];
    
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

function simulateUsers() {
    // Add some initial bot users with delay between each
    botNames.forEach((bot, index) => {
        setTimeout(() => {
            users.add(bot);
            addSystemMessage(`${bot} joined the conversation`);
            updateUserList();
        }, index * 1000);
    });

    // Simulate random messages with varying delays
    setInterval(() => {
        const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessageToChat(timestamp, randomBot, randomMessage);
    }, 5000 + Math.random() * 3000);

    // Simulate users joining/leaving less frequently
    setInterval(() => {
        const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
        if (Math.random() > 0.7 && users.has(randomBot)) {
            users.delete(randomBot);
            addSystemMessage(`${randomBot} left the conversation`);
        } else if (!users.has(randomBot)) {
            users.add(randomBot);
            addSystemMessage(`${randomBot} joined the conversation`);
        }
        updateUserList();
    }, 20000);
}

// Add welcome message when page loads
window.onload = () => {
    addSystemMessage('Welcome to the chat room');
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset the form
        contactForm.reset();
    });
}

// Add scroll-based animations for feature cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply animations to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
}); 