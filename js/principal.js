const listaClientes = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");

const mostrarClientes = (clientes) => {
  listaClientes.innerHTML = "";
  mensagem.classList.remove("mensagem-sucesso");

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
   const cliente =await clienteService.listar();
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
    const dados = await clienteService.excluir(id);
    await carregarClientes();
    mensagem.classList.add("mensagem-sucesso")
    mensagem.textContent = dados.mensagem
  } catch (erro) {
    console.error(erro);
    mensagem.classList.remove("mensagem-sucesso")
    if(erro.response){
      mensagem.textContent = erro.response.data.mensagem
    } else{
      mensagem.textContent = "Não foi possível excluir o cliente";
    }
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
    const clientes = await clienteService.buscar(termo);
    mostrarClientes(clientes);
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Não foi possível buscar os clientes";
  }
});

carregarClientes();