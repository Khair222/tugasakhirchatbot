// Ambil elemen penting
const chatMain = document.getElementById("chat-main");
const userInput = document.getElementById("user-input");

// Fungsi kirim pesan
function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Tambahkan pesan user ke chat
  appendMessage(message, "user");

  // Kosongkan input
  userInput.value = "";

  // Kirim ke backend Flask
  fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  })
    .then(res => res.json())
    .then(data => {
      appendMessage(data.reply, "bot"); // balasan dari Flask (Gemini)
    })
    .catch(err => {
      appendMessage("⚠️ Error koneksi ke server!", "bot");
      console.error(err);
    });
}

// Fungsi tambah pesan ke chat
function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerText = text;
  chatMain.appendChild(msgDiv);

  // Scroll otomatis ke bawah
  chatMain.scrollTop = chatMain.scrollHeight;
}

// Kirim pesan dengan tombol Enter
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
