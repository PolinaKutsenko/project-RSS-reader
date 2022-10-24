import _ from 'lodash';

const buildFeedItem = (feed) => {
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item', 'border-0', 'border-end-0');

  const titleEl = document.createElement('h3');
  titleEl.classList.add('h6', 'm-0');
  titleEl.textContent = feed.title;

  const descriptionEl = document.createElement('p');
  descriptionEl.classList.add('m-0', 'small', 'text-black-50');
  descriptionEl.textContent = feed.description;

  liEl.append(titleEl, descriptionEl);
  return liEl;
};

const buildPostItem = (post, state) => {
  console.log('item');
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between');
  liEl.classList.add('align-items-start', 'border-0', 'border-end-0');

  const linkEl = document.createElement('a');
  const isLinkViewed = _.includes(state.loadingRSS.uiState.viewedPostsId, post.id);
  if (isLinkViewed) {
    linkEl.classList.add('fw-normal', 'link-secondary');
  } else {
    linkEl.classList.add('fw-bold');
  }
  linkEl.setAttribute('href', `${post.postLink}`);
  linkEl.setAttribute('target', '_blank');
  linkEl.setAttribute('rel', 'noopener noreferrer');
  linkEl.setAttribute('data-id', post.id);
  linkEl.textContent = post.postTitle;

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('data-id', post.id);
  button.textContent = state.i18n.t('content.view');

  liEl.append(linkEl, button);
  return liEl;
};

const buildCard = (state, typeOfCard) => {
  const divCardEl = document.createElement('div');
  divCardEl.classList.add('card', 'border-0');

  const divCardBodyEl = document.createElement('div');
  divCardBodyEl.classList.add('card-body');

  const h2El = document.createElement('h2');
  h2El.classList.add('card-title', 'h4');
  h2El.textContent = state.i18n.t(`content.${typeOfCard}`);

  divCardBodyEl.append(h2El);
  divCardEl.append(divCardBodyEl);
  return divCardEl;
};

const renderResponse = (state) => {
  console.log('renderfeeds', state);
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.innerHTML = '';
  const divFeedEl = buildCard(state, 'feed');

  const ulFeedEl = document.createElement('ul');
  ulFeedEl.classList.add('list-group', 'border-0', 'rounded-0');
  state.loadingRSS.feeds.forEach((feed) => {
    const liEl = buildFeedItem(feed);
    ulFeedEl.append(liEl);
    return ulFeedEl;
  });
  divFeedEl.append(ulFeedEl);
  feedsContainer.append(divFeedEl);

  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '';
  const divPostEl = buildCard(state, 'post');

  const ulPostEl = document.createElement('ul');
  ulPostEl.classList.add('list-group', 'border-0', 'rounded-0');
  state.loadingRSS.feeds.forEach((feed) => {
    const { id } = feed;
    const postsOfCurrentFeed = state.loadingRSS.posts.filter((post) => post.feedId === id);
    postsOfCurrentFeed.forEach((post) => {
      const liEl = buildPostItem(post, state);
      ulPostEl.append(liEl);
      return ulPostEl;
    });
  });
  divPostEl.append(ulPostEl);
  postsContainer.append(divPostEl);
};

export default renderResponse;
