import * as yup from 'yup';
import { setLocale } from 'yup';

const validateForm = (value, state) => {
  setLocale({
    string: {
      url: state.i18n.t('validation.errors.notURL'),
      min: state.i18n.t('validation.errors.minLength'),
    },
  });
  const resources = state.loadingRSS.resources.map((resourse) => resourse.url);
  const schema = yup.string().url().min(5).notOneOf(resources);
  return schema.validate(value);
};
export default validateForm;
