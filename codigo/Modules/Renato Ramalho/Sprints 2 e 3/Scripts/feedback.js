function lerDados() {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  } else {
    objDados = {
      comentarios_main: [
        { coment: 'Nota 1' },
        { coment: 'Nota 2' },
        { coment: 'Nota 3' },
      ],
    };
  }

  return objDados;
}

function salvaDados(dados) {
  localStorage.setItem('db', JSON.stringify(dados));
}

let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
let db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));

function salvatrajeto() {
  // Ler os dados do localStorage
  let objDados = lerDados();

  // ler comentario
  let strcoment = document.getElementById('input_linhaFeedback').value;
  let novocoment = {
    coment: strcoment,
  };
  for (let i = 0; i < db_usuarios.usuarios.length; i++) {
    if (db_usuarios.usuarios[i].login == usuarioCorrente.login) {
      db_usuarios.usuarios[i].comentarios.push(novocoment);
      localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
    }
  }
  usuarioCorrente.comentarios.push(novocoment);
  sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
  // objDados.comentarios_main.push(novocoment);

  // Salvar os dados no localStorage novamente
  salvaDados(objDados);
  alert('Salvo com sucesso!');
}

document
  .getElementById('btn_salvartrajeto')
  .addEventListener('click', salvatrajeto);
var answers = {};

var question_one = document.getElementById('question-1');
var question_two = document.getElementById('question-2');
var question_three = document.getElementById('question-3');
var question_four = document.getElementById('question-4');
var question_five = document.getElementById('question-5');

function storeAnswer(question_number, event) {
  if (event.target.type === 'radio') {
    console.log(event.target.value);
    answers['question' + question_number] = parseInt(event.target.value);
    console.log(answers);
  }
}

question_one.addEventListener('click', function (event) {
  storeAnswer(1, event);
});
question_two.addEventListener('click', function (event) {
  storeAnswer(2, event);
});
question_three.addEventListener('click', function (event) {
  storeAnswer(3, event);
});
question_four.addEventListener('click', function (event) {
  storeAnswer(4, event);
});
question_five.addEventListener('click', function (event) {
  storeAnswer(5, event);
});

function totalScore() {
  var total_score =
    answers.question1 +
    answers.question2 +
    answers.question3 +
    answers.question4 +
    answers.question5;

  return total_score;
}

function getInfoBasedOnScore() {
  if (totalScore() < 3.5) {
    var score_info =
      'Parece que ainda estamos longe da qualidade desejada, mas daremos o nosso melhor!';
  } else if (totalScore() > 3.5 && totalScore() < 7) {
    var score_info =
      'Ainda não alcançamos nosso objetivo, mas faremos o possível para conseguirmos!';
  } else if (totalScore() > 7) {
    var score_info =
      'Parabéns para nós, parece que estamos fazendo um otimo trabalho!';
  }

  return score_info;
}

var submit1 = document.getElementById('submit1');
var submit2 = document.getElementById('submit2');
var submit3 = document.getElementById('submit3');
var submit4 = document.getElementById('submit4');
var submit5 = document.getElementById('submit5');

function nextQuestion(question_number) {
  var current_question_number = question_number - 1;
  var question_number = question_number.toString();
  var current_question_number = current_question_number.toString();

  var el = document.getElementById('question-' + question_number);
  var el2 = document.getElementById('question-' + current_question_number);

  el.style.display = 'block';
  el2.style.display = 'none';
}

submit1.addEventListener('click', function () {
  nextQuestion(2);
  growProgressBar('40%');
});
submit2.addEventListener('click', function () {
  nextQuestion(3);
  growProgressBar('60%');
});
submit3.addEventListener('click', function () {
  nextQuestion(4);
  growProgressBar('80%');
});
submit4.addEventListener('click', function () {
  nextQuestion(5);
  growProgressBar('100%');
});
submit5.addEventListener('click', function () {
  nextQuestion(6);
});

var pontTotal = document.getElementById('printtotalscore');
var pontInfo = document.getElementById('printscoreinfo');

submit5.addEventListener('click', function () {
  if (
    !(totalScore() === 'NaN' || typeof getInfoBasedOnScore() === 'undefined')
  ) {
    document.getElementById('printtotalscore').innerHTML = totalScore();
    document.getElementById('printscoreinfo').innerHTML = getInfoBasedOnScore();
  } else {
    document.getElementById('printtotalscore').innerHTML = '-';
  }
});

function growProgressBar(percentage_width) {
  var bar = document.getElementById('progress_bar');
  bar.style.width = percentage_width;
}
