const usuarioAtual = JSON.parse(localStorage.getItem("usuario"));
if (usuarioAtual.tipo !== "administrador") {
    window.location.href = "principal.html"
}

const formulario = document.getElementById("formUsuario");
const mensagem = document.getElementById("mensagem");
const btnSalvar = document.getElementById("btnSalvar");

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
        await usuarioService.cadastrar(usuario);
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