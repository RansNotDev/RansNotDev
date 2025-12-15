document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const closeBtn = document.getElementById('close-messenger-modal');
    const assistantAvatar = '../images/newprofile.png';

    // Add welcome message
    function addWelcomeMessage() {
        const welcomeMessage = "Hi there! 👋🏻 I’m Rans’ assistant. Ask me about his skills, projects, certifications, experience, or how to contact him. For example: “What projects has Ranyboy built?” or “How do I reach him?”";
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

    // Simple local fallback answer if API is not configured or fails
    function getLocalAnswer(question) {
        const prefix = getHumanPrefix();

        // Minimal site knowledge for offline answers
        const profile = {
            name: 'Ranyboy Templado',
            title: 'BS Information Technology Graduate | Freelance Web Developer',
            location: 'Cavite, Philippines',
            contact: 'ranyboytemplado001@gmail.com',
            tech: {
                frontend: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'],
                backend: ['Python', 'Java', 'PHP', 'MySQL', 'Laravel'],
                tools: ['Git', 'VS Code', 'Microsoft Office', 'Canva'],
            },
            projects: [
                'Advanced Appointment System (dental clinics)',
                'Real Estate Appointment System',
                'School Club Event System',
                'Weather App',
            ],
            certifications: [
                'Responsive Web Design (FreeCodeCamp)',
                'JavaScript Algorithms and Data Structures (FreeCodeCamp)',
                'Java (HackerRank)',
                'SQL Basics (HackerRank)',
                'JavaScript Basics (HackerRank)',
                'National Programming Challenge 2024 (Code Chum)',
            ],
            experience: [
                'Enrolled BS IT (August 2021)',
                'Hello World first code (August 2021)',
                'Freelance web developer, student-friendly projects (2022 – Present)',
                'OJT Intern, Municipal Accounting Office (July 2024)',
                'Graduation BS IT (June 6, 2025)',
            ],
        };

        const lowerQ = (question || '').toLowerCase();

        // Simple keyword routing
        if (lowerQ.includes('contact') || lowerQ.includes('email')) {
            return `${prefix} You can reach ${profile.name} at ${profile.contact}.`;
        }
        if (lowerQ.includes('where') && lowerQ.includes('based')) {
            return `${prefix} ${profile.name} is based in ${profile.location}.`;
        }
        if (lowerQ.includes('tech') || lowerQ.includes('stack') || lowerQ.includes('skills')) {
            return `${prefix} Tech stack:\n- Frontend: ${profile.tech.frontend.join(', ')}\n- Backend: ${profile.tech.backend.join(', ')}\n- Tools: ${profile.tech.tools.join(', ')}`;
        }
        if (lowerQ.includes('project')) {
            return `${prefix} Key projects include: ${profile.projects.join('; ')}.`;
        }
        if (lowerQ.includes('cert')) {
            return `${prefix} Certifications: ${profile.certifications.join('; ')}.`;
        }
        if (lowerQ.includes('experience') || lowerQ.includes('journey') || lowerQ.includes('timeline')) {
            return `${prefix} Experience timeline: ${profile.experience.join(' → ')}.`;
        }
        if (lowerQ.includes('who is') || lowerQ.includes('about') || lowerQ.includes('who are you')) {
            return `${prefix} I’m an assistant for ${profile.name}, ${profile.title}, based in ${profile.location}. I can share details about skills, projects, certifications, and contact info.`;
        }

        // Default offline reply
        return `${prefix} I’m offline but can help with what’s on this site. Ask about tech stack, projects, certifications, experience, or contact (${profile.contact}).`;
    }

    // Backend proxy call (serverless/relative) to avoid CORS and keep the key server-side.
    // Falls back to local answer if the request fails.
    async function getAnswer(question) {
        try {
            const resp = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            if (!resp.ok) throw new Error('Backend error');
            const data = await resp.json();
            if (!data || !data.text) throw new Error('Empty response');
            return data.text;
        } catch (err) {
            console.error('Backend fetch failed, using local answer:', err);
            return getLocalAnswer(question);
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
            // Final safety fallback
            addAssistantMessage(getLocalAnswer(userText));
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