const STORAGE_KEY = "gestao-academica-turmas";
const turnos = {
    manha: "Manhã",
    tarde: "Tarde",
    noite: "Noite"
};

let turmas = carregarTurmas();

const formularioTurma = document.querySelector("#turma");
const listaTurmas = document.querySelector("#lista-turmas");
const aviso = document.querySelector(".p3 p");

formularioTurma.addEventListener("submit", cadastrarTurma);
renderizarTurmas();

function carregarTurmas() {
    try {
        const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function salvarTurmas() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
        return true;
    } catch {
        mostrarAviso("Não foi possível salvar os dados neste navegador.");
        return false;
    }
}

function cadastrarTurma(event) {
    event.preventDefault();

    const nome = document.querySelector("#nometurma").value.trim();
    const turno = document.querySelector("#Turno").value;

    if (!nome) {
        mostrarAviso("Informe o nome da turma.");
        return;
    }

    turmas.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        nome,
        turno
    });

    const salvo = salvarTurmas();
    renderizarTurmas();
    formularioTurma.reset();
    if (salvo) mostrarAviso(`Turma "${nome}" cadastrada.`);
}

function renderizarTurmas() {
    listaTurmas.replaceChildren();
    atualizarContador();

    if (turmas.length === 0) {
        const vazio = document.createElement("p");
        vazio.textContent = "Nenhuma turma cadastrada ainda.";
        listaTurmas.append(vazio);
        return;
    }

    turmas.forEach((turma) => {
        const item = document.createElement("div");
        item.className = "borda2";

        const nome = document.createElement("h3");
        nome.textContent = turma.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent = `Turno: ${turnos[turma.turno] || turma.turno}`;

        const botoes = document.createElement("div");
        botoes.className = "buttonsbored";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", () => editarTurma(turma.id));

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => excluirTurma(turma.id));

        botoes.append(botaoEditar, botaoExcluir);
        item.append(nome, detalhes, botoes);
        listaTurmas.append(item);
    });
}

function atualizarContador() {
    const contador = document.querySelector(".coluna1 p:nth-child(2)");
    contador.textContent = turmas.length;
}

function editarTurma(id) {
    const turma = turmas.find((item) => item.id === id);
    if (!turma) return;

    const novoNome = window.prompt("Nome da turma:", turma.nome);
    if (novoNome === null) return;

    const nome = novoNome.trim();
    if (!nome) {
        mostrarAviso("O nome da turma não pode ficar vazio.");
        return;
    }

    turma.nome = nome;
    const salvo = salvarTurmas();
    renderizarTurmas();
    if (salvo) mostrarAviso("Turma atualizada.");
}

function excluirTurma(id) {
    const turma = turmas.find((item) => item.id === id);
    if (!turma) return;
    if (!window.confirm(`Excluir a turma "${turma.nome}"?`)) return;

    turmas = turmas.filter((item) => item.id !== id);
    const salvo = salvarTurmas();
    renderizarTurmas();
    if (salvo) mostrarAviso("Turma excluída.");
}

function mostrarAviso(mensagem) {
    aviso.textContent = mensagem;
}

function mostrarSecao(nome) {
    mostrarAviso(`${nome}: esta seção ainda não foi implementada.`);
}

function showTurmas() {
    mostrarAviso("Gerenciamento de turmas.");
}

function showEstudantes() {
    mostrarSecao("Estudantes");
}

function showNotas() {
    mostrarSecao("Notas e frequência");
}

function showRelatorios() {
    mostrarSecao("Relatórios");
}
