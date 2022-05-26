<template>
  <div class="login-container">
    <form @submit.prevent="submit">
      <h3></h3>

      <label for="username">Username</label>
      <input
        :class="{
          errorborder: $v.user.username.$error,
        }"
        v-model.trim="$v.user.username.$model"
        type="text"
        placeholder="Username"
        id="username"
      />
      <div
        class="error-message"
        v-if="!$v.user.username.required && $v.user.username.$dirty"
      >
        Username is required
      </div>
      <div class="error-message" v-if="!$v.user.username.minLength">
        Username must have at least
        {{ $v.user.username.$params.minLength.min }} letters.
      </div>
      <div class="error-message" v-if="!$v.user.username.alpha">
        Username must contain only letters
      </div>

      <label for="email">Email</label>
      <input
        :class="{
          errorborder: $v.user.email.$error,
        }"
        v-model.trim="$v.user.email.$model"
        type="email"
        placeholder="Email"
        id="email"
      />
      <div
        class="error-message"
        v-if="!$v.user.email.required && $v.user.email.$dirty"
      >
        Email is required
      </div>
      <div class="error-message" v-if="!$v.user.email.email">
        Please enter a valid email
      </div>

      <label for="password">Password</label>
      <input
        :class="{
          errorborder: $v.user.password.$error,
        }"
        v-model.trim="$v.user.password.$model"
        type="password"
        placeholder="Password"
        id="password"
      />
      <div
        class="error-message"
        v-if="!$v.user.password.required && $v.user.password.$dirty"
      >
        Password is required
      </div>
      <div
        class="error-message"
        v-else-if="!$v.user.password.checkPassword && $v.user.password.$dirty"
      >
        Min. 8 characters (min. 1 lowercase, 1 uppercase and 1 number)
      </div>

      <label for="role"
        >User Role
        <select
          v-model="user.role"
          class="d-block form__input"
          name="role"
          id="role"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { formValidation } from "../mixins/registerValidation";
import checkValidation from "../mixins/checkValidation";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: null,
        email: null,
        password: null,
        role: "user",
      },
    };
  },
  mixins: [formValidation, checkValidation],
  methods: {
    ...mapActions(["register"]),
    submit() {
      let isValid = this.checkFormValidation();
      if (isValid) {
        this.register(this.user).then(() => {
          this.$router.push({ name: "Dashboard" });
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
form {
  flex-basis: 350px;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 20px 30px;
}
form * {
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 28px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}
label {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
}
input,
select {
  display: block;
  height: 40px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
button {
  margin-top: 40px;
  width: 100%;
  background-color: var(--light);
  color: white;
  padding: 15px 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
}
button:hover {
  background-color: var(--primary);
}
.textbox-label {
  width: max-content;
  display: flex;
  align-items: center;
}
.textbox-label > span {
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
}
.textbox-label > input {
  margin: 0;
  width: 15px;
  height: 15px;
}
.errorborder {
  border: 1px solid rgb(255, 72, 72);
}
.error-message {
  margin: 0;
  font-size: 12px;
  font-weight: 200;
  color: rgb(255, 72, 72);
}
</style>
