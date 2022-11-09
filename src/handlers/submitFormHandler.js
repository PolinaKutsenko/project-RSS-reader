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
      .catch(({ errors }) => {
        const [error] = errors;
        throw new Error(error);
      })
      .catch((error) => {
        state.validation = 'invalid';
        const urlResources = resources.map((resourсe) => resourсe.url);
        if (urlResources.includes(value)) {
          state.process = 'validation';
          throw new Error('validation.errors.existFeed');
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
        state.feedbackMessageKey = error.message;
      });
  });
};

export default submitFormHandler;
