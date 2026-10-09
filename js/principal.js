const API_URL = "http://localhost:3000";
const listaClientes = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");

const carregarClientes = async ()=>{
    try{
        const resposta = await fetch(`${API_URL}/clientes`);
        const clientes = await resposta.json();

        listaClientes.innerHTML = "";

    clientes.forEach((cliente)=>{
        listaClientes.innerHTML += `
        <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.telefone || ""}</td>
        <td><a href="cadastro.html?id=${cliente.id}" class="btn-editar">Editar</a></td>
        </tr>
        `;
    });


    } catch (erro){
        console.error(erro); 
        mensagem.textContent = "Não foi possivel carregar os clientes";
    }
}
carregarClientes();