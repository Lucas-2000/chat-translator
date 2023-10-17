const socket = io("http://localhost:3333");

socket.on("connect", () => {
  console.log("Connected to the server.");
});

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");
const userId = urlParams.get("userId1");

if (roomId && userId) {
  console.log(`Room ID: ${roomId}`);
  console.log(`User ID: ${userId}`);
  const userEnteredDiv = document.getElementById("userEntered");
  userEnteredDiv.textContent = `User entered the room: ${userId}`;
} else {
  console.error("Missing parameters (roomId or userId)");
}

socket.on("messageReceived", (data) => {
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${data.userId}: ${data.translatedText}`;
  chatMessages.appendChild(messageDiv);
});

document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value;

  const response = await axios.post("http://localhost:3333/translation", {
    userId,
    message,
  });

  const translatedText = response.data.translatedText;

  if (roomId && userId) {
    socket.emit("sendMessage", { roomId, userId, translatedText });
    document.getElementById("message").value = "";
  } else {
    console.error("Missing parameters (roomId or userId)");
  }
});
