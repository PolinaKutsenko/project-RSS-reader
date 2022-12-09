import axios from 'axios';
import _ from 'lodash';
import parseRSS from './parserRSS.js';
import validateForm from './validateSchema.js';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  axios.get(rssUrl.toString())
    .then((response) => {
      const parsedResponse = parseRSS(response.data.contents);
      const { feed, posts } = parsedResponse;
      const feedId = _.uniqueId();
      state.loadingRSS.feeds = [{ ...feed, id: feedId, url }, ...state.loadingRSS.feeds];
      const newPosts = posts.map((post) => {
        const postId = _.uniqueId();
        return { ...post, id: postId, feedId };
      });
      state.loadingRSS.posts = [...newPosts, ...state.loadingRSS.posts];
      state.process = 'loaded';
    })
    .catch((e) => {
      state.loadingRSS.error = e.message;
      state.process = 'error';
    });
};

const submitFormHandler = (state) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    const resources = state.loadingRSS.feeds.map((feed) => feed.url);

    validateForm(value, resources)
      .then((url) => {
        state.validation.status = 'valid';
        handlerOfLoadingRSS(state, url);
      })
      .catch((err) => {
        state.validation.status = 'invalid';
        const { type } = err;
        state.validation.error = type;
        state.process = 'error';
      });
  });
};

const updatingRSS = (state) => {
  const { posts: oldPosts, feeds: oldFeeds } = state.loadingRSS;
  const promises = state.loadingRSS.feeds.map((resource) => {
    const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${resource.url}`);
    return axios.get(rssUrl.toString())
      .then((response) => {
        const parsedResponse = parseRSS(response.data.contents);
        return parsedResponse;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  });

  const promise = Promise.all(promises)
    .finally((parsedResponses) => {
      parsedResponses.forEach((parsedResponse) => {
        const { feed, posts } = parsedResponse;
        const { id: currentfeedId } = oldFeeds.find((feedItem) => feedItem.title === feed.title);
        const oldPostsOfCurrentFeedWithoutId = oldPosts.filter((post) => (
          post.feedId === currentfeedId))
          .map((post) => (
            {
              postTitle: post.postTitle,
              postDescription: post.postDescription,
              postLink: post.postLink,
              postPubDate: post.postPubDate,
            }));
        const newPosts = _.differenceWith(posts, oldPostsOfCurrentFeedWithoutId, _.isEqual);
        const newPostsWithId = newPosts.map((post) => {
          const postId = _.uniqueId();
          return { feedId: currentfeedId, id: postId, ...post };
        });
        state.loadingRSS.posts = [...newPostsWithId, ...state.loadingRSS.posts];
        state.loadingRSS.updatingPosts.errorUpdating = null;
      });
    })
    .catch((e) => {
      state.loadingRSS.updatingPosts.errorUpdating = e.message;
    });
  return promise;
};

const timer = (state) => {
  const timerId = setTimeout(() => {
    updatingRSS(state)
      .then(() => {
        state.loadingRSS.updatingPosts.currentTimerID = timerId;
        timer(state);
      });
  }, 5000);
};

const postHandlers = (state) => {
  const postsContainer = document.querySelector('.posts');
  postsContainer.addEventListener('click', ({ target: el }) => {
    const postId = el.dataset.id;
    if (el.getAttribute('target')) {
      state.loadingRSS.uiState.viewedPostsId.push(postId);
    }
    if (el.dataset.bsToggle) {
      state.loadingRSS.uiState.viewedPostsId.push(postId);
      state.loadingRSS.uiState.currentModal = postId;
    }
  });
};

const switchLanguageHandler = (state) => {
  const switchButtons = document.querySelectorAll('[data-switcher]');
  switchButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const language = e.target.dataset.switcher;
      state.language = language;
    });
  });
};

export {
  submitFormHandler, handlerOfLoadingRSS, timer, postHandlers, switchLanguageHandler,
};
