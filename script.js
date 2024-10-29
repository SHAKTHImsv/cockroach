document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Disable right-click context menu
});


let tasks = [];

// Change 'talkButton' to match your button if needed
document.querySelector('button').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const responseArea = document.getElementById('responseArea');

    recognition.onstart = () => {
        responseArea.textContent = "Listening...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        responseArea.textContent = `You said: ${transcript}`;
        handleCommand(transcript);
    };

    recognition.onerror = (event) => {
        responseArea.textContent = 'Error occurred: ' + event.error;
    };

    recognition.onend = () => {
        responseArea.textContent += " Listening ended.";
    };

    recognition.start();
});

function handleCommand(command) {
    const responseArea = document.getElementById('responseArea');

    if (command.includes("add")) {
        const task = command.replace("add", "").replace("to my tasks", "").trim();
        if (task) {
            tasks.push(task);
            respond(`Added task: ${task}`);
        } else {
            respond("Please specify a task to add.");
        }
    } else if (command.includes("what's on my to-do list") || command.includes("check my tasks") ||("show my task")) {
        if (tasks.length === 0) {
            respond("You have no tasks in your to-do list.");
        } else {
            respond(`Your tasks are: ${tasks.join(", ")}`);
        }
    } else if (command.includes("remove")) {
        const taskToRemove = command.replace("remove", "").replace("from my tasks", "").trim();
        if (taskToRemove) {
            tasks = tasks.filter(task => task !== taskToRemove);
            respond(`Removed task: ${taskToRemove}`);
        } else {
            respond("Please specify a task to remove.");
        }
    } else if (command.includes("who is the founder of you") || command.includes("who is your boss")) {
        respond("My boss is the great Mr. Shakthivishwa.");
    } else if (command.includes("what time is it") || command.includes("tell me the time")) {
        const currentTime = new Date().toLocaleTimeString(); // Get the current time
        respond(`The current time is ${currentTime}.`);
    } else {
        respond("I didn't understand that command.");
    }
}



function respond(message) {
    const responseArea = document.getElementById('responseArea');
    responseArea.textContent = message;
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}
