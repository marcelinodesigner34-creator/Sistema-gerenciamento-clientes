const botao = document.getElementById("btnEntrar");
const mensagem = document.getElementById("mensagemErro");

botao.addEventListener("click", async () => {
  const email = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;
  botao.disabled = true;
  botao.textContent = "Entrando..."
  try {
    const dados = await authService.login(email, senha);
    localStorage.setItem("usuario", JSON.stringify(dados));
    window.location.href = "principal.html";
  } catch (erro) {
    if (erro.response) {
      mensagem.textContent = erro.response.data.mensagem
    } else {
      mensagem.textContent = "Não foi possível conectar ao servidor";
    }

  } finally {
    botao.disabled = false;
    botao.textContent = "Entrar"
  }
});