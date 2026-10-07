const API_URL = "http://localhost:3000";
const botao = document.getElementById("btnEntrar");
const mensagem = document.getElementById("mensagemErro");

botao.addEventListener("click", async () => {
  const email = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagem.textContent = dados.mensagem;
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(dados));
    window.location.href = "principal.html";
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível conectar ao servidor";
  }
});