document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const closeBtn = document.getElementById('close-messenger-modal');
    const assistantAvatar = '../images/profile.png';

    // Add welcome message
    function addWelcomeMessage() {
        const welcomeMessage = "Hi there! 👋🏻 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!";
        addAssistantMessage(welcomeMessage);
    }

    // Utility: Randomly pick a human-like prefix or emoji
    function getHumanPrefix() {
        const prefixes = [
            "😊", "👍", "Sure thing!", "Absolutely!", "Of course!", "Here's what I found:", "Let me help you with that!", "😃", "✨"
        ];
        return prefixes[Math.floor(Math.random() * prefixes.length)];
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex justify-end items-start mb-6 user-message animate-fade-in';
        msgDiv.innerHTML = `<div class="bubble break-words max-w-md">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addAssistantMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex items-start mb-6 assistant-message animate-fade-in';
        msgDiv.innerHTML = `<img src="${assistantAvatar}" alt="Ranyboy Templado avatar" class="w-8 h-8 rounded-full border border-white mr-3 mt-1" />
            <div><span class="text-white font-semibold text-sm">Ranyboy Templado</span>
            <div class="bubble mt-1 shadow-md break-words max-w-md">${text}</div></div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex items-start mb-6 assistant-message typing-indicator animate-fade-in';
        typingDiv.innerHTML = `<img src="${assistantAvatar}" alt="Ranyboy Templado avatar" class="w-8 h-8 rounded-full border border-white mr-3 mt-1" />
            <div><span class="text-white font-semibold text-sm">Ranyboy Templado</span>
            <div class="bubble mt-1 shadow-md"><span class='loading-dots'><span></span><span></span><span></span></span> 
            <span class="ml-2">typing...</span></div></div>`;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Real Gemini API integration with retry mechanism
    async function getAnswer(question, retryCount = 0) {
        const API_KEY = 'AIzaSyDDQUq1W15CgSAtkcRyCu7bjnunjm7r2co';
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        const MAX_RETRIES = 2;

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are Rans, an AI assistant for Ranyboy Templado's portfolio website. 
                            Answer the following question about Ranyboy based on his portfolio information: ${question}
                            Keep responses concise and friendly. If the question is not related to Ranyboy's portfolio, 
                            politely redirect the conversation back to his portfolio.`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from Gemini API');
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            if (retryCount < MAX_RETRIES) {
                console.log(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return getAnswer(question, retryCount + 1);
            }
            return "I apologize, but I'm having trouble connecting to my AI service right now. Please try again in a moment.";
        }
    }

    // Handle form submission
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        // Disable input while processing
        chatInput.disabled = true;
        addUserMessage(userText);
        chatInput.value = '';

        const typingIndicator = addTypingIndicator();

        try {
            const answer = await getAnswer(userText);
            setTimeout(() => {
                typingIndicator.remove();
                addAssistantMessage(answer);
                chatInput.disabled = false;
                chatInput.focus();
            }, 700 + Math.random() * 600);
        } catch (error) {
            typingIndicator.remove();
            console.error("Error fetching answer:", error);
            addAssistantMessage("Sorry, I encountered an error trying to respond. Please try again.");
            chatInput.disabled = false;
            chatInput.focus();
        }
    });

    // Close chat modal from inside iframe
    if (closeBtn && window.parent && window.parent !== window) {
        closeBtn.addEventListener('click', function() {
            const modal = window.parent.document.getElementById('chat-messenger-modal');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('animate-fade-in');
            }
        });
    }

    // Initialize chat with welcome message
    chatMessages.innerHTML = ''; // Clear any existing messages
    addWelcomeMessage();
});