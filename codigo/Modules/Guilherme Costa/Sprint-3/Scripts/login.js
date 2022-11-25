//* Arquivo responsavel por manusear as informacoes de login e carregamento da pagina de perfil de usuario.
// ------------------------------------------------------------------------------------------------------
// Parte I - Manuseia as informacoes de login e as atribui no localStorage/sessionStorage.
// ------------------------------------------------------------------------------------------------------

// Objeto para o banco de dados de usuários baseado em JSON.
var db_usuarios = {};

// Objeto para o usuário corrente (define o usuário que está logado).
var usuarioCorrente = {};

// Função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid.
function generateUUID() {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// Dados de usuários para serem utilizados como carga inicial.
const dadosIniciais = {
  usuarios: [
    {
      id: generateUUID(),
      login: 'usuario',
      senha: 'usuario',
      nome: 'Usuário de teste',
      email: 'usuario@buzzao.com',
      foto: 'https://picsum.photos/200/300',
      comentarios: [],
      favoritos: [
        {
          NL: '700',
          Tarifa: 'R$ 4,50',
          linha: 9801,
          infoBH: {
            EV: '105',
            HR: '20221011085833',
            LT: -19.905378,
            LG: -43.943809,
            NV: '40670',
            VL: '28',
            NL: '700',
            DG: '320',
            SV: '1',
            DT: '9120',
          },
        },
        {
          NL: '3999',
          Tarifa: 'R$ 4,50',
          linha: 342,
          infoBH: {
            EV: '105',
            HR: '20221011085815',
            LT: -19.994968,
            LG: -44.022817,
            NV: '30719',
            VL: '28',
            NL: '3999',
            DG: '304',
            SV: '1',
            DT: '14352',
          },
        },
      ],
    },
    {
      id: generateUUID(),
      login: 'admin',
      senha: 'admin',
      nome: 'Administrador',
      email: 'admin@buzzao.com',
      foto: 'https://picsum.photos/200/300',
      comentarios: [],
      favoritos: [
        {
          NL: '700',
          Tarifa: 'R$ 4,50',
          linha: 9801,
          infoBH: {
            EV: '105',
            HR: '20221011085833',
            LT: -19.905378,
            LG: -43.943809,
            NV: '40670',
            VL: '28',
            NL: '700',
            DG: '320',
            SV: '1',
            DT: '9120',
          },
        },
        {
          NL: '3999',
          Tarifa: 'R$ 4,50',
          linha: 342,
          infoBH: {
            EV: '105',
            HR: '20221011085815',
            LT: -19.994968,
            LG: -44.022817,
            NV: '30719',
            VL: '28',
            NL: '3999',
            DG: '304',
            SV: '1',
            DT: '14352',
          },
        },
      ],
    },
  ],
};

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login.
function initLoginApp() {
  // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA.
  let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
  if (usuarioCorrenteJSON) {
    usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
  }

  // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS.
  var usuariosJSON = localStorage.getItem('db_usuarios');

  // Verifica se existem dados já armazenados no localStorage.
  if (!usuariosJSON) {
    alert(
      'Dados de usuários não encontrados no localStorage. \n\n Fazendo carga inicial.'
    );

    db_usuarios = dadosIniciais;

    localStorage.setItem('db_usuarios', JSON.stringify(dadosIniciais));
  } else db_usuarios = JSON.parse(usuariosJSON);
}

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial.
function loginUser(login, senha) {
  // Verifica todos os itens do banco de dados de usuarios para localizar o usuário informado no formulario de login.
  for (var i = 0; i < db_usuarios.usuarios.length; i++) {
    var usuario = db_usuarios.usuarios[i];

    // Se encontrou login, carrega usuário corrente e salva no Session Storage.
    if (login == usuario.login && senha == usuario.senha) {
      usuarioCorrente.id = usuario.id;
      usuarioCorrente.login = usuario.login;
      usuarioCorrente.email = usuario.email;
      usuarioCorrente.nome = usuario.nome;
      usuarioCorrente.senha = usuario.senha;
      usuarioCorrente.foto = usuario.foto;
      usuarioCorrente.favoritos = usuario.favoritos;
      usuarioCorrente.comentarios = usuario.comentarios;

      // Salva os dados do usuário corrente no Session Storage, mas antes converte para string.
      sessionStorage.setItem(
        'usuarioCorrente',
        JSON.stringify(usuarioCorrente)
      );
      // Retorna true para usuário encontrado.
      return true;
    }
  }
  return false;
}

// Apaga os dados do usuário corrente no sessionStorage.
function logoutUser() {
  usuarioCorrente = {};
  sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
  window.location = 'login.html';
}

function addUser(nome, login, senha, email) {
  // Cria um objeto de usuario para o novo usuario.
  let newId = generateUUID();
  let usuario = {
    id: newId,
    login: login,
    senha: senha,
    nome: nome,
    email: email,
    foto: 'https://picsum.photos/200/300',
    favoritos: [],
    comentarios: [],
  };

  // Inclui o novo usuario no banco de dados baseado em JSON.
  db_usuarios.usuarios.push(usuario);

  // Salva o novo banco de dados com o novo usuário no localStorage
  localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();

// ------------------------------------------------------------------------------------------------------
// Parte II - Manuseia as informacoes da pagina de perfil, de acordo com o usuario logado.
// ------------------------------------------------------------------------------------------------------

// Menu lateral.
var listaLateral = document.querySelectorAll('.lista-lateral');

// ------------------Aba de Conta ------------------
var btnConta = document.querySelector('#conta');
if (typeof usuarioCorrente.login != 'undefined')
  btnConta.addEventListener('click', imprimeTelaConta);

function imprimeTelaConta() {
  for (let i = 0; i < listaLateral.length; i++) {
    if (listaLateral[i].classList.contains('active'))
      listaLateral[i].classList.remove('active');
  }

  // Gerar card de usuario.
  let infoUsuario = '';
  let favsUsuario = '';

  infoUsuario = `<div class="foto-usuario"><img src="${usuarioCorrente.foto}" alt="foto-usuario">
          <input id="input-trocarFoto" type="file" onchange="trocarFoto()" /><br />
          </div>
          <ul>
              <li id="nome-usuario">${usuarioCorrente.nome} (${usuarioCorrente.login})</li>
              <li id="email-usuario">${usuarioCorrente.email}</li>
              <li id="senha-usuario">Senha: <input id="input-senha" type="password" value="${usuarioCorrente.senha}"></input></li>
              <li><input id="check-senha" type="checkbox">
                  <label for="check-senha">Mostrar senha</label>
              </li>
          </ul>`;

  // Gera card de favoritos.
  favsUsuario = `<h1 class="titulo-card">Linhas favoritas:</h1>`;
  for (let j = 0; j < usuarioCorrente.favoritos.length; j++) {
    favsUsuario += `<p>${usuarioCorrente.favoritos[j].linha}</p>`;
  }

  document.querySelector('#card-usuario').innerHTML = infoUsuario;
  document.querySelector('#favoritos-usuario').innerHTML = favsUsuario;

  // Limpar classes ativas da pagina.
  document.querySelector('#card-usuario').classList.remove('active');
  document.querySelector('#favoritos-usuario').classList.remove('active');
  document.querySelector('#feedback-usuario').classList.remove('active');

  // Adicionar classes ativas.
  document.querySelector('#card-usuario').classList.toggle('active');
  document.querySelector('#favoritos-usuario').classList.toggle('active');
  btnConta.classList.toggle('active');

  const senha = document.querySelector('#input-senha');
  const checkSenha = document.querySelector('#check-senha');

  checkSenha.addEventListener('change', () => {
    if (senha.type === 'password') {
      senha.type = 'text';
    } else {
      senha.type = 'password';
    }
  });
}

// Trocar foto de perfil do usuario.
let urlParams = new URLSearchParams(location.search);
let usuario = parseInt(urlParams.get('usuario'));

function trocarFoto() {
  const fotoAtual = document.querySelector('img[alt=foto-usuario]');
  const arquivo = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    () => {
      fotoAtual.src = reader.result;
      salvarFotoLocalstorage(usuario, reader.result);
    },
    false
  );
  if (arquivo) {
    reader.readAsDataURL(arquivo);
  }
}

function salvarFotoLocalstorage(usuario_Conta, imageURI) {
  console.log(db_usuarios.usuarios);
  for (let i = 0; i < db_usuarios.usuarios.length; i++) {
    if (db_usuarios.usuarios[i].id == usuarioCorrente.id) {
      db_usuarios.usuarios[i].foto = imageURI;
      usuarioCorrente.foto = imageURI;
      sessionStorage.setItem(
        'usuarioCorrente',
        JSON.stringify(usuarioCorrente)
      );
      localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
    }
  }
}

// ------------------Aba de Feedbacks------------------
var btnFeedback = document.querySelector('#feedbacks');

if (typeof usuarioCorrente.login != 'undefined') {
  btnFeedback.addEventListener('click', () => {
    for (let i = 0; i < listaLateral.length; i++) {
      if (listaLateral[i].classList.contains('active'))
        listaLateral[i].classList.remove('active');
    }

    // Gerar o card.
    let feedbacks = '';

    // feedbacks = `<ul>
    //           <li class="titulo-card">Feedbacks em aberto:</li>
    //           <li>Horario errado...</li>
    //           <li>Inclusao de linha...</li>
    //         </ul>`;

    // Gera lista de feedbacks.
    feedbacks = `<h1 class="titulo-card">Feedbacks realizados:</h1>`;
    for (let j = 0; j < usuarioCorrente.comentarios.length; j++) {
      feedbacks += `<p>${usuarioCorrente.comentarios[j].coment}</p>`;
    }

    document.querySelector('#feedback-usuario').innerHTML = feedbacks;

    // Limpar classes ativas da pagina.
    document.querySelector('#card-usuario').classList.remove('active');
    document.querySelector('#favoritos-usuario').classList.remove('active');
    document.querySelector('#feedback-usuario').classList.remove('active');

    // Adicionar classes ativas.
    document.querySelector('#feedback-usuario').classList.toggle('active');
    btnFeedback.classList.toggle('active');
  });
}
