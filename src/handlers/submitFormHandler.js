import validateForm from '../validateSchema.js';
import handlerOfLoadingRSS from './handlerOfLoadingRSS';

const submitFormHandler = (state) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');

    validateForm(value, state)
      .catch(({ errors }) => {
        const [error] = errors;
        throw new Error(error);
      })
      .catch((error) => {
        state.validation = 'invalid';
        const resources = state.loadingRSS.resources.map((resourсe) => resourсe.url);
        if (resources.includes(value)) {
          state.process = 'validation';
          throw new Error(state.i18n.t('validation.errors.existFeed'));
        }
        throw new Error(error.message);
      })
      .then((url) => {
        state.validation = 'valid';
        state.process = 'validation';
        return url;
      })
      .then((url) => {
        handlerOfLoadingRSS(state, url);
      })
      .catch((error) => {
        state.feedbackMessage = error.message;
      });
  });
};

export default submitFormHandler;
