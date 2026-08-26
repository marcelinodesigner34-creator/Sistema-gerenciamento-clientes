const usuario = [
    {id: 1, nome: "Maria Souza", email: "maria@gmail.com", senha: "1234", tipo: "administrador"},
    {id: 1, nome: "João Lima", email: "joao@gmail.com", senha: "5678", tipo: "atendente"}, 
    {id: 1, nome: "Marcos Silva", email: "marcos@gmail.com", senha: "2589", tipo: "cliente"}
]




const botao = document.getElementById("btnEntrar");

botao.addEventListener("click", function () {
    const loginDigitado = document.getElementById("login").value;
    const senhaDigitada = document.getElementById("senha").value;
    const usuarioEcontrado = usuario.find(function (u){
        return u.email === loginDigitado && u.senha === senhaDigitada;
    });
      const mensagem = document.getElementById("mensagemErro");

  if (usuarioEcontrado) {
    window.location.href = "principal.html";
  } else {
    mensagem.textContent = "E-mail ou senha inválidos";
  }
});