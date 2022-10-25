import onChange from 'on-change';
import { formRender, feedbackMessageRender } from './renders/formRender.js';
import renderResponse from './renders/responseRender.js';
import submitFormHandler from './handlers/submitFormHandler.js';
import { openPostLinkHandler, viewModalOpenHandler, viewModalCloseHandler } from './handlers/modalHandler.js';
import { buildModal, deleteModal } from './renders/modalRender.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path, value) => {
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
      viewModalCloseHandler(watcher);
    }
    if (path === 'loadingRSS.posts' || path === 'loadingRSS.uiState.viewedPostsId') {
      renderResponse(watcher);
      openPostLinkHandler(watcher);
      viewModalOpenHandler(watcher);
      viewModalCloseHandler(watcher);
    }
    if (path === 'loadingRSS.uiState.currentModal') {
      if (value === null) {
        deleteModal();
      } else {
        buildModal(watcher);
      }
    }
  });
  return watcher;
};

export default (state) => {
  const watcher = watchedState(state);
  submitFormHandler(watcher);
};
