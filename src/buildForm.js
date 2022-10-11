import onChange from 'on-change';
import validateForm from './validateSchema.js';
import handlerOfLoadingRSS from './handlers/handlerOfLoadingRSS';

const buildForm = (watchedState) => {
  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');
  const feedback = document.querySelector('p.feedback');

  if (watchedState.validateForm === 'invalid') {
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = watchedState.validateError;
  }
  if (watchedState.validateForm === 'valid') {
    input.classList.remove('is-invalid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = watchedState.i18n.t('validation.succesfull');
    form.reset();
    form.elements.url.focus();
  }
};

const watchedState = (state) => {
  const watcher = onChange(state, () => {
    console.log('ya srabotal');
    buildForm(watcher);
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
        state.feeds.push(url);
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
