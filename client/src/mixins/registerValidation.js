import { alpha, required, email } from "vuelidate/lib/validators";

const checkPassword = (val) => {
  let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //console.log("inside reg test")
  //console.log(reg.test(val))
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
