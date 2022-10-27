import onChange from 'on-change';
import { formRender, feedbackMessageRender } from './renders/formRender.js';
import renderResponse from './renders/responseRender.js';
import submitFormHandler from './handlers/submitFormHandler.js';
import { openPostLinkHandler, viewModalOpenHandler } from './handlers/modalHandler.js';
import buildModal from './renders/modalRender.js';
import timer from './handlers/updateHandler.js';

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
      openPostLinkHandler(watcher);
      viewModalOpenHandler(watcher);
    }
    if (path === 'loadingRSS.posts' || path === 'loadingRSS.uiState.viewedPostsId') {
      renderResponse(watcher);
      openPostLinkHandler(watcher);
      viewModalOpenHandler(watcher);
    }
    if (path === 'loadingRSS.uiState.currentModal') {
      buildModal(watcher);
    }
    if (path === 'loadingRSS.updatingPosts.currentTimerID') {
      console.log('watcher at timer');
      timer(watcher);
    }
  });
  return watcher;
};

export default (state) => {
  const watcher = watchedState(state);
  submitFormHandler(watcher);
};
