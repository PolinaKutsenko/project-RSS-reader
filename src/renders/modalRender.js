const buildModal = (state) => {
  const currentModalPostId = state.loadingRSS.uiState.currentModal;
  const [post] = state.loadingRSS.posts.filter((postIter) => postIter.id === currentModalPostId);
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = post.postTitle;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = post.postDescription;

  const button = document.querySelector('.modal-footer a');
  button.setAttribute('href', post.postLink);
};

export default buildModal;
