import _ from 'lodash';

const formRender = (watchedState) => {
  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');

  if (watchedState.validation.status === 'invalid') {
    input.classList.add('is-invalid');
  }
  if (watchedState.validation.status === 'valid') {
    input.classList.remove('is-invalid');
    form.reset();
    form.elements.url.focus();
  }
};

const feedbackMessageRender = (state, i18n) => {
  const feedback = document.querySelector('p.feedback');
  feedback.classList.remove('text-success');
  feedback.classList.remove('text-danger');

  let feedbackMessageKey;

  if (state.process === 'loaded') {
    feedback.classList.add('text-success');
    feedbackMessageKey = 'loading.isLoaded';
  }
  if (state.process === 'error') {
    feedback.classList.add('text-danger');
    if (state.validation.error) {
      switch (state.validation.error) {
        case 'url':
          feedbackMessageKey = 'validation.errors.notURL';
          break;
        case 'min':
          feedbackMessageKey = 'validation.errors.minLength';
          break;
        case 'notOneOf':
          feedbackMessageKey = 'validation.errors.existFeed';
          break;
        default:
          throw new Error('Unknown error in validation');
      }
    }
    if (state.loadingRSS.error) {
      switch (state.loadingRSS.error) {
        case 'Parsing RSS Error':
          feedbackMessageKey = 'loading.errors.resourseError';
          break;
        case 'Network Error':
          feedbackMessageKey = 'loading.errors.networkErrror';
          break;
        default:
          throw new Error('Unknown error in loading');
      }
    }
  }
  feedback.textContent = i18n.t(`${feedbackMessageKey}`);
};

const languageButtonsRender = (state) => {
  const switchButtons = document.querySelectorAll('[data-switcher]');
  switchButtons.forEach((button) => {
    button.classList.remove('btn-primary', 'btn-secondary');
    const language = button.dataset.switcher;
    const classListOfButton = state.language === language ? 'btn-primary' : 'btn-secondary';
    button.classList.add(classListOfButton);
  });
};

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

const buildPostItem = (post, state, i18n) => {
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
  button.textContent = i18n.t('content.view');

  liEl.append(linkEl, button);
  return liEl;
};

const buildCard = (typeOfCard, i18n) => {
  const divCardEl = document.createElement('div');
  divCardEl.classList.add('card', 'border-0');

  const divCardBodyEl = document.createElement('div');
  divCardBodyEl.classList.add('card-body');

  const h2El = document.createElement('h2');
  h2El.classList.add('card-title', 'h4');
  h2El.textContent = i18n.t(`content.${typeOfCard}`);

  divCardBodyEl.append(h2El);
  divCardEl.append(divCardBodyEl);
  return divCardEl;
};

const renderFeedsAndPosts = (state, i18n) => {
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.innerHTML = '';
  const divFeedEl = buildCard('feed', i18n);

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
  const divPostEl = buildCard('post', i18n);

  const ulPostEl = document.createElement('ul');
  ulPostEl.classList.add('list-group', 'border-0', 'rounded-0');

  state.loadingRSS.posts.forEach((post) => {
    const liEl = buildPostItem(post, state, i18n);
    ulPostEl.append(liEl);
    return ulPostEl;
  });
  divPostEl.append(ulPostEl);
  postsContainer.append(divPostEl);
};

export {
  formRender, feedbackMessageRender, languageButtonsRender, buildModal, renderFeedsAndPosts,
};
