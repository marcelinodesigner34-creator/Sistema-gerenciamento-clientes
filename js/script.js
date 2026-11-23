const botao = document.getElementById("btnEntrar");
const mensagem = document.getElementById("mensagemErro");

botao.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  document.getElementById("email").classList.remove("campo-erro");
  document.getElementById("senha").classList.remove("campo-erro");

  botao.disabled = true;
  botao.textContent = "Entrando..."
  try {
    const dados = await authService.login(email, senha);
    localStorage.setItem("usuario", JSON.stringify(dados));
    window.location.href = "principal.html";
  } catch (erro) {
    if (erro.response) {
      mensagem.textContent = erro.response.data.mensagem;
       const campoComErro = erro.response.data.campo;

      if (campoComErro) {
        const input = document.getElementById(campoComErro)
        input.classList.add("campo-erro");
        input.focus();
      }
    } else {
      mensagem.textContent = "Não foi possível conectar ao servidor";
    }

  } finally {
    botao.disabled = false;
    botao.textContent = "Entrar"
  }
});