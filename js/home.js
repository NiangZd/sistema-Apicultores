if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "login.html";
}

const userLogado = JSON.parse(localStorage.getItem("userLogado"));

let nome = document.querySelector('#nUser')
nome.innerHTML = userLogado.nome

let logado = document.querySelector('#user-bv')
logado.innerHTML = `Bem vindo(a), ${userLogado.nome}`


function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "login.html";
}