document.addEventListener('DOMContentLoaded', (event) => {
    // Seleciona todos os botões com a classe 'botao-consulta'
    const buttons = document.querySelectorAll('.botao-consulta');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtém o nome do atributo data-name
            const name = button.getAttribute('data-name');
            // Redireciona para a nova página com o nome como parâmetro na URL
            window.location.href = `nova_pagina.html?nome=${encodeURIComponent(name)}`;
        });
    });
});

document.getElementById('admin').addEventListener('click', function(event) {
    // Redireciona para a página desejada
    window.location.href = '../admin/';
});

document.getElementById('sair').addEventListener('click', function(event) {
    // Redireciona para a página desejada
    window.location.href = '../';
});

document.getElementById('professor').addEventListener('click', function(event) {
    // Redireciona para a página desejada
    window.location.href = '../professor/';
});

document.getElementById('aluno').addEventListener('click', function(event) {
    // Redireciona para a página desejada
    window.location.href = '../aluno/';
});
