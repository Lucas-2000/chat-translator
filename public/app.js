const socket = io("http://localhost:3333");

socket.on("connect", () => {
  console.log("Conexão estabelecida com o servidor Socket.IO");
});

document.getElementById("addUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("usuario").value;
  const roomId = document.getElementById("room").value;

  try {
    const response = await axios.post("http://localhost:3333/room-users", {
      roomId,
      userId,
    });

    if (response.status === 201) {
      console.log("Usuário adicionado à sala com sucesso.");
      socket.emit("userAdded", { roomId, userId });
      window.location.href = `chat.html?roomId=${roomId}&userId=${userId}`;
    }
  } catch (error) {
    console.error("Erro ao adicionar o usuário à sala:", error);
  }
});
