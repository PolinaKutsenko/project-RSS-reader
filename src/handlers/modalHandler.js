const postHandlers = (state) => {
  const links = document.querySelectorAll('.posts [target="_blank"]');
  links.forEach((link) => link.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.viewedPostsId.push(postId);
  }));

  const buttons = document.querySelectorAll('[data-bs-toggle="modal"]');
  buttons.forEach((button) => button.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.viewedPostsId.push(postId);
    state.loadingRSS.uiState.currentModal = postId;
  }));
};

const switchLanguageHandler = (state) => {
  const switchButtons = document.querySelectorAll('[data-switcher]');
  switchButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const language = e.target.dataset.switcher;
      console.log(button, language);
      console.log('state', state);
      state.language = language;
    });
  });
};

export { postHandlers, switchLanguageHandler };
