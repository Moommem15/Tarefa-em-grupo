const ListaTarefas = document.getElementById("ListaTarefas")
const InputTarefa = document.getElementById("InputTarefa")
const listaTarefaJson = JSON.parse(localStorage.getItem("Tarefas")) || [{ id: 1, Texto: "Test", IsPendent: 1, IsPrioridade: 0 }]
const FiltroButton = document.querySelectorAll(".Filtro button")
let TipoAtual = 0

//titulo 50 caractres e descrição 250

function CriarCard(element)
{
     ListaTarefas.innerHTML += `  <div class="CardTarefa" title="${element.Texto}">
                        <input type="checkbox" id="tarefa-${element.id}" ${element.IsPendent === 0 ? 'checked' : ''}
                            onchange="MudarStatus(${element.id})">
                        <label for="tarefa-${element.id}"><p>${element.Texto}</p></label>
                        <div class="acao">
                            <button class="Prioridade" onclick="Priorizar(${element.id})">
                                <img src="${element.IsPrioridade == 1 ? " BandeiraAtiva.png" : "BandeiraDesativada.png"}" alt="">
                            </button>
                            <button class="RemoverTarefa" onclick="RemoverTarefa(${element.id})" aria-label="Remover tarefa">
                                <img src="RemoverIcone.png" alt="" aria-hidden="true">
                            </button>
                        </div>`
}

function MostraTarefa(Tipo1) {
    let Tipo = Tipo1
    if (Tipo === undefined) {
        Tipo = TipoAtual
    } else {
        TipoAtual = Tipo
    }
    FiltroButton.forEach((element) => { element.style.color = 'black' })
    ListaTarefas.innerHTML = ''
    //0 = totas 1 = pedente 2 concluida
    if (Tipo == 0) {
        FiltroButton.forEach((element) => { console.log(element.textContent); if (element.textContent == 'Todos') { element.style.color = 'blue' } })
        listaTarefaJson.forEach((element) => {
            CriarCard(element)
        })
    }
    //Em-Andamento = IsPendent = 1
    if (Tipo == 1) {
        FiltroButton.forEach((element) => { console.log(element.textContent); if (element.textContent == 'Em andamento') { element.style.color = 'blue' } })
        listaTarefaJson.forEach((element) => {
            if (element.IsPendent == 1) {
               CriarCard(element)
            }

        })
    }
    //Finalizado = IsPendent = 0
    if (Tipo == 2) {
        FiltroButton.forEach((element) => { console.log(element.textContent); if (element.textContent == 'Finalizados') { element.style.color = 'blue' } })
        listaTarefaJson.forEach((element) => {
            if (element.IsPendent == 0) {
               CriarCard(element)
            }

        })
    }
}
function AddTarefa() {
    if (String(InputTarefa.value).replace(" ", '') == 0) {
        return alert("Não pode esta em branco!")
    }
    listaTarefaJson.push({ id: listaTarefaJson.length + 1, Texto: InputTarefa.value, IsPendent: 1, IsPrioridade:0 })
    InputTarefa.value = null
    localStorage.setItem("Tarefas", JSON.stringify(listaTarefaJson))
    MostraTarefa()
}
function MudarStatus(id) {
    console.log(id);

    console.log("Foi chamado")
    for (let index = 0; index < listaTarefaJson.length; index++) {
        const element = listaTarefaJson[index];
        if (element.id == id) {

            element.IsPendent = element.IsPendent == 1 ? 0 : 1
        }
    }
}
function RemoverTarefa(id) {
    if (confirm("Tem certeza que deseja remover essa tarefa?")) {

    }
    for (let index = 0; index < listaTarefaJson.length; index++) {
        const element = listaTarefaJson[index];
        if (element.id == id) {


            listaTarefaJson.splice(index, index + 1)
        }
    }
    MostraTarefa()
    localStorage.setItem("Tarefas", JSON.stringify(listaTarefaJson))
}
function Priorizar(id) {
    for (let index = 0; index < listaTarefaJson.length; index++) {
        const element = listaTarefaJson[index];
        if (element.id == id) {


            element.IsPrioridade = element.IsPrioridade == 1 ? 0 : 1
        }
    }
   listaTarefaJson.sort((a, b) => b.IsPrioridade - a.IsPrioridade);
    MostraTarefa()
}
//MostraTarefa(0)