//* O arquivo processa as informacoes do usuario ativo (usuarioCorrente).
//* Em seguida, redireciona o 'href' do item de login (menu-horizontal no header) para a aba de login ou perfil,
//* dependendo se existe um usuario ativo ou nao.

import {
  usuarioCorrente,
  usuarioCorrenteJSON,
} from '../../Sprint-2 - Posição do onibus em tempo real/Scripts/index.js';

var usuario = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

document.body.onload = () => {
  // Se não tiver usuario logado.
  if (typeof usuario.login === 'undefined') {
    document
      .querySelector('#btn_login')
      .setAttribute(
        'href',
        'Modules/Guilherme Costa/Sprint-3 - Página de login e perfil do usuário/HTML/login.html'
      );
    document.querySelector('#btn_login').innerHTML = 'Login';
    // Se tiver usuario logado.
  } else {
    document.querySelector('#btn_login').setAttribute('href','Modules/Guilherme Costa/Sprint-3 - Página de login e perfil do usuário/HTML/perfil.html');
    document.querySelector('#btn_login').innerHTML = usuario.login;
    document.querySelector("#favorito").style.display = "block";
  }
};
