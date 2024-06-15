document.addEventListener('DOMContentLoaded', function () {
    let selectedDisciplina = null;

    // Ação ao submeter o formulário do modal
    document.querySelector('.modal-body form').addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const sigla = document.getElementById('sigla').value;
        const cargahoraria = document.querySelector('.btn-outline-primary.active')?.dataset.cargahoraria;

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
            consultaButton.setAttribute('data-cargahoraria', cargahoraria);
            consultaButton.innerHTML = '<p class="text-bottom"><i class="fa-solid fa-magnifying-glass"></i></p>';
            turmaNameDiv.appendChild(consultaButton);

            document.querySelector('.box-dashboard .turmas').appendChild(turmaNameDiv);

            consultaButton.addEventListener('click', showDisciplinaInfo);
        } else {
            // Editando uma disciplina existente
            selectedDisciplina.setAttribute('data-nome', nome);
            selectedDisciplina.setAttribute('data-sigla', sigla);
            selectedDisciplina.setAttribute('data-cargahoraria', cargahoraria);
            selectedDisciplina.parentElement.querySelector('p').textContent = nome;
            updateDisciplinaInfo(nome, sigla, cargahoraria);
        }

        $('#formModal').modal('hide');
        document.querySelector('.modal-body form').reset();
        selectedDisciplina = null;
    });

    // Exibir informações da disciplina ao clicar no botão de consulta
    function showDisciplinaInfo() {
        const nome = this.getAttribute('data-nome');
        const sigla = this.getAttribute('data-sigla');
        const cargahoraria = this.getAttribute('data-cargahoraria');

        updateDisciplinaInfo(nome, sigla, cargahoraria);
        selectedDisciplina = this;
    }

    // Atualizar informações da disciplina exibidas
    function updateDisciplinaInfo(nome, sigla, cargahoraria) {
        document.getElementById('infoNome').textContent = nome;
        document.getElementById('infoSigla').textContent = sigla;
        document.getElementById('infoCargaHoraria').textContent = cargahoraria;
    }

    // Ação ao clicar no botão de editar
    document.querySelector('.perfil-options .editar').addEventListener('click', function () {
        if (!selectedDisciplina) return;

        const nome = selectedDisciplina.getAttribute('data-nome');
        const sigla = selectedDisciplina.getAttribute('data-sigla');
        const cargahoraria = selectedDisciplina.getAttribute('data-cargahoraria');

        document.getElementById('nome').value = nome;
        document.getElementById('sigla').value = sigla;

        document.querySelectorAll('.btn-outline-primary').forEach(button => {
            if (button.getAttribute('data-cargahoraria') === cargahoraria) {
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

        updateDisciplinaInfo('', '', '');
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

    // Ação ao clicar nos botões de carga horária
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.btn-outline-primary').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
