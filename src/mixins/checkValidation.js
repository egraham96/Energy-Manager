export default {
  methods: {
    checkFormValidation() {
      if (this.$v.$dirty && !this.$v.$invalid) {
        return true;
      } else {
        this.$v.$touch();
        return false;
      }
    },
  },
};
