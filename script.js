let tasks = [];

// Load tasks from localStorage when the page is loaded
window.onload = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
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
               normalizedCommand.includes("check my tasks") || 
               normalizedCommand.includes("show my tasks")) {
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
