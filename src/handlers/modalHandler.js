const openPostLinkHandler = (state) => {
  console.log('openPostLinkHandler', 'ya srabotal');
  const links = document.querySelectorAll('.posts [target="_blank"]');
  links.forEach((link) => link.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.viewedPostsId.push(postId);
  }));
  console.log(state);
};

const viewModalOpenHandler = (state) => {
  const buttons = document.querySelectorAll('[data-bs-toggle="modal"]');
  buttons.forEach((button) => button.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.currentModal = postId;
  }));
};

const viewModalCloseHandler = (state) => {
  const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
  closeButton.addEventListener('click', () => {
    state.loadingRSS.uiState.currentModal = null;
  });
};

export { openPostLinkHandler, viewModalOpenHandler, viewModalCloseHandler };
