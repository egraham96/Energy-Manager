export default {
  methods: {
    checkFormValidation() {
      console.log("submit")
      this.$v.$touch()
      if (/*this.$v.$dirty &&*/ !this.$v.$invalid) {
        console.log(this.user)
        console.log("true")
        return true;
      } else {
        this.$v.$touch();
        return false;
      }
    },
  },
};
