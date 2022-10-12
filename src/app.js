import onChange from 'on-change';
import validateForm from './validateSchema.js';
import handlerOfLoadingRSS from './handlers/handlerOfLoadingRSS';
import formRender from './renders/formRender.js';
import responseRender from './renders/responseRender';

const watchedState = (state) => {
  const watcher = onChange(state, (path) => {
    console.log('ya srabotal');
    if (path === 'validateForm' || path === 'validateError') {
      formRender(watcher);
    } else {
      responseRender(watcher);
    }
  });
  return watcher;
};

const inputHandler = (state) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    validateForm(value, state)
      .then((url) => {
        state.validateForm = 'valid';
        state.RSSurl.push(url);
        state.validateError = null;
        return url;
      })
      .catch((err) => {
        const [error] = err.errors;
        state.validateForm = 'invalid';
        state.validateError = (error.includes('not be one')) ? state.i18n.t('validation.errors.existFeed') : error;
        console.log(state);
      })
      .then((url) => {
        handlerOfLoadingRSS(state, url);
      });
  });
};

export default (state) => {
  const watcher = watchedState(state);
  inputHandler(watcher);
};
