const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

if (!usuarioLogado) {
  window.location.href = "index.html";
}

if (usuarioLogado && usuarioLogado.tipo !== "administrador") {
  document.getElementById("menuUsuarios").style.display = "none";
}

const btnSair = document.getElementById("btnSair");

btnSair.addEventListener("click", () => {
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
});