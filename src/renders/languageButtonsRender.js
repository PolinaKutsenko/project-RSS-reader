const languageButtonsRender = (state) => {
  const switchButtons = document.querySelectorAll('[data-switcher]');
  switchButtons.forEach((button) => {
    button.classList.remove('btn-primary', 'btn-secondary');
    const language = button.dataset.switcher;
    const classListOfButton = state.language === language ? 'btn-primary' : 'btn-secondary';
    button.classList.add(classListOfButton);
  });
};

export default languageButtonsRender;
