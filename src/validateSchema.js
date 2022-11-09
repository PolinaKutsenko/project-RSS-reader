import * as yup from 'yup';
import { setLocale } from 'yup';

const validateForm = (value, resources) => {
  setLocale({
    string: {
      url: 'validation.errors.notURL',
      min: 'validation.errors.minLength',
    },
  });
  const sources = resources.map((resourse) => resourse.url);
  const schema = yup.string().url().min(5).notOneOf(sources);
  return schema.validate(value);
};
export default validateForm;
