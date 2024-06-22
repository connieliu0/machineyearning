const socket = io();

let partnerId = null;

socket.on('partner', (id) => {
    partnerId = id;
    addMessage(`Connected with ${partnerId}`);
});

socket.on('message', (data) => {
    displayMessage(data.message);
});

function sendMessage(message) {
    if (partnerId) {
        socket.emit('message', { partner: partnerId, message });
        console.log("message sent")
    }
}

function addMessage(message) {
    // Add your logic to show connection status or other info if needed
    console.log(message);
}

function displayMessage(message) {
    // Function to be called from p5.js to display received messages
    window.p5DisplayMessage(message);
}
