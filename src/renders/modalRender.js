const buildModal = (state) => {
  const currentModalPostId = state.loadingRSS.uiState.currentModal;
  const [post] = state.loadingRSS.posts.filter((postIter) => postIter.id === currentModalPostId);
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = post.postTitle;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = post.postDescription;

  const button = document.querySelector('.modal-footer a');
  button.setAttribute('href', post.postLink);

  const divShow = document.querySelector('#modal');
  divShow.classList.add('show');
  divShow.removeAttribute('aria-hidden');
  divShow.setAttribute('role', 'dialog');
  divShow.setAttribute('aria-modal', 'true');
  divShow.setAttribute('style', 'display: block;');

  document.body.classList.add('modal-open');
  document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');

  const backGroundShow = document.createElement('div');
  backGroundShow.classList.add('modal-backdrop', 'fade', 'show');
  document.body.append(backGroundShow);
};

const deleteModal = () => {
  console.log('deletemodal srabotal');

  const divShow = document.querySelector('#modal');
  divShow.classList.remove('show');
  divShow.removeAttribute('aria-modal');
  divShow.removeAttribute('role');
  divShow.setAttribute('aria-hidden', 'true');
  divShow.setAttribute('style', 'display: none;');

  document.body.classList.remove('modal-open');
  document.body.setAttribute('style', '');

  const backGroundShow = document.querySelector('div.modal-backdrop');
  backGroundShow.remove();
};

export { buildModal, deleteModal };
