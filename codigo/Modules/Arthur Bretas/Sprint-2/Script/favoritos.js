import { database } from '../../../Guilherme Costa/Sprint-2/Scripts/index.js';

// Carrega os dados do card da linha pesquisada.
function pesquisaDados() {
  let linhasDeOnibus = document.getElementById('input_linhaOnibus');
  let numeroDL = '';
  let k = 0;

  for (let i = 0; i < database.length; i++) {
    numeroDL = database[i].linha;

    if (linhasDeOnibus.value == numeroDL) {
      document.getElementById('card').style.display = 'block';

      let titulo_card = document.getElementById('numero_linha');
      titulo_card.innerHTML = '<b>Linha:</b>' + ' ' + database[i].linha;

      let descricao_card2 = document.getElementById('tarifa');
      descricao_card2.innerHTML = '<b>Tarifa:</b>' + ' ' + database[i].Tarifa;

      alterarCor(database[i].favorito);

      break;
    } else {
      k++;
    }
  }
}

// Altera a cor do card impresso.
// Se a linha pesquisada já estiver 'favoritada' pelo usuário, o botão fica amarelo, se não, fica branco.
function alterarCor(favorito) {
  if (favorito == true) {
    document.getElementById('favorito').style.background = 'var(--cor_active)';
  } else {
    document.getElementById('favorito').style.background = 'white';
  }
}

// --------------------------------------------------
// Função para salvar linhas no session/localStorage.
//--------------------------------------------------
var linhasDeOnibus = document.getElementById('input_linhaOnibus');
var ehFavorito = { status: false };
var posicaoFavorito = 0;
let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
let db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));

var btnLinha = document
  .getElementById('btn_linhaOnibus')
  .addEventListener('click', () => {
    pesquisaDados();

    if (typeof usuarioCorrente.login != 'undefined') {
      for (let i = 0; i < usuarioCorrente.favoritos.length; i++) {
        if (linhasDeOnibus.value == usuarioCorrente.favoritos[i].linha) {
          ehFavorito.status = true;
          posicaoFavorito = i;
          document.getElementById('favorito').style.background = 'var(--cor_active)';
        }
      }
    }
  });

let btn_favorito = document.querySelector('#favorito');

btn_favorito.addEventListener('click', () => {
  if (ehFavorito.status) {
    document.getElementById('favorito').style.background = 'white';

    ehFavorito.status = false;

    let novaListaFavoritos = [];
    for (let i = 0; i < usuarioCorrente.favoritos.length; i++) {
      if (linhasDeOnibus.value != usuarioCorrente.favoritos[i].linha) {
        novaListaFavoritos.push(usuarioCorrente.favoritos[i]);
      }
    }
    // Cria nova chave de favoritos no sessionStorage.
    usuarioCorrente.favoritos = novaListaFavoritos;
    // Salva no sessionStorage.
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    // Cria nova chave de favoritos no localStorage.
    for (let i = 0; i < db_usuarios.usuarios.length; i++) {
      if (db_usuarios.usuarios[i].login == usuarioCorrente.login) {
        db_usuarios.usuarios[i].favoritos = novaListaFavoritos;
      }
    }
    // Salva no localStorage.
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
  } else {
    document.getElementById('favorito').style.background = 'var(--cor_active)';

    ehFavorito.status = true;

    let novaListaFavoritos = [];
    for (let i = 0; i < database.length; i++) {
      if (linhasDeOnibus.value == database[i].linha) {
        novaListaFavoritos.push(database[i]);
      }
    }
    //Adicionar todos os favoritos já existentes à nova
    for (let i = 0; i < usuarioCorrente.favoritos.length; i++) {
      novaListaFavoritos.push(usuarioCorrente.favoritos[i]);
    }

    // Cria nova chave de favoritos no sessionStorage.
    usuarioCorrente.favoritos = novaListaFavoritos;
    // Salva no sessionStorage.
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    // Cria nova chave de favoritos no localStorage.
    for (let i = 0; i < db_usuarios.usuarios.length; i++) {
      if (db_usuarios.usuarios[i].login == usuarioCorrente.login) {
        db_usuarios.usuarios[i].favoritos = novaListaFavoritos;
      }
    }
    // Salva no localStorage.
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));

    ehFavorito.status = true;
  }
});
