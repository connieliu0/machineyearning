let cam;
let handPose;
let hands = [];
let inputBox;
const textBoxWidth = 100;
const textMargin = 20;
let userText = ""; // Variable to store the user input
let receivedMessage = ""; // Store the received message

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  // createCanvas(640, 480)
  // createCanvas(480, 360);
  createCanvas(480, (480 / 16) * 9);
  const camOptions = {
    flipped: false,
  };
  cam = createCapture(VIDEO, camOptions);
  cam.hide();
  handPose.detectStart(cam, gotHands);
    // Create an input box
  inputBox = createInput();
  inputBox.position(20, 20);
  // Add an event listener for when the user presses ENTER
  inputBox.changed(onInputChange);
}

function draw() {
  // image(cam, 0, 0, width, height);
    if (hands.length > 0){
      const x = convertX(hands[0].index_finger_tip.x);
      const y = convertY(hands[0].index_finger_tip.y);
      textSize(32);
      drawTextBox(userText, x, y);
      if (x>479){
        sendMessage(userText);
    }
    }
    if (receivedMessage) {
        drawTextBox("Received message: " + receivedMessage, 20, 100);
      }
}
function p5DisplayMessage(message) {
    receivedMessage = message;
  }
function drawTextBox(txt, x, y) {
  clear()
  textSize(32);
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
}

