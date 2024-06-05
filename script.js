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

const validUsers = {
    'teste': 'teste',
    'user2': 'password2',
    'user3': 'password3'
};

doc.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = doc.getElementById('username').value;
    const password = doc.getElementById('password').value;
    
    // Verifica se o usuário e senha correspondem a uma entrada válida na lista
    if ((validUsers[username] && validUsers[username] === password) || (localStorage.getItem(username) === password)) {
        alert('Login bem-sucedido');
        window.location.href = 'home/home.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});

doc.getElementById('create-account-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = doc.getElementById('new-username').value;
    const newPassword = doc.getElementById('new-password').value;
    
    // Store the new user credentials
    localStorage.setItem(newUsername, newPassword);
    alert('Conta criada com sucesso');
    doc.getElementById('modal').style.display = 'none';
});
