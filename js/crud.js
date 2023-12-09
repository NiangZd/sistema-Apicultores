let atualColmeiaPag = 1;
let colmeiaPorPag = 5
let totalColmeias = 0;
var colmeiasList;
var html = "";

function validForm() {
    const form = document.getElementById("form");
    const error = form.querySelectorAll(".error");
    let erros = false;

    // Mensagens de erro
    const localizacaoErrorMsg = document.getElementById("localizacaoErrorMsg");
    const tipoErrorMsg = document.getElementById("tipoErrorMsg");
    const dataErrorMsg = document.getElementById("dataErrorMsg");
    const pesagemErrorMsg = document.getElementById("pesagemErrorMsg");
    const statusErrorMsg = document.getElementById("statusErrorMsg");
    const racaErrorMsg = document.getElementById("racaErrorMsg");

    const localizacao = form.querySelector('input[name="loc"]').value;
    const tipo = form.querySelector('input[name="tipo"]').value;
    const data = document.getElementById("data").value;
    const pesagem = form.querySelector('input[name="pesagem"]').value;
    const status = form.querySelector('input[name="status"]').value;
    const raca = form.querySelector('input[name="raca"]').value;

    if (!form.checkValidity()) {
        form.classList.add("was-validated");

        if (localizacao.trim() === "") {
            localizacaoErrorMsg.innerHTML = "Informe a localização";
            localizacaoErrorMsg.style.display = "block";
            setTimeout(function () {
                localizacaoErrorMsg.style.display = "none";
            }, 3000);
            erros = true;
        }

        if (tipo.trim() === "") {
            tipoErrorMsg.innerHTML = "Informe o tipo de colmeia";
            tipoErrorMsg.style.display = "block";
            setTimeout(function () {
                tipoErrorMsg.style.display = "none";
            }, 3000);
            erros = true;
        }


        if (data.trim() === "") {
            dataErrorMsg.innerHTML = "Informe a data de criação da colmeia";
            dataErrorMsg.style.display = "block";
            setTimeout(function () {
                dataErrorMsg.style.display = "none";
            }, 3000);
            erros = true;
        }

        if (pesagem.trim() === "") {
            pesagemErrorMsg.innerHTML = "Informe a pesagem de mel";
            pesagemErrorMsg.style.display = "block";
            setTimeout(function () {
                pesagemErrorMsg.style.display = "none";
            }, 3000);
            erros = true;
        }

        if (status.trim() === "") {
            statusErrorMsg.innerHTML = "Infome o status atual da colmeia";
            statusErrorMsg.style.display = "block";
            setTimeout(function () {
                statusErrorMsg.style.display = "none";
            }, 3000);
            erros = true;
        }

        if (raca.trim() === "") {
            racaErrorMsg.innerHTML = "Informe a raça das abelhas";
            racaErrorMsg.style.display = "block";
            setTimeout(function () {
                racaErrorMsg.style.display = "none";
            }, 3000);
            erros = true;
        }

        setTimeout(function () {
            form.classList.remove("was-validated");
            error.forEach(element => element.style.display = "none");
        }, 3000);

        return false;
    }
    form.classList.remove("was-validated");
    return true;
}

function mostrarDados() {
    var html = "";
    if (localStorage.getItem("colmeiasList") == null) {
        colmeiasList = [];
    }
    else {
        colmeiasList = JSON.parse(localStorage.getItem("colmeiasList"))
    }

    // Mostrar todos os dados na tabela com botões (editar, apagar e visualizar)
    colmeiasList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.localizacao + "</td>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.data + "</td>";
        html += "<td>" + element.pesagem + "</td>";
        html += "<td>" + element.status + "</td>";
        html += "<td>" + element.raca + "</td>";
        html +=
            '<td style="text-align: center"><button type="button" onclick="verColmeia(' +
            index +
            ')" class="btn btn-info m-2"><i class="bi bi-eye"></i></button><button type="button" onclick="deletar(' +
            index +
            ')" class="btn btn-danger" id="Delete"><i class="bi bi-trash"></i></button><button type="button" onclick="atualizar(' +
            index +
            ')" class="btn btn-warning m-2"><i class="bi bi-pencil-square"></i></button></td>'
        html += "</tr>";
    });

    document.querySelector("#userTable tbody").innerHTML = html;

    mostrarColmeiasNaPagina(colmeiasList)
    atualizarInfo()
}

