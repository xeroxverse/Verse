// AI Gaming Assistant - Frontend JavaScript

let sessionId = generateSessionId();
let isLoading = false;

// Generate unique session ID
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// DOM Elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const gameSelect = document.getElementById('game-select');
const clearBtn = document.getElementById('clear-btn');
const voiceBtn = document.getElementById('voice-btn');
const statusElement = document.getElementById('status');
const statusText = document.getElementById('status-text');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkHealth();
    setupEventListeners();
    userInput.focus();
});

// Setup event listeners
function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    clearBtn.addEventListener('click', clearChat);
    
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
    });

    // Voice button (placeholder)
    voiceBtn.addEventListener('click', () => {
        alert('Voice input feature coming soon! 🎤');
    });
}

// Check API health
async function checkHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (data.status === 'healthy' && data.assistant_ready) {
            updateStatus('online', 'AI Assistant Ready');
        } else {
            updateStatus('error', 'AI Assistant Not Configured');
        }
    } catch (error) {
        console.error('Health check failed:', error);
        updateStatus('error', 'Connection Error');
    }
}

// Update status indicator
function updateStatus(status, message) {
    statusElement.className = `status ${status}`;
    statusText.textContent = message;
}

// Send message to AI
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message || isLoading) return;
    
    // Add user message to chat
    addMessage('user', message);
    
    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Show loading
    isLoading = true;
    sendBtn.disabled = true;
    const loadingElement = addLoadingMessage();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                game: gameSelect.value,
                session_id: sessionId
            })
        });
        
        const data = await response.json();
        
        // Remove loading message
        loadingElement.remove();
        
        if (data.success) {
            addMessage('assistant', data.response);
        } else {
            addMessage('assistant', `Error: ${data.error || 'Unknown error occurred'}`);
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        loadingElement.remove();
        addMessage('assistant', '❌ Failed to connect to the assistant. Please check your connection and try again.');
    } finally {
        isLoading = false;
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// Add message to chat
function addMessage(role, content) {
    // Remove welcome message if it exists
    const welcomeMessage = chatContainer.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageDiv;
}

// Add loading message
function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Thinking';
    
    messageDiv.appendChild(loadingDiv);
    chatContainer.appendChild(messageDiv);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageDiv;
}

// Clear chat history
async function clearChat() {
    if (!confirm('Are you sure you want to clear the chat history?')) {
        return;
    }
    
    try {
        await fetch('/api/clear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_id: sessionId
            })
        });
        
        // Clear chat container
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <h2>👋 Welcome back!</h2>
                <p>Chat history cleared. Ready for new questions!</p>
            </div>
        `;
        
        // Generate new session ID
        sessionId = generateSessionId();
        
    } catch (error) {
        console.error('Error clearing chat:', error);
        alert('Failed to clear chat history. Please try again.');
    }
}

// Quick tips feature (can be expanded)
function showQuickTips() {
    const tips = [
        "💡 Tip: Be specific about your game and situation for better advice!",
        "🎯 Tip: Ask about strategies, mechanics, builds, or troubleshooting!",
        "⚡ Tip: Switch your current game in the dropdown for tailored responses!",
        "🔥 Tip: You can ask follow-up questions for deeper insights!"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    return randomTip;
}

// Keyboard shortcuts info
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        userInput.focus();
    }
    
    // Ctrl/Cmd + L to clear chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearChat();
    }
});

console.log('🎮 AI Gaming Assistant loaded!');
console.log('💡 Keyboard shortcuts:');
console.log('   Enter - Send message');
console.log('   Shift+Enter - New line');
console.log('   Ctrl/Cmd+K - Focus input');
console.log('   Ctrl/Cmd+L - Clear chat');
