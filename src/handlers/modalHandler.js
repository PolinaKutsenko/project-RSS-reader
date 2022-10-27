const openPostLinkHandler = (state) => {
  const links = document.querySelectorAll('.posts [target="_blank"]');
  links.forEach((link) => link.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.viewedPostsId.push(postId);
  }));
};

const viewModalOpenHandler = (state) => {
  const buttons = document.querySelectorAll('[data-bs-toggle="modal"]');
  buttons.forEach((button) => button.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.currentModal = postId;
  }));
};

export { openPostLinkHandler, viewModalOpenHandler };
