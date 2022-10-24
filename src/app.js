import onChange from 'on-change';
import { formRender, feedbackMessageRender } from './renders/formRender.js';
import renderResponse from './renders/responseRender';
import submitFormHandler from './handlers/submitFormHandler.js';
import openPostLinkHandler from './handlers/modalHandler.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path) => {
    if (path === 'validation') {
      formRender(watcher);
    }
    if (path === 'feedbackMessage') {
      feedbackMessageRender(watcher);
    }
    if (path === 'loadingRSS.feeds') {
      renderResponse(watcher);
    }
    if (path === 'loadingRSS.posts' || path === 'loadingRSS.uiState.viewedPostsId') {
      renderResponse(watcher);
    }
  });
  return watcher;
};

export default (state) => {
  const watcher = watchedState(state);
  submitFormHandler(watcher);
  openPostLinkHandler(watcher);
};
