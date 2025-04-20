document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const closeBtn = document.getElementById('close-messenger-modal');
    const assistantAvatar = '../images/profile.png';

    // Simple Q&A pairs for demonstration (REMOVED - Replaced with simulated Gemini call)
    // const qa = [ ... ];

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        // Add text-right for alignment, keep existing classes
        msgDiv.className = 'flex justify-end items-start mb-6 user-message'; 
        // Add break-words and max-w-md to the bubble
        msgDiv.innerHTML = `<div class="bubble break-words max-w-md">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addAssistantMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex items-start mb-6 assistant-message';
        // Add break-words and max-w-md to the bubble
        msgDiv.innerHTML = `<img src="${assistantAvatar}" alt="Ranyboy Templado avatar" class="w-8 h-8 rounded-full border border-white mr-3 mt-1" />\n<div><span class="text-white font-semibold text-sm">Ranyboy Templado</span><div class="bubble mt-1 shadow-md break-words max-w-md">${text}</div></div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addLoadingMessage() {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'flex items-start mb-6 assistant-message loading-message';
        // Use the correct profile image path
        msgDiv.innerHTML = `<img src="../images/profile.png" alt="Ranyboy Templado avatar" class="w-8 h-8 rounded-full border border-white mr-3 mt-1" />\n<div><span class="text-white font-semibold text-sm">Ranyboy Templado</span><div class="bubble mt-1 shadow-md"><span class='loading-dots'><span></span><span></span><span></span></span></div></div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    }

    // Simulate fetching an answer from Gemini, now based on portfolio content
    async function getAnswer(question) {
        // Placeholder for actual Gemini API call
        console.log(`Simulating Gemini API call for question: "${question}"`);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 900));

        // --- Simulated Response Based on index.html ---
        const lowerCaseQuestion = question.toLowerCase();

        if (/hello|hi|hey/.test(lowerCaseQuestion)) {
            return "Hello! I'm Rans, Ranyboy Templado's AI assistant, powered by Gemini. How can I help you learn about his portfolio today?";
        } else if (/who are you|who is rans/.test(lowerCaseQuestion)) {
            return "I'm Rans, an AI assistant powered by Google Gemini, here to provide information about Ranyboy Templado based on his portfolio.";
        } else if (/who is ranyboy|tell me about ranyboy/.test(lowerCaseQuestion)) {
            return "Rany Boy Templado is a graduating BS Information Technology student from Pangasinan, Philippines. He's passionate about web development, focusing on responsive and user-friendly applications using modern technologies.";
        } else if (/what can you do|help/.test(lowerCaseQuestion)) {
            return "Powered by Gemini, I can tell you about Ranyboy's skills, work experience, education, projects, certifications, and how to connect with him, all based on his portfolio.";
        } else if (/skills|technologies|stack/.test(lowerCaseQuestion)) {
            return "Ranyboy's tech stack includes: Frontend (JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS), Backend (Python, Java, PHP, MySQL, Laravel), and Tools (Git, VS Code, MS Office, Canva). Ask for specifics!";
        } else if (/experience|internship|work/.test(lowerCaseQuestion)) {
            return "Ranyboy interned at the Municipal Accounting Office in July 2024, applying technical skills to improve processes. He's currently a BSIT student expected to graduate on June 6, 2025.";
        } else if (/education|student/.test(lowerCaseQuestion)) {
            return "Ranyboy is pursuing a Bachelor of Science in Information Technology, expecting to graduate on June 6, 2025. His studies focus on software development and database management.";
        } else if (/projects/.test(lowerCaseQuestion)) {
            return "Ranyboy has worked on several projects, including an Advanced Appointment System for a dental clinic, a Real Estate Appointment System, a School Club Event System, and a Weather App. You can find links in his portfolio.";
        } else if (/certifications|certificates/.test(lowerCaseQuestion)) {
            return "He holds certifications in Responsive Web Design and JavaScript Algorithms from freeCodeCamp, Java, SQL Basics, and JavaScript Basics from HackerRank, and participated in the National Programming Challenge 2024 by Code Chum.";
        } else if (/about|more info/.test(lowerCaseQuestion)) {
            return "Ranyboy is passionate about creating great web experiences and seeks opportunities in system development and process optimization. He enjoys learning new tech, data analysis, and collaborating on projects.";
        } else if (/contact|connect|email|social/.test(lowerCaseQuestion)) {
            return `You can connect with Ranyboy via email at ranyboytemplado001@gmail.com or find him on LinkedIn, GitHub, Instagram, and Facebook. He's also a member of the Filipino Web Development Peers Discord.`;
        } else if (/recommendations|references/.test(lowerCaseQuestion)) {
            return "His portfolio includes recommendations highlighting his dedication, technical aptitude, problem-solving skills, work ethic, and passion for learning. Check the 'Recommendations' section for quotes!";
        } else if (/bye|goodbye/.test(lowerCaseQuestion)) {
            return "Goodbye! Feel free to ask if you have more questions about Ranyboy's portfolio. Have a great day!";
        } else {
            // Default Gemini-like response for unhandled questions
            return "That's an interesting question! Based on Ranyboy's portfolio, I can share details about his skills, experience, projects, or certifications. What specific area are you interested in?";
        }
        // --- End Simulated Response ---
    }

    chatForm.addEventListener('submit', async function(e) { // Make the handler async
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        addUserMessage(userText);
        chatInput.value = ''; // Clear input immediately

        const loadingMsg = addLoadingMessage(); // Show loading indicator

        try {
            // Get answer from the simulated Gemini function
            const answer = await getAnswer(userText);
            loadingMsg.remove(); // Remove loading indicator
            addAssistantMessage(answer); // Add the assistant's response
        } catch (error) {
            console.error("Error fetching answer:", error);
            loadingMsg.remove(); // Remove loading indicator even on error
            addAssistantMessage("Sorry, I encountered an error trying to respond. Please try again.");
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
});