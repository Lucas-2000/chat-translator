const socket = io("http://localhost:3333");

socket.on("connect", () => {
  console.log("Conexão estabelecida com o servidor Socket.IO");
});

document.getElementById("addUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const roomId = document.getElementById("room").value;
  const userId1 = document.getElementById("usuario1").value;
  const userId2 = document.getElementById("usuario2").value;

  try {
    const response = await axios.post("http://localhost:3333/room-users", {
      roomId,
      userId1,
      userId2,
    });

    if (response.status === 201) {
      console.log("Usuário adicionado à sala com sucesso.");
      socket.emit("userAdded", { roomId, userId1 });
      window.location.href = `chat.html?roomId=${roomId}&userId1=${userId1}`;
    }
  } catch (error) {
    console.error("Erro ao adicionar o usuário à sala:", error);
  }
});
