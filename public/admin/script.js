let selectedAdmin = null;

    document.getElementById('meuFormulario').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const carteiraTrabalho = document.getElementById('carteiraTrabalho').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const contato = document.getElementById('contato').value;
        const permissoes = Array.from(document.getElementById('permissao').selectedOptions).map(option => option.value);
        
        if (selectedAdmin) {
            selectedAdmin.element.querySelector('p').textContent = nome;
            const consultaButton = selectedAdmin.element.querySelector('.botao-consulta');
            consultaButton.setAttribute('data-name', nome);
            consultaButton.setAttribute('data-cpf', cpf);
            consultaButton.setAttribute('data-carteira', carteiraTrabalho);
            consultaButton.setAttribute('data-endereco', endereco);
            consultaButton.setAttribute('data-email', email);
            consultaButton.setAttribute('data-contato', contato);
            consultaButton.setAttribute('data-permissao', permissoes.join(','));
        } else {
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
            consultaButton.setAttribute('data-permissao', permissoes.join(','));
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
        }
        
        $('#formModal').modal('hide');
        clearForm();
    });

    document.addEventListener('DOMContentLoaded', function () {
        const consultaButtons = document.querySelectorAll('.botao-consulta');
        const deleteButton = document.querySelector('.perfil-options .botao-login:nth-child(2)');
        const editButton = document.querySelector('.editar');
        
        consultaButtons.forEach(button => {
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

        deleteButton.addEventListener('click', function () {
            if (selectedAdmin && confirm('Tem certeza que deseja excluir este administrador?')) {
                selectedAdmin.element.remove();
                clearInfo();
            }
        });

        editButton.addEventListener('click', function () {
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
    });

    function clearForm() {
        document.getElementById('meuFormulario').reset();
        document.getElementById('permissao').selectedIndex = -1;
        selectedAdmin = null;
    }