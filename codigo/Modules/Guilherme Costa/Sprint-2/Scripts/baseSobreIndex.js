//* Esse arquivo contem as funcoes gerais das paginasem geral, como modo dark/light.

// Configuracao de pagina para o modo light e dark.
let icon = document.querySelector('#icon');

icon.onclick = () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode'))
    icon.src = '../../../../../codigo/Assets/Images/moon-solid.svg';
  else icon.src = '../../../../../codigo/Assets/Images/sun-solid.svg';
};

// Janela de texto (modal) que aparece quando a linha inserida nao for valida.
function linhaValida() {
  const modal = document.querySelector('dialog');
  const btnFecharModal = document.querySelector('dialog button');

  modal.showModal();
  btnFecharModal.onclick = () => modal.close();
}
