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
        const carteira = document.getElementById('carteira').value;
        const titulacao = document.getElementById('titulacao').value;
        const especializacao = document.getElementById('especializacao').value;

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
            consultaButton.setAttribute('data-carteira', carteira);
            consultaButton.setAttribute('data-titulacao', titulacao);
            consultaButton.setAttribute('data-especializacao', especializacao);
            consultaButton.innerHTML = '<p class="text-bottom"><i class="fa-solid fa-magnifying-glass"></i></p>';
            turmaNameDiv.appendChild(consultaButton);

            document.querySelector('.box-dashboard .turmas').appendChild(turmaNameDiv);

            consultaButton.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                const cpf = this.getAttribute('data-cpf');
                const endereco = this.getAttribute('data-endereco');
                const email = this.getAttribute('data-email');
                const contato = this.getAttribute('data-contato');
                const carteira = this.getAttribute('data-carteira');
                const titulacao = this.getAttribute('data-titulacao');
                const especializacao = this.getAttribute('data-especializacao');

                document.getElementById('infoNome').textContent = name;
                document.getElementById('infoCpf').textContent = cpf;
                document.getElementById('infoEndereco').textContent = endereco;
                document.getElementById('infoEmail').textContent = email;
                document.getElementById('infoContato').textContent = contato;
                document.getElementById('infoCarteira').textContent = carteira;
                document.getElementById('infoTitulacao').textContent = titulacao;
                document.getElementById('infoEspecializacao').textContent = especializacao;

                selectedAdmin = consultaButton;
            });

        } else {
            // Editando um administrador existente
            selectedAdmin.setAttribute('data-name', nome);
            selectedAdmin.setAttribute('data-cpf', cpf);
            selectedAdmin.setAttribute('data-endereco', endereco);
            selectedAdmin.setAttribute('data-email', email);
            selectedAdmin.setAttribute('data-contato', contato);
            selectedAdmin.setAttribute('data-carteira', carteira);
            selectedAdmin.setAttribute('data-titulacao', titulacao);
            selectedAdmin.setAttribute('data-especializacao', especializacao);

            selectedAdmin.parentElement.querySelector('p').textContent = nome;

            document.getElementById('infoNome').textContent = nome;
            document.getElementById('infoCpf').textContent = cpf;
            document.getElementById('infoEndereco').textContent = endereco;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoContato').textContent = contato;
            document.getElementById('infoCarteira').textContent = carteira;
            document.getElementById('infoTitulacao').textContent = titulacao;
            document.getElementById('infoEspecializacao').textContent = especializacao;
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
        const carteira = selectedAdmin.getAttribute('data-carteira');
        const titulacao = selectedAdmin.getAttribute('data-titulacao');
        const especializacao = selectedAdmin.getAttribute('data-especializacao');

        document.getElementById('nome').value = name;
        document.getElementById('cpf').value = cpf;
        document.getElementById('endereco').value = endereco;
        document.getElementById('email').value = email;
        document.getElementById('contato').value = contato;
        document.getElementById('carteira').value = carteira;
        document.getElementById('titulacao').value = titulacao;
        document.getElementById('especializacao').value = especializacao;
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
        document.getElementById('infoCarteira').textContent = '';
        document.getElementById('infoTitulacao').textContent = '';
        document.getElementById('infoEspecializacao').textContent = '';
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
            const carteira = this.getAttribute('data-carteira');
            const titulacao = this.getAttribute('data-titulacao');
            const especializacao = this.getAttribute('data-especializacao');

            document.getElementById('infoNome').textContent = name;
            document.getElementById('infoCpf').textContent = cpf;
            document.getElementById('infoEndereco').textContent = endereco;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoContato').textContent = contato;
            document.getElementById('infoCarteira').textContent = carteira;
            document.getElementById('infoTitulacao').textContent = titulacao;
            document.getElementById('infoEspecializacao').textContent = especializacao;

            selectedAdmin = this;
        });
    });
});
