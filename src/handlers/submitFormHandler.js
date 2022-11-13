import validateForm from '../validateSchema.js';
import handlerOfLoadingRSS from './handlerOfLoadingRSS';

const submitFormHandler = (state) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    const { resources } = state.loadingRSS;

    validateForm(value, resources)
      .then((url) => {
        state.validation = 'valid';
        handlerOfLoadingRSS(state, url);
      })
      .catch((err) => {
        state.process = 'error';
        state.validation = 'invalid';
        const { type } = err;
        const [errorMessage] = err.errors;
        switch (type) {
          case 'url':
          case 'min':
            state.feedbackMessageKey = errorMessage;
            break;
          case 'notOneOf':
            state.feedbackMessageKey = 'validation.errors.existFeed';
            break;
          default:
            throw new Error(e.message);
        }
      });
  });
};

export default submitFormHandler;