// Fechar o modal ao clicar fora do conteúdo do modal
window.addEventListener('click', function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Fechar o modal quando a tecla Escape é premida
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Função para abrir o modal
function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Função pra fechar o modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function verColmeia(indexOnPage) {
    // Function to display all data in the modal
    const modalInfo = document.getElementById("modalInfo");
    modalInfo.innerHTML = ""; // Clear previous data

    const indexInList = (atualColmeiaPag - 1) * colmeiaPorPag + indexOnPage;

    const verColmeia = colmeiasList[indexInList];

    //Criar e anexar para apresentar a colmeia no modal
    const localizacao = document.createElement("h5");
    localizacao.innerHTML = `<strong>Localização: </strong> ${verColmeia.localizacao}`;
    modalInfo.appendChild(localizacao);

    const tipo = document.createElement("h5");
    tipo.innerHTML = `<strong>Tipo: </strong> ${verColmeia.tipo}`;
    modalInfo.appendChild(tipo);

    const data = document.createElement("h5");
    data.innerHTML = `<strong>Data: </strong> ${verColmeia.data}`;
    modalInfo.appendChild(data);

    const pesagem = document.createElement("h5");
    pesagem.innerHTML = `<strong>Pesagem: </strong> ${verColmeia.pesagem}`;
    modalInfo.appendChild(pesagem);

    const status = document.createElement("h5");
    status.innerHTML = `<strong>Status: </strong> ${verColmeia.status}`;
    modalInfo.appendChild(status);

    const raca = document.createElement("h5");
    raca.innerHTML = `<strong>Raça: </strong> ${verColmeia.raca}`;
    modalInfo.appendChild(raca);

    openModal();
}

closeModal();

// Função para adicionar dados ao local storage
function addColmeia() {
    if (validForm()) {
        var localizacao = document.getElementById("localizacao").value;
        var tipo = document.getElementById("tipo").value;
        var data = document.getElementById("data").value;
        var pesagem = document.getElementById("pesagem").value;
        var status = document.getElementById("status").value;
        var raca = document.getElementById("raca").value;

        if (localStorage.getItem("colmeiasList") == null) {
            colmeiasList = [];
        }
        else {
            colmeiasList = JSON.parse(localStorage.getItem("colmeiasList"));
        }

        colmeiasList.push({
            localizacao: localizacao,
            tipo: tipo,
            data: data,
            pesagem: pesagem,
            status: status,
            raca: raca,
        });

        localStorage.setItem("colmeiasList", JSON.stringify(colmeiasList));

        var successAlert = document.querySelector(".alert-success");
        successAlert.style.display = "block";

        setTimeout(function () {
            successAlert.style.display = "none";
        }, 3000);

        document.getElementById("localizacao").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("data").value = "";
        document.getElementById("pesagem").value = "";
        document.getElementById("status").value = "";
        document.getElementById("raca").value = "";

        mostrarColmeiasNaPagina(colmeiasList)
        atualizarInfo()
    }
}

function deletar(indexOnPage) {
    const indiceNaLista = (atualColmeiaPag - 1) * colmeiaPorPag + indexOnPage;

    colmeiasList.splice(indiceNaLista, 1);

    localStorage.setItem("colmeiasList", JSON.stringify(colmeiasList));

    var deleteAlert = document.querySelector(".alert-danger");
    deleteAlert.style.display = "block";

    setTimeout(function () {
        deleteAlert.style.display = "none";
    }, 3000);

    mostrarColmeiasNaPagina(colmeiasList)
    atualizarInfo()

    
    document.getElementById("searchbar").value = "";
    SearchBar();
}

function atualizar(indexOnPage) {
    document.getElementById('Submit').style.display = "none";
    document.getElementById('Update').style.display = "block";

    const indiceNaLista = (atualColmeiaPag - 1) * colmeiaPorPag + indexOnPage;

    const colmeiaAtualizada = colmeiasList[indiceNaLista];

    document.getElementById("localizacao").value = colmeiasList[indiceNaLista].localizacao;
    document.getElementById("tipo").value = colmeiasList[indiceNaLista].tipo;
    document.getElementById("data").value = colmeiasList[indiceNaLista].data;
    document.getElementById("pesagem").value = colmeiasList[indiceNaLista].pesagem;
    document.getElementById("status").value = colmeiasList[indiceNaLista].status;
    document.getElementById("raca").value = colmeiasList[indiceNaLista].raca;

    document.querySelector("#Update").onclick = function () {
        if (validForm()) {
            colmeiaAtualizada.localizacao = document.getElementById("localizacao").value;
            colmeiaAtualizada.tipo = document.getElementById("tipo").value;
            colmeiaAtualizada.data = document.getElementById("data").value;
            colmeiaAtualizada.pesagem = document.getElementById("pesagem").value;
            colmeiaAtualizada.status = document.getElementById("status").value;
            colmeiaAtualizada.raca = document.getElementById("raca").value;

            localStorage.setItem("colmeiasList", JSON.stringify(colmeiasList));

            var alertUp = document.querySelector(".alert-info");
            alertUp.style.background = "black"
            alertUp.style.color = "#00008B"
            alertUp.style.display = "block";

            setTimeout(function () {
                alertUp.style.display = "none";
            }, 3000);

            document.getElementById("localizacao").value = "";
            document.getElementById("tipo").value = "";
            document.getElementById("data").value = "";
            document.getElementById("pesagem").value = "";
            document.getElementById("status").value = "";
            document.getElementById("raca").value = "";

            document.getElementById('Update').style.display = "none";
            document.getElementById('Submit').style.display = "block";

            mostrarColmeiasNaPagina(colmeiasList)
            atualizarInfo()
        }
    }
}

function preencherTabela(colmeia) {
    var html = "";

    colmeia.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.localizacao + "</td>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.data + "</td>";
        html += "<td>" + element.pesagem + "</td>";
        html += "<td>" + element.status + "</td>";
        html += "<td>" + element.raca + "</td>";
        html +=
            '<td style="text-align: center"><button type="button" onclick="verColmeia(' +
            index +
            ')" class="btn btn-info m-2"><i class="bi bi-eye"></i></button><button type="button" onclick="deletar(' +
            index +
            ')" class="btn btn-danger" id="Delete"><i class="bi bi-trash"></i></button><button type="button" onclick="atualizar(' +
            index +
            ')" class="btn btn-warning m-2"><i class="bi bi-pencil-square"></i></button></td>'
        html += "</tr>";
    });

    document.querySelector("#userTable tbody").innerHTML = html;
}

