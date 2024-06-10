var doc = document;

// Abrir o modal de criação de conta
doc.getElementById('create-account').addEventListener('click', function() {
    doc.getElementById('modal').style.display = 'flex';
});

// Fechar o modal de criação de conta
doc.getElementsByClassName('close')[0].addEventListener('click', function() {
    doc.getElementById('modal').style.display = 'none';
});

// Fechar o modal se clicar fora dele
window.onclick = function(event) {
    if (event.target == doc.getElementById('modal')) {
        doc.getElementById('modal').style.display = 'none';
    }
};

// Formulário de login
doc.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = doc.getElementById('username').value;
    const password = doc.getElementById('password').value;
    
    // Verifica se o usuário e senha correspondem a uma entrada válida na lista
    try {
        const isValidUser = await checkUser(username, password);
        if (isValidUser) {
            alert('Login bem-sucedido');
            if(document.getElementById('mensagemErroExiste')) {
                document.getElementById('mensagemErroExiste').remove();
            }
            window.location.href = 'home/';
        } else {
            if(!document.getElementById('mensagemErroExiste')) {
                const mensagemErro = document.getElementById('mensagemErro');
                mensagemErro.id = 'mensagemErro';
                mensagemErro.outerHTML = `
                <div class="form-group" id="mensagemErroExiste">
                    <p style="color:white">Senha ou Usuário incorreto</p>
                </div>
                
                `;
            }
            
        }
    } catch (error) {
        alert('Erro ao verificar o usuário. Por favor, tente novamente mais tarde.');
        console.error(error);
    }
});

// Formulário de criação de conta
document.getElementById('create-account-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    if (!newUsername || !newPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf: newUsername, senha: newPassword })
    };

    // Enviar a requisição
    fetch('/create_user', requestOptions)
        .then(response => {
            if (!response.ok) {
                // Adiciona detalhes sobre o erro
                return response.text().then(text => { throw new Error(`Erro ao enviar os dados: ${response.status} ${response.statusText} - ${text}`); });
            }
            return response.json();
        }).then(data => {
            console.log('Resposta do servidor:', data);
            if(document.getElementById('mensagemErroExiste')) {
                document.getElementById('mensagemErroExiste').remove();
            }
            doc.getElementById('modal').style.display = 'none';
            alert('Conta criada com sucesso');
        }).catch(error => {
            console.error('Erro:', error);
            if(!document.getElementById('mensagemErroExiste')) {
                const mensagemErro = document.getElementById('mensagemErroCadastro');
                mensagemErro.id = 'mensagemErroCadastro';
                mensagemErro.outerHTML = `
                <div class="form-group" id="mensagemErroExiste">
                    <p style="color:white">Usuário existente!</p>
                </div>
                
                `;
            }
        });
});

// Função para verificar o usuário
async function checkUser(CPF, Password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf: CPF, senha: Password })
    };

    try {
        const response = await fetch('/check_user', requestOptions);
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error("Erro ao enviar os dados");
        }
        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return data.result === true;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}
