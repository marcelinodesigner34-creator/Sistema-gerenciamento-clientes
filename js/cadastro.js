const API_URL = "http://localhost:3000";
const formulario = document.getElementById("formCliente");

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const endereco = document.getElementById("endereco").value;

  const mensagem = document.getElementById("mensagem");
  const campoNome = document.getElementById("nome");
  const campoCpf = document.getElementById("cpf");

  campoNome.classList.remove("campo-erro");
  campoCpf.classList.remove("campo-erro");

  if (nome === "") {
    mensagem.textContent = "O campo Nome é obrigatório";
    campoNome.classList.add("campo-erro");
    campoNome.focus();
    return;
  }

  if (cpf === "") {
    mensagem.textContent = "O campo CPF é obrigatório";
    campoCpf.classList.add("campo-erro");
    campoCpf.focus();
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        cpf,
        telefone,
        email,
        endereco,
        data_nascimento: dataNascimento
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagem.textContent = dados.mensagem;
      return;
    }

    mensagem.textContent = "Cliente cadastrado com sucesso";
    formulario.reset();
    campoNome.focus();
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível conectar ao servidor";
  }
});