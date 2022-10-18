const formRender = (watchedState) => {
  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');
  const feedback = document.querySelector('p.feedback');

  if (watchedState.validation.validateForm === 'invalid') {
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
  if (watchedState.validation.validateForm === 'valid') {
    input.classList.remove('is-invalid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    form.reset();
    form.elements.url.focus();
  }
  feedback.textContent = watchedState.feedbackMessage;
};

export default formRender;
