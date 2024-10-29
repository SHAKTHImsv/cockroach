let tasks = [];

// Disable right-click context menu
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Load tasks from localStorage when the page is loaded
window.onload = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
};

// Handle the button click for voice command
document.getElementById('submitCommand').onclick = () => {
    // Use the Web Speech API to capture voice commands
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        handleCommand(command);
    };

    recognition.onerror = (event) => {
        respond("Sorry, I didn't catch that. Please try again.");
    };

    recognition.start();
};

function handleCommand(command) {
    const responseArea = document.getElementById('responseArea');
    const normalizedCommand = command.toLowerCase();

    if (normalizedCommand.includes("add")) {
        const task = normalizedCommand.replace("add", "").replace("to my tasks", "").trim();
        if (task) {
            tasks.push(task);
            saveTasks(); // Save to localStorage
            respond(`Added task: ${task}`);
        } else {
            respond("Please specify a task to add.");
        }
    } else if (normalizedCommand.includes("what's on my to-do list") || 
               normalizedCommand.includes("check my task") || 
               normalizedCommand.includes("show my task")) {
        if (tasks.length === 0) {
            respond("You have no tasks in your to-do list.");
        } else {
            respond(`Your tasks are: ${tasks.join(", ")}`);
        }
    } else if (normalizedCommand.includes("remove")) {
        const taskToRemove = normalizedCommand.replace("remove", "").replace("from my tasks", "").trim();
        if (taskToRemove) {
            tasks = tasks.filter(task => task !== taskToRemove);
            saveTasks(); // Save to localStorage
            respond(`Removed task: ${taskToRemove}`);
        } else {
            respond("Please specify a task to remove.");
        }
    } else if (normalizedCommand.includes("who is the founder of you") || 
               normalizedCommand.includes("who is your boss")) {
        respond("My boss is the great Mr. Shakthivishwa.");
    } else if (normalizedCommand.includes("what time is it") || 
               normalizedCommand.includes("tell me the time")) {
        const currentTime = new Date().toLocaleTimeString(); // Get the current time
        respond(`The current time is ${currentTime}.`);
    } else {
        respond("I didn't understand that command.");
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function respond(message) {
    const responseArea = document.getElementById('responseArea');
    responseArea.textContent = message;
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}
