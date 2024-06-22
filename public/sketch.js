let cam;
let handPose;
let hands = [];
let inputBox;
const textBoxWidth = 100;
const textMargin = 20;
let userText = ""; // Variable to store the user input
let receivedMessage = ""; // Store the received message

// Add a flag to track message reception
let messageReceived = false;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(800, 600);
  const camOptions = {
    flipped: false,
  };
  cam = createCapture(VIDEO, camOptions);
  cam.hide();
  handPose.detectStart(cam, gotHands);
    // Create an input box
  inputBox = createInput();
  // Center the input box horizontally
  inputBox.position((width - inputBox.width) / 2, 20);
  // Add an event listener for when the user presses ENTER
  inputBox.changed(onInputChange);
}

function draw() {
  if (hands.length > 0 && !messageReceived) {
    const x = convertX(hands[0].index_finger_tip.x);
    const y = convertY(hands[0].index_finger_tip.y);
    textSize(24);
    drawTextBox(userText, x, y);
    if (x > 460) {
      sendMessage(userText);
    }
  }
  if (messageReceived) {
    drawTextBox("Received message: " + receivedMessage, 20, 100);
  }
}

function p5DisplayMessage(message) {
  receivedMessage = message;
  messageReceived = true; // Set the flag when a message is received
}

function drawTextBox(txt, x, y) {
  clear()
  textSize(24);
  fill(255, 255, 255);
  
  // Calculate the text height
  let textHeight = textAscent() + textDescent() + textMargin * 2;
  
  // Draw the white rectangle
  fill(255, 204, 0);
  noStroke();
  rect(x, y - textHeight, textBoxWidth, textHeight);

  // Draw the text
  fill(0);
  text(txt, x + textMargin, y - textMargin);
}

function convertX(x) {
  return map(x, 0, cam.width, 0, width);
}

function convertY(y) {
  return map(y, 0, cam.height, 0, height);
}


function gotHands(results) {
  // console.log(results);
  hands = results;
}



// Function to handle input change
function onInputChange() {
  // Store the input value in userText
  userText = inputBox.value();
  
  // Optionally clear the input box after storing the value
  inputBox.value('');
  messageReceived = false; // Reset the flag when user changes input
}

