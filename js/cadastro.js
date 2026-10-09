const API_URL = "http://localhost:3000";
const formulario = document.getElementById("formCliente");
const mensagem = document.getElementById("mensagem");
const parametros = new URLSearchParams(window.location.search);
const idCliente = parametros.get("id");

const preencherFormulario = async ()=>{
    try{
        const resposta = await fetch(`${API_URL}/clientes/${idCliente}`);
        const cliente = await resposta.json();
        if(!resposta.ok){
            mensagem.textContent = cliente.mensagem;
            return;
        }
        document.getElementById("nome").value = cliente.nome;
        document.getElementById("cpf").value = cliente.cpf;
        document.getElementById("telefone").value = cliente.telefone || "";
        document.getElementById("email").value = cliente.email || "";
        document.getElementById("endereco").value = cliente.endereco || "";
        document.getElementById("dataNascimento").value = cliente.data_nascimento || "";
    } catch (erro){
        console.error(erro);
        mensagem.textContent = "Não foi possivel carregar o cliente";
    }
};
      if (idCliente){
        document.querySelector(".card-cadastro h1").textContent = "Editar Cliente";
        preencherFormulario();
      }

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  mensagem.classList.remove("mensagem-sucesso");
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const endereco = document.getElementById("endereco").value;

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
    const url = idCliente ? `${API_URL}/clientes/${idCliente}` : `${API_URL}/clientes`;
    const metodo = idCliente ? "PUT" : "POST";
    const resposta = await fetch(url,{
        method: metodo,
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

    if(idCliente){
        window.location.href = "principal.html";
        return;
    }
    mensagem.classList.add("mensagem-sucesso");
    mensagem.textContent = "Cliente cadastrado com sucesso";
    formulario.reset();
    campoNome.focus();
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível conectar ao servidor";
  }
});

document.getElementById("btnCancelar").addEventListener("click", ()=>{
  window.location.href= "principal.html";
});