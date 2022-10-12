const formRender = (watchedState) => {
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

export default formRender;
