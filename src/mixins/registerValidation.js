import { alpha, required, minLength, email } from "vuelidate/lib/validators";

const checkPassword = (val) => {
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return reg.test(val);
};

export const formValidation = {
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(8),
        alpha,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        checkPassword,
      },
    },
  },
};
