import validateForm from '../validateSchema.js';
import handlerOfLoadingRSS from './handlerOfLoadingRSS';

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

export default submitFormHandler;
