var formLogin = document.getElementById('formLogin');
var inputEmail = document.getElementById('email');
var inputSenha = document.getElementById('senha');

// usuario de teste
var emailCerto = 'devx@fiap.com.br';
var senhaCerta = 'devx2026';

formLogin.addEventListener('submit', function (e) {
  e.preventDefault();

  // tira espacos e deixa email em minusculo
  var email = inputEmail.value.trim().toLowerCase();
  var senha = inputSenha.value;

  // limpa erros de antes
  inputEmail.classList.remove('erro');
  inputSenha.classList.remove('erro');

  // validacao basica
  if (email === '' || !email.includes('@')) {
    inputEmail.classList.add('erro');
    inputEmail.focus();
    return;
  }

  if (senha.length < 6) {
    inputSenha.classList.add('erro');
    inputSenha.focus();
    return;
  }

  // confere se o login bate
  if (email === emailCerto && senha === senhaCerta) {
    alert('Logado com sucesso!');
    window.location.href = 'index.html';
  } else {
    inputSenha.classList.add('erro');
    inputSenha.value = '';
    inputSenha.focus();
  }
});
