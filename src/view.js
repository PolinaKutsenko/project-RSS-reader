import onChange from 'on-change';
import { formRender, feedbackMessageRender } from './renders/formRender.js';
import renderResponse from './renders/responseRender.js';
import { postHandlers } from './handlers/modalHandler.js';
import buildModal from './renders/modalRender.js';
import languageButtonsRender from './renders/languageButtonsRender.js';

const watcher = (state, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'process' || path === 'loadingRSS.error' || path === 'validation.error') {
      feedbackMessageRender(watchedState, i18n);
      formRender(watchedState);
    }
    if (path === 'loadingRSS.feeds') {
      renderResponse(watchedState, i18n);
      postHandlers(watchedState);
      formRender(watchedState);
    }
    if (path === 'loadingRSS.posts' || path === 'loadingRSS.uiState.viewedPostsId') {
      renderResponse(watchedState, i18n);
      postHandlers(watchedState);
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
