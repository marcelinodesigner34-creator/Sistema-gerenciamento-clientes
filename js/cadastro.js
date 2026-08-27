const clientes = [];

const formulario = document.getElementById("formCliente");

formulario.addEventListener("submit", function (evento) {
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

    if (cpf === ""){
        mensagem.textContent = "O campo CPF é obrigatório";
         campoCpf.classList.add("campo-erro");
        campoCpf.focus();
        return;
    }

    const cpfExiste = clientes.find(function (c) {
        return c.cpf === cpf;
    });

    if (cpfExiste) {
        mensagem.textContent = "CPF já cadastrado no sistema";
        return;
    }

    mensagem.textContent = "";


    const cliente = {
        id: clientes.length + 1,
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        dataNascimento: dataNascimento,
        endereco: endereco
    };
    clientes.push(cliente)
    console.log(cliente);
    formulario.reset();
});