document.addEventListener('DOMContentLoaded', function () {
    let selectedDisciplina = null;

    // Ação ao submeter o formulário do modal
    document.querySelector('.modal-body form').addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const sigla = document.getElementById('sigla').value;
        const duracao = document.querySelector('.btn-outline-primary.active')?.dataset.duracao;
        const coordenador = document.getElementById('coordenador').value;
        const grade = document.getElementById('grade').value;

        if (!selectedDisciplina) {
            // Adicionando uma nova disciplina
            const turmaNameDiv = document.createElement('div');
            turmaNameDiv.classList.add('turma-name');

            const p = document.createElement('p');
            p.textContent = nome;
            turmaNameDiv.appendChild(p);

            const consultaButton = document.createElement('button');
            consultaButton.classList.add('botao-consulta');
            consultaButton.setAttribute('type', 'button');
            consultaButton.setAttribute('data-nome', nome);
            consultaButton.setAttribute('data-sigla', sigla);
            consultaButton.setAttribute('data-duracao', duracao);
            consultaButton.setAttribute('data-coordenador', coordenador);
            consultaButton.setAttribute('data-grade', grade);
            consultaButton.innerHTML = '<p class="text-bottom"><i class="fa-solid fa-magnifying-glass"></i></p>';
            turmaNameDiv.appendChild(consultaButton);

            document.querySelector('.box-dashboard .turmas').appendChild(turmaNameDiv);

            consultaButton.addEventListener('click', showDisciplinaInfo);
        } else {
            // Editando uma disciplina existente
            selectedDisciplina.setAttribute('data-nome', nome);
            selectedDisciplina.setAttribute('data-sigla', sigla);
            selectedDisciplina.setAttribute('data-duracao', duracao);
            selectedDisciplina.setAttribute('data-coordenador', coordenador);
            selectedDisciplina.setAttribute('data-grade', grade);
            selectedDisciplina.parentElement.querySelector('p').textContent = nome;
            updateDisciplinaInfo(nome, sigla, duracao, coordenador, grade);
        }

        $('#formModal').modal('hide');
        document.querySelector('.modal-body form').reset();
        selectedDisciplina = null;
    });

    // Exibir informações da disciplina ao clicar no botão de consulta
    function showDisciplinaInfo() {
        const nome = this.getAttribute('data-nome');
        const sigla = this.getAttribute('data-sigla');
        const duracao = this.getAttribute('data-duracao');
        const coordenador = this.getAttribute('data-coordenador');
        const grade = this.getAttribute('data-grade');

        updateDisciplinaInfo(nome, sigla, duracao, coordenador, grade);
        selectedDisciplina = this;
    }

    // Atualizar informações da disciplina exibidas
    function updateDisciplinaInfo(nome, sigla, duracao, coordenador, grade) {
        document.getElementById('infoNome').textContent = nome;
        document.getElementById('infoSigla').textContent = sigla;
        document.getElementById('infoDuracao').textContent = duracao;
        document.getElementById('infoCoordenador').textContent = coordenador;
        document.getElementById('infoGrade').textContent = grade;
    }

    // Ação ao clicar no botão de editar
    document.querySelector('.perfil-options .editar').addEventListener('click', function () {
        if (!selectedDisciplina) return;

        const nome = selectedDisciplina.getAttribute('data-nome');
        const sigla = selectedDisciplina.getAttribute('data-sigla');
        const duracao = selectedDisciplina.getAttribute('data-duracao');
        const coordenador = selectedDisciplina.getAttribute('data-coordenador');
        const grade = selectedDisciplina.getAttribute('data-grade');

        document.getElementById('nome').value = nome;
        document.getElementById('sigla').value = sigla;
        document.getElementById('coordenador').value = coordenador;
        document.getElementById('grade').value = grade;

        document.querySelectorAll('.btn-outline-primary').forEach(button => {
            if (button.getAttribute('data-duracao') === duracao) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        $('#formModal').modal('show');
    });

    // Ação ao clicar no botão de excluir
    document.querySelector('.perfil-options .delete').addEventListener('click', function () {
        if (!selectedDisciplina) return;

        selectedDisciplina.parentElement.remove();
        selectedDisciplina = null;

        updateDisciplinaInfo('', '', '', '', '');
    });

    // Ação ao clicar no botão de cadastrar
    document.querySelector('.perfil-options .cadastrar').addEventListener('click', function () {
        $('#formModal').modal('show');
        document.querySelector('.modal-body form').reset();
        selectedDisciplina = null;
    });

    // Ação ao clicar no botão de fechar o modal
    document.querySelector('.close').addEventListener('click', function () {
        $('#formModal').modal('hide');
    });

    // Ação ao clicar no botão de voltar
    document.getElementById('voltar').addEventListener('click', function () {
        window.history.back();
    });

    // Adicionar evento aos botões de consulta existentes
    document.querySelectorAll('.botao-consulta').forEach(button => {
        button.addEventListener('click', showDisciplinaInfo);
    });

    // Ação ao clicar nos botões de duração
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.btn-outline-primary').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
