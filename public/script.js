var doc = document

doc.getElementById('create-account').addEventListener('click', function() {
    doc.getElementById('modal').style.display = 'flex';
});

doc.getElementsByClassName('close')[0].addEventListener('click', function() {
    doc.getElementById('modal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == doc.getElementById('modal')) {
        doc.getElementById('modal').style.display = 'none';
    }
};



doc.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = doc.getElementById('username').value;
    const password = doc.getElementById('password').value;
    
    // Verifica se o usuário e senha correspondem a uma entrada válida na lista
    if (checkUser(username, password)) {
        alert('Login bem-sucedido');
        window.location.href = 'home/home.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});



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
            alert('Conta criada com sucesso');
        }).catch(error => {
            console.error('Erro:', error);
            alert(`Erro ao criar a conta. Detalhes: ${error.message}`);
        });
});


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
        console.log(data);
        return data.response;
    } catch (error) {
        console.error('Erro:', error);
        alert(`Erro ao logar. Detalhes: ${error.message}`);
        // Lançar novamente o erro para que possa ser tratado fora da função
        throw error;
    }
}
