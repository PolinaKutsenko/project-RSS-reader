import onChange from 'on-change';
import formRender from './renders/formRender.js';
import { renderFeeds, renderPosts } from './renders/responseRender';
import submitFormHandler from './handlers/submitFormHandler.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path) => {
    if (path === 'validation.validateForm' || path === 'feedbackMessage') {
      formRender(watcher);
    } if (path === 'loadingRSS') {
      renderFeeds(watcher);
      renderPosts(watcher);
    }
  });
  return watcher;
};

export default (state) => {
  const watcher = watchedState(state);
  submitFormHandler(watcher);
};
