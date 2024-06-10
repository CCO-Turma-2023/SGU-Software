document.addEventListener('DOMContentLoaded', function () {
    let selectedAdmin = null;

    document.querySelector('.modal-body').addEventListener('submit', function (event) {
        event.preventDefault();
        formModal.classList.remove('show');
        formModal.style.display = 'none';
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const contato = document.getElementById('contato').value;
        const curso = document.getElementById('curso').value;

        if (!selectedAdmin) {
            // Adicionando um novo administrador
            const turmaNameDiv = document.createElement('div');
            turmaNameDiv.classList.add('turma-name');

            const p = document.createElement('p');
            p.textContent = nome;
            turmaNameDiv.appendChild(p);

            const consultaButton = document.createElement('button');
            consultaButton.classList.add('botao-consulta');
            consultaButton.setAttribute('type', 'button');
            consultaButton.setAttribute('data-name', nome);
            consultaButton.setAttribute('data-cpf', cpf);
            consultaButton.setAttribute('data-endereco', endereco);
            consultaButton.setAttribute('data-email', email);
            consultaButton.setAttribute('data-contato', contato);
            consultaButton.setAttribute('data-curso', curso);
            consultaButton.innerHTML = '<p class="text-bottom"><i class="fa-solid fa-magnifying-glass"></i></p>';
            turmaNameDiv.appendChild(consultaButton);

            document.querySelector('.box-dashboard .turmas').appendChild(turmaNameDiv);

            consultaButton.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                const cpf = this.getAttribute('data-cpf');
                const endereco = this.getAttribute('data-endereco');
                const email = this.getAttribute('data-email');
                const contato = this.getAttribute('data-contato');
                const curso = this.getAttribute('data-curso');

                document.getElementById('infoNome').textContent = name;
                document.getElementById('infoCpf').textContent = cpf;
                document.getElementById('infoEndereco').textContent = endereco;
                document.getElementById('infoEmail').textContent = email;
                document.getElementById('infoContato').textContent = contato;
                document.getElementById('infoCurso').textContent = curso;

                selectedAdmin = consultaButton;
            });
        } else {
            // Editando um administrador existente
            selectedAdmin.setAttribute('data-name', nome);
            selectedAdmin.setAttribute('data-cpf', cpf);
            selectedAdmin.setAttribute('data-endereco', endereco);
            selectedAdmin.setAttribute('data-email', email);
            selectedAdmin.setAttribute('data-contato', contato);
            selectedAdmin.setAttribute('data-curso', curso);

            selectedAdmin.parentElement.querySelector('p').textContent = nome;

            document.getElementById('infoNome').textContent = nome;
            document.getElementById('infoCpf').textContent = cpf;
            document.getElementById('infoEndereco').textContent = endereco;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoContato').textContent = contato;
            document.getElementById('infoCurso').textContent = curso;
        }

        $('#formModal').modal('hide');
        document.querySelector('.modal-body form').reset();
    });

    document.querySelector('.perfil-options .editar').addEventListener('click', function () {
        if (!selectedAdmin) return;

        const name = selectedAdmin.getAttribute('data-name');
        const cpf = selectedAdmin.getAttribute('data-cpf');
        const endereco = selectedAdmin.getAttribute('data-endereco');
        const email = selectedAdmin.getAttribute('data-email');
        const contato = selectedAdmin.getAttribute('data-contato');
        const curso = selectedAdmin.getAttribute('data-curso');

        document.getElementById('nome').value = name;
        document.getElementById('cpf').value = cpf;
        document.getElementById('endereco').value = endereco;
        document.getElementById('email').value = email;
        document.getElementById('contato').value = contato;
        document.getElementById('curso').value = curso;
        const modalButton = document.querySelector('#formModal .btn-primary');
        modalButton.textContent = 'SALVAR';
        $('#formModal').modal('show');
    });

    document.querySelector('.perfil-options .delete').addEventListener('click', function () {
        if (!selectedAdmin) return;

        selectedAdmin.parentElement.remove();
        selectedAdmin = null;

        document.getElementById('infoNome').textContent = '';
        document.getElementById('infoCpf').textContent = '';
        document.getElementById('infoEndereco').textContent = '';
        document.getElementById('infoEmail').textContent = '';
        document.getElementById('infoContato').textContent = '';
        document.getElementById('infoCurso').textContent = '';
    });

    document.querySelector('.botao-login.cadastrar').addEventListener('click', function () {
        selectedAdmin = null;
        document.querySelector('.modal-body form').reset();
        $('#formModal').modal('show');
    });

    document.getElementById('voltar').addEventListener('click', function () {
        window.history.back();
    });

    document.querySelectorAll('.botao-consulta').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const cpf = this.getAttribute('data-cpf');
            const endereco = this.getAttribute('data-endereco');
            const email = this.getAttribute('data-email');
            const contato = this.getAttribute('data-contato');
            const curso = this.getAttribute('data-curso');

            document.getElementById('infoNome').textContent = name;
            document.getElementById('infoCpf').textContent = cpf;
            document.getElementById('infoEndereco').textContent = endereco;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoContato').textContent = contato;
            document.getElementById('infoCurso').textContent = curso;

            selectedAdmin = this;
        });
    });
});
