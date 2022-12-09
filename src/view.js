import onChange from 'on-change';
import {
  formRender, feedbackMessageRender, languageButtonsRender, buildModal, renderFeedsAndPosts,
} from './renders.js';

const watcher = (state, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'process' || path === 'loadingRSS.error' || path === 'validation.error') {
      feedbackMessageRender(watchedState, i18n);
      formRender(watchedState);
    }
    if (path === 'loadingRSS.feeds') {
      renderFeedsAndPosts(watchedState, i18n);
      formRender(watchedState);
    }
    if (path === 'loadingRSS.posts' || path === 'loadingRSS.uiState.viewedPostsId') {
      renderFeedsAndPosts(watchedState, i18n);
    }
    if (path === 'loadingRSS.uiState.currentModal') {
      buildModal(watchedState);
    }
    if (path === 'language') {
      i18n.changeLanguage(value)
        .then(() => languageButtonsRender(watchedState));
    }
  });
  return watchedState;
};

export default watcher;
