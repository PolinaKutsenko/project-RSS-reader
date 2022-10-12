const responseRender = (state) => {
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.innerHTML = '';
  const divFeedEl = document.createElement('div');
  divFeedEl.classList.add('card', 'border-0');
  divFeedEl.innerHTML = '<div class="card-body"><h2 class="card-title h4">Фиды</h2></div>';
  const ulFeedEl = document.createElement('ul');
  ulFeedEl.classList.add('list-group', 'border-0', 'rounded-0');
  state.feeds.forEach((feed) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    const titleEl = document.createElement('h3');
    titleEl.classList.add('h6', 'm-0');
    titleEl.textContent = feed.title;
    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('m-0', 'small', 'text-black-50');
    descriptionEl.textContent = feed.description;
    liEl.append(titleEl, descriptionEl);
    ulFeedEl.append(liEl);
  });
  divFeedEl.append(ulFeedEl);
  feedsContainer.append(divFeedEl);

  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '';
  const postsOfActiveId = state.posts.filter((post) => post.feedId === state.activeFeedId);
  const divPostEl = document.createElement('div');
  divPostEl.classList.add('card', 'border-0');
  divPostEl.innerHTML = '<div class="card-body"><h2 class="card-title h4">Посты</h2></div>';
  const ulPostEl = document.createElement('ul');
  ulPostEl.classList.add('list-group', 'border-0', 'rounded-0');
  postsOfActiveId.forEach((post) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between');
    liEl.classList.add('align-items-start', 'border-0', 'border-end-0');
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', `${post.link}`);
    linkEl.classList.add('fw-bold');
    linkEl.setAttribute('target', '_blank');
    linkEl.setAttribute('rel', 'noopener noreferrer');
    // linkEl.setAttribute('data-id', '2');
    linkEl.textContent = post.title;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    // button.setAttribute('data-id', '2');
    button.textContent = 'Просмотр';
    liEl.append(linkEl, button);
    ulPostEl.append(liEl);
  });
  divPostEl.append(ulFeedEl);
  postsContainer.append(divFeedEl);
};

export default responseRender;
