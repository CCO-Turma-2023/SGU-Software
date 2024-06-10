document.addEventListener('DOMContentLoaded', function () {
    let selectedAdmin = null;

    document.querySelector('.modal-body').addEventListener('submit', function (event) {
        event.preventDefault();
        formModal.classList.remove('show');
        formModal.style.display = 'none';
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const carteiraTrabalho = document.getElementById('carteiraTrabalho').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const contato = document.getElementById('contato').value;
        const permissoes = Array.from(document.getElementById('permissao').selectedOptions).map(option => option.value).join(',');

        if (!selectedAdmin) {
            // Adicionando um novo administrador
            const senha = document.getElementById('password').value;

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
            consultaButton.setAttribute('data-carteira', carteiraTrabalho);
            consultaButton.setAttribute('data-endereco', endereco);
            consultaButton.setAttribute('data-email', email);
            consultaButton.setAttribute('data-contato', contato);
            consultaButton.setAttribute('data-permissao', permissoes);
            consultaButton.innerHTML = '<p class="text-bottom"><i class="fa-solid fa-magnifying-glass"></i></p>';
            turmaNameDiv.appendChild(consultaButton);

            document.querySelector('.box-dashboard .turmas').appendChild(turmaNameDiv);

            consultaButton.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                const cpf = this.getAttribute('data-cpf');
                const carteira = this.getAttribute('data-carteira');
                const endereco = this.getAttribute('data-endereco');
                const email = this.getAttribute('data-email');
                const contato = this.getAttribute('data-contato');
                const permissao = this.getAttribute('data-permissao');

                document.getElementById('infoNome').textContent = name;
                document.getElementById('infoCpf').textContent = cpf;
                document.getElementById('infoCarteira').textContent = carteira;
                document.getElementById('infoEndereco').textContent = endereco;
                document.getElementById('infoEmail').textContent = email;
                document.getElementById('infoContato').textContent = contato;
                document.getElementById('infoPermissao').textContent = permissao;

                selectedAdmin = {
                    element: this.closest('.turma-name'),
                    name, cpf, carteira, endereco, email, contato, permissao
                };

            });

        } else {
            // Editando um administrador existente
            selectedAdmin.element.querySelector('p').textContent = nome;
            const consultaButton = selectedAdmin.element.querySelector('.botao-consulta');
            consultaButton.setAttribute('data-name', nome);
            consultaButton.setAttribute('data-cpf', cpf);
            consultaButton.setAttribute('data-carteira', carteiraTrabalho);
            consultaButton.setAttribute('data-endereco', endereco);
            consultaButton.setAttribute('data-email', email);
            consultaButton.setAttribute('data-contato', contato);
            consultaButton.setAttribute('data-permissao', permissoes);

            document.getElementById('infoNome').textContent = nome;
            document.getElementById('infoCpf').textContent = cpf;
            document.getElementById('infoCarteira').textContent = carteiraTrabalho;
            document.getElementById('infoEndereco').textContent = endereco;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoContato').textContent = contato;
            document.getElementById('infoPermissao').textContent = permissoes;

            // Limpa a seleção de administrador
            selectedAdmin = null;
        }

        $('#formModal').modal('hide');
        clearForm();
    });


    document.querySelector('.perfil-options .cadastrar').addEventListener('click', function () {
        formModal.classList.add('show');
        formModal.style.display = 'block';

        if (!document.getElementById('passwordcamp'))  {
            const newPasswordContainer = document.getElementById('passwordContainer');
            newPasswordContainer.id = 'passwordContainer';
            newPasswordContainer.outerHTML = `
            <div class="form-group" id="passwordcamp">
                <label for="password">Senha</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            
            `;
        document.getElementById('meuFormulario').appendChild(newPasswordContainer);
        }
        
        clearForm();
    });

    document.querySelector('.close').addEventListener('click', function () {
        formModal.classList.remove('show');
        formModal.style.display = 'none';
    });

    document.querySelectorAll('.botao-consulta').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const cpf = this.getAttribute('data-cpf');
            const carteira = this.getAttribute('data-carteira');
            const endereco = this.getAttribute('data-endereco');
            const email = this.getAttribute('data-email');
            const contato = this.getAttribute('data-contato');
            const permissao = this.getAttribute('data-permissao');

            document.getElementById('infoNome').textContent = name;
            document.getElementById('infoCpf').textContent = cpf;
            document.getElementById('infoCarteira').textContent = carteira;
            document.getElementById('infoEndereco').textContent = endereco;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoContato').textContent = contato;
            document.getElementById('infoPermissao').textContent = permissao;

            selectedAdmin = {
                element: this.closest('.turma-name'),
                name, cpf, carteira, endereco, email, contato, permissao
            };
        });
    });

    document.querySelector('.perfil-options .delete').addEventListener('click', function () {
        if (selectedAdmin && confirm('Tem certeza que deseja excluir este administrador?')) {
            selectedAdmin.element.remove();
            clearInfo();
            selectedAdmin = null;
        }
    });

    document.querySelector('.perfil-options .editar').addEventListener('click', function () {
        if (selectedAdmin) {
            const { name, cpf, carteira, endereco, email, contato, permissao } = selectedAdmin;

            document.getElementById('nome').value = name;
            document.getElementById('cpf').value = cpf;
            document.getElementById('carteiraTrabalho').value = carteira;
            document.getElementById('endereco').value = endereco;
            document.getElementById('email').value = email;
            document.getElementById('contato').value = contato;

            const selectPermissao = document.getElementById('permissao');
            const permissoesArray = permissao.split(',');

            Array.from(selectPermissao.options).forEach(option => {
                option.selected = permissoesArray.includes(option.value);
            });

            const passwordContainer = document.getElementById('passwordcamp');
            if (passwordContainer) {
                passwordContainer.remove(); // Remove o campo de senha ao editar
            }

            const modalButton = document.querySelector('#formModal .btn-primary');
            modalButton.textContent = 'SALVAR';
            modalButton.classList.add('salvar');

            $('#formModal').modal('show');
        } else {
            alert('Nenhum administrador selecionado para edição.');
        }
    });

    function clearInfo() {
        document.getElementById('infoNome').textContent = '';
        document.getElementById('infoCpf').textContent = '';
        document.getElementById('infoCarteira').textContent = '';
        document.getElementById('infoEndereco').textContent = '';
        document.getElementById('infoEmail').textContent = '';
        document.getElementById('infoContato').textContent = '';
        document.getElementById('infoPermissao').textContent = '';
    }

    function clearForm() {
        document.getElementById('meuFormulario').reset();
        document.getElementById('permissao').selectedIndex = -1;
        selectedAdmin = null;
        document.querySelector('#formModal .btn-primary').textContent = 'CADASTRAR';
    }
});

document.getElementById('voltar').addEventListener('click', function(event) {
    window.location.href = '../home/';
});
