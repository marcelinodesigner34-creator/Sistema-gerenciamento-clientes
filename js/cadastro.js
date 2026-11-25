const formulario = document.getElementById("formCliente");
const mensagem = document.getElementById("mensagem");
const parametros = new URLSearchParams(window.location.search);
const idCliente = parametros.get("id");
const usuarioAtual = JSON.parse(localStorage.getItem("usuario"));
const btnSalvar = document.getElementById("btnSalvar")

const preencherFormulario = async () => {
  try {
    const cliente = await clienteService.buscarPorId(idCliente)
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("cpf").value = cliente.cpf;
    document.getElementById("telefone").value = cliente.telefone || "";
    document.getElementById("email").value = cliente.email || "";
    document.getElementById("endereco").value = cliente.endereco || "";
    document.getElementById("dataNascimento").value = cliente.data_nascimento || "";
  } catch (erro) {
    console.error(erro);
    if (erro.response) {
      mensagem.textContent = erro.response.data.mensagem
      const campoComErro = erro.response.data.campo;
      const input = document.getElementById(campoComErro);
      if(input){
        input.classList.add("campo-erro");
        input.focus();
      }
    } else {
      mensagem.textContent = "Não foi possivel carregar o cliente";
    }
  }
};
if (idCliente) {
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

  btnSalvar.disabled = true;
  btnSalvar.textContent = "Salvando...";
  try {
    const cliente = {
      nome,
      cpf,
      telefone,
      email,
      endereco,
      data_nascimento: dataNascimento,
      usuario_id: usuarioAtual.id
    }

    if (idCliente) {
      await clienteService.editar(idCliente, cliente);
      window.location.href = "principal.html";
      return;
    }
    await clienteService.cadastrar(cliente)
    mensagem.classList.add("mensagem-sucesso");
    mensagem.textContent = "Cliente cadastrado com sucesso";
    formulario.reset();
    campoNome.focus();
  } catch (erro) {
    console.error(erro);
    if (erro.response) {
      mensagem.textContent = erro.response.data.mensagem;
      const campoComErro = erro.response.data.campo;

      if(campoComErro){
        const input = document.getElementById(campoComErro)
        input.classList.add("campo-erro");
        input.focus();
      }
    } else {
      mensagem.textContent = "Não foi possível conectar ao servidor";
    }

  }finally{
    btnSalvar.disabled = false;
    btnSalvar.textContent = "Salvar"
  }

});

document.getElementById("btnCancelar").addEventListener("click", () => {
  window.location.href = "principal.html";
});

const campoCpfMascara = document.getElementById("cpf");

campoCpfMascara.addEventListener("input", () => {
  let numeros = campoCpfMascara.value.replace(/\D/g, "").slice(0, 11);

  numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
  numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
  numeros = numeros.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  campoCpfMascara.value = numeros;
});