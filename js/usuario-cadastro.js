const usuarioAtual = JSON.parse(localStorage.getItem("usuario"));
if (usuarioAtual.tipo !== "administrador") {
    window.location.href = "principal.html"
}

const formulario = document.getElementById("formUsuario");
const mensagem = document.getElementById("mensagem");
const btnSalvar = document.getElementById("btnSalvar");
const parametros = new URLSearchParams(window.location.search);
const idUsuario = parametros.get("id")

const preencherFormulario = async () => {
    try {
        const usuario = await usuarioService.buscarPorId(idUsuario);
        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email
        document.getElementById("tipo").value = usuario.tipo;
    } catch (erro) {
        console.error(erro);

        if (erro.response) {
            mensagem.textContent = erro.response.data.mensagem;
        } else {
            mensagem.textContent = "Não foi possivel carregar o usuário"
        }
    }
};

if (idUsuario) {
    document.querySelector(".card-cadastro h1").textContent = "Editar Usuário";
    document.getElementById("senha").placeholder = "Deixe em branco para manter a atual";
    preencherFormulario();
}


formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        tipo: document.getElementById("tipo").value
    };

    document.querySelectorAll(".campo-erro").forEach((campo) => campo.classList.remove("campo-erro"));

    btnSalvar.disabled = true;
    btnSalvar.textContent = "Salvando...";

    try {
        if (idUsuario) {
            await usuarioService.editar(idUsuario, usuario);
        } else {
            await usuarioService.cadastrar(usuario);
        }
        window.location.href = "usuarios.html";
    } catch (erro) {
        console.error(erro);
        if (erro.response) {
            mensagem.textContent = erro.response.data.mensagem;
            const campoComErro = erro.response.data.campo;

            const input = document.getElementById(campoComErro);
            if (input) {

                input.classList.add("campo-erro");
                input.focus();
            }

        } else {
            mensagem.textContent = "Não foi possível conectar ao servidor";
        }
    } finally {
        btnSalvar.disabled = false;
        btnSalvar.textContent = "Salvar";
    }
});

document.getElementById("btnCancelar").addEventListener("click", () => {
    window.location.href = "usuarios.html"
});