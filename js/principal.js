const API_URL = "http://localhost:3000";
const listaClientes = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");

const mostrarClientes = (clientes) => {
  listaClientes.innerHTML = "";

  if (clientes.length === 0) {
    mensagem.textContent = "Nenhum cliente encontrado";
    return;
  }

  mensagem.textContent = "";

  clientes.forEach((cliente) => {
    listaClientes.innerHTML += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.telefone || ""}</td>
        <td><a href="cadastro.html?id=${cliente.id}" class="btn-editar">Editar</a>
        <button class="btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button></td>
      </tr>
    `;
  });
};

const carregarClientes = async () => {
  try {
    const resposta = await fetch(`${API_URL}/clientes`);
    const clientes = await resposta.json();
    mostrarClientes(clientes);
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível carregar os clientes";
  }
};

const excluirCliente = async (id) => {
  const confirmou = confirm("Tem certeza que deseja excluir este cliente?");

  if (!confirmou) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/clientes/${id}`, {
      method: "DELETE"
    });

    const dados = await resposta.json();

    await carregarClientes();
    mensagem.textContent = dados.mensagem;
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível excluir o cliente";
  }
};

const btnPesquisar = document.getElementById("btnPesquisar");
const campoBusca = document.getElementById("campoBusca");

btnPesquisar.addEventListener("click", async () => {
  const termo = campoBusca.value;

  if (termo === "") {
    carregarClientes();
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/clientes/buscar?termo=${termo}`);
    const clientes = await resposta.json();
    mostrarClientes(clientes);
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível buscar os clientes";
  }
});

carregarClientes();