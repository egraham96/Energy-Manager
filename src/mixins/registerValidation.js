import { alpha, required, email } from "vuelidate/lib/validators";

const checkPassword = (val) => {
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return reg.test(val);
};

export const formValidation = {
  validations: {
    user: {
      first_name: {
        required,
        alpha,
      },
      last_name: {
        required,
        alpha,
      },
      role: {
        required,
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
