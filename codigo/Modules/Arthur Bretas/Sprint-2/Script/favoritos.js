import { database } from '../../../Guilherme Costa/Sprint-2 - Posição do onibus em tempo real/Scripts/index.js';

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

      //! ESCREVI AQUI--------------------
      alterarCor(database[i].favorito);
      //! ESCREVI AQUI--------------------
      break;
    } else {
      k++;
    }
  }
}

var btnFav = document
  .getElementById('favorito')
  .addEventListener('click', addFavs);

var favoritos = [{}];

//   Para carregar os favoritos
/*function carregarFavoritos() {
  for (let i = 0; i < database.length; i++) {
    if (database[i].favorito == true) {
      favoritos.push(database[i]);
    }
  }
}
carregarFavoritos();*/

// 1 (OK) - Criar chave de favorito;
// 2 (OK) - Função que cheque se o usuário contém ou não uma determinada linha; (verificaFavs)
// 3 - Criar função que insira as linhas na chave de favoritos do usuario; (addFavs)
// 4 - Levar informações ao sessionStorage.

var linhasDeOnibus = document.getElementById('input_linhaOnibus');
var ehFavorito = { status: false };
var posicaoFavorito = 0;
let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
let db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));
console.log(usuarioCorrente);

var btnLinha = document
  .getElementById('btn_linhaOnibus')
  .addEventListener('click', () => {
    pesquisaDados();

    for (let i = 0; i < usuarioCorrente.favoritos.length; i++) {
      if (linhasDeOnibus.value == usuarioCorrente.favoritos[i].linha) {
        ehFavorito.status = true;
        posicaoFavorito = i;
        document.getElementById('favorito').style.background = 'yellow';
      }
    }
  });
// -------------------------------------------------------------

let btn_favorito = document.querySelector('#favorito');
let novaListaFavoritos = [];

btn_favorito.addEventListener('click', () => {
  if (ehFavorito.status) {
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
    db_usuarios.usuarios[1].favoritos = novaListaFavoritos;
    // Salva no localStorage.
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
  } //todo: TEM QUE FAZER O ELSE, PARA ADICINAR O FAVORITO, SEGUINDO A MESMA LOGICA ACIMA
});

// Receber um parametro inicial quando pesquisar a linha (true ou false)
// Variavel local na função ligada AO botao de favoritos: = parametro

// -------------------------------------------------------------
function addFavs() {}

//* Alterar cores

function alterarCor(favorito) {
  if (favorito == true) {
    document.getElementById('favorito').style.background = 'yellow';
  } else {
    document.getElementById('favorito').style.background = 'white';
  }
}

// Configura os Botões
// var btnLinha = document
//   .getElementById('btn_linhaOnibus')
//   .addEventListener('click', pesquisaDados);

/*function addFavs() {
    for (let i = 0; i < database.length; i++) {
      if (database[i].linha == linhasDeOnibus.value) {
        if (database[i].favorito == false) {
          //se ainda nao tiver favoritado
  
          database[i].favorito = true;
  
          favoritos.push(database[i]);
  
          alterarCor(database[i].favorito);
        } else {
          //se ja estiver favoritado
  
          database[i].favorito = false;
  
          alterarCor(database[i].favorito);
  
          for (let j = 0; j < favoritos.length; j++) {
            if (favoritos[j].linha == linhasDeOnibus.value) {
              favoritos.splice([j], 1);
            }
          }
        }
      }
    }
  
    localStorage.setItem('my_favs', JSON.stringify(favoritos));
  }*/