function atualizarInfo() {
    const paginationInfo = document.getElementById("paginationInfo");
    const contagemColmeias = document.getElementById("contagemColmeias");

    contagemColmeias.textContent = `Mostrando ${totalColmeias} resultados`
}

/*function quantColmeias(){
    const contagem = document.getElementById("cont")
    contagem.textContent = totalColmeias
}*/

function mostrarColmeiasNaPagina(colmeiasList) {
    const indiceInicial = (atualColmeiaPag - 1) * colmeiaPorPag;
    const indiceFinal = indiceInicial + colmeiaPorPag;
    const mostrarColmeia = colmeiasList.slice(indiceInicial, indiceFinal);
    var html = "";

    mostrarColmeia.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.localizacao + "</td>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.data + "</td>";
        html += "<td>" + element.pesagem + "</td>";
        html += "<td>" + element.status + "</td>";
        html += "<td>" + element.raca + "</td>";
        html +=
            '<td style="text-align: center"><button type="button" onclick="verColmeia(' +
            index +
            ')" class="btn btn-info m-2"><i class="bi bi-eye"></i></button><button type="button" onclick="deletar(' +
            index +
            ')" class="btn btn-danger" id="Delete"><i class="bi bi-trash"></i></button><button type="button" onclick="atualizar(' +
            index +
            ')" class="btn btn-warning m-2"><i class="bi bi-pencil-square"></i></button></td>'
        html += "</tr>";
    });

    document.querySelector("#userTableBody").innerHTML = html;

    totalColmeias = colmeiasList.length;
}

function SearchBar() {
    var input, filter, i, textValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();

   // Mensagem de resultado não encontrado
    const searchMessage = document.getElementById("message");
    // Mostrar todos os resultados
    const contagemColmeias = document.getElementById("contagemColmeias");
   // Mostrar o número de resultados correspondentes
    searchResultCount = document.getElementById("contagemColmeias");
    // Sinalizador para registar se foi encontrada uma linha correspondente
    let existeResult = false;

    let linhasCorrespondentes = [];

    if (filter === "") {
       // Se a entrada de pesquisa estiver vazia, repõe a userList na lista original
        colmeiasList = JSON.parse(localStorage.getItem("colmeiasList")) || [];
    } else {
        for (i = 0; i < colmeiasList.length; i++) {
            const colmeia = colmeiasList[i];

            // Verificar cada propriedade no objeto do utilizador para uma correspondência
            for (const key in colmeia) {
                if (colmeia.hasOwnProperty(key)) {
                    if (typeof colmeia[key] === "string") {
                        textValue = colmeia[key].toUpperCase();
                        if (textValue.indexOf(filter) > -1) {
                            // Se for encontrada uma correspondência, adicionar este utilizador 
                            // ao conjunto matchingRows
                            linhasCorrespondentes.push(colmeia);
                            existeResult = true;
                            break; 
                        }
                    }
                    
                }
            }
        }
    }

    // Atualizar a tabela com as linhas correspondentes ou 
    //voltar à lista de utilizadores original se a pesquisa estiver vazia
    if (filter === "") {
        mostrarColmeiasNaPagina(colmeiasList);
    } else {
        preencherTabela(linhasCorrespondentes);
    }

    // Mostrar ou ocultar a mensagem de que a correspondência foi encontrada ou não
    if (existeResult) {
        searchMessage.style.display = "none";
        searchMessage.innerHTML = "";
    } else {
        searchMessage.style.display = "block";
        searchMessage.innerHTML = "Nenhum resultado encontrado";
    }

    if (searchResultCount) {
        // Atualizar a contagem dos resultados da pesquisa
        contagemColmeias.style.display = "block";
        // Atualizando a contagem
        contagemColmeias.textContent = `Mostrando ${linhasCorrespondentes.length} de ${totalColmeias} resultados`; 
    } else {
        // Voltar à contagem total original
        searchResultCount.style.display = "none";
        contagemColmeias.textContent = `Mostrando ${totalColmeias} resultados`;
    }

    // Limpar a mensagem quando o valor de entrada estiver vazio e voltar à tabela original
    if (input.value === "") {
        searchMessage.style.display = "none";
        searchMessage.innerHTML = "";
        mostrarColmeiasNaPagina(colmeiasList);
        atualizarInfo();
    }


}


window.onload = function () {
    mostrarDados();
}

var colmeiasList = localStorage.getItem("colmeiasList") ? JSON.parse(localStorage.getItem("colmeiasList")) : [];