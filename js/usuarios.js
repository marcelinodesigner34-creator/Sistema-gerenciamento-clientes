const usuarioAtual = JSON.parse(localStorage.getItem("usuario"));
if(usuarioAtual.tipo !== "administrador"){
    window.location.href = "principal.html";
}

const listaUsuarios = document.getElementById("listaUsuarios");
const mensagem = document.getElementById("mensagem");

const mostrarUsuarios = (usuarios)=>{
    listaUsuarios.innerHTML ="";

    if(usuarios.length ===0){
        mensagem.textContent= "Nenhum usuário encontrado";
        return;
    }

    usuarios.forEach((usuario)=>{
        listaUsuarios.innerHTML +=`
        <tr>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.tipo}</td>
        <td><a href="usuario-cadastro.html?id=${usuario.id}" class="btn-editar">Editar</a>
        <button class="btn-excluir" onclick="excluirUsuario(${usuario.id})">Remover</button></td>
      </tr>
        `;
    });
};

const carregarUsuarios = async ()=>{
    try{
        const usuarios = await usuarioService.listar();
        mostrarUsuarios(usuarios);
    }catch (erro){
        console.error(erro);
        mensagem.textContent = "Não foi possivel carregar os usuários";
    }
};

const excluirUsuario = async (id)=>{
    const confirmou = confirm("Tem certeza que deseja remover esta usuário?");
    if(!confirmou){
        return;
    }


try{
    const dados = await usuarioService.excluir(id, usuarioAtual.id);
    await carregarUsuarios();
    mensagem.classList.add("mensagem-sucesso");
    mensagem.textContent= dados.mensagem;
} catch (erro){
    console.error(erro);
    mensagem.classList.remove("mensagem-sucesso");
    if(erro.response){
mensagem.textContent = erro.response.data.mensagem;

    }else{
          mensagem.textContent = "Não foi possivel remover o usuário";
    } 
}
};
carregarUsuarios();