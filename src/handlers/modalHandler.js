const openPostLinkHandler = (state) => {
  const links = document.querySelectorAll('.posts [target="_blank"]');
  links.forEach((link) => link.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    state.loadingRSS.uiState.viewedPostsId.push(postId);
  }));
};

export default openPostLinkHandler;
