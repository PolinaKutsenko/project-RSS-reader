export default () => {
  const container = document.querySelector('.container');
  const form = document.createElement('form');
  form.innerHTML = '<input type="text" name="text"><input type="submit" value="Submit" disabled="">';
  container.append(form);
};
