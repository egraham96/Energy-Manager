export default {
  methods: {
    checkFormValidation() {
      console.log("Inside checkFormValidation")
      this.$v.$touch()
      if (/*this.$v.$dirty &&*/ !this.$v.$invalid) {
        console.log(this.user)
        return true;
      } else {
        this.$v.$touch();
        return false;
      }
    },
  },
};
