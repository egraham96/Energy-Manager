<template>
  <div v-if="user" class="settings">
    <h3>User Information</h3>
    <div class="input-field">
      <label for="first_name">First Name</label>
      <div class="user-info" id="first_name">{{ user.first_name }}</div>
    </div>
    <div class="input-field">
      <label for="last_name">Last Name</label>
      <div class="user-info" id="last_name">{{ user.last_name }}</div>
    </div>
    <div class="input-field">
      <label for="email">Email</label>
      <div class="user-info" id="email">{{ user.email }}</div>
    </div>
    <div class="input-field">
      <label for="role">Role</label>
      <div class="user-info" id="role">{{ user.role }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Settings",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.settings {
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 30px;
}
.input-field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  width: 300px;
}
.user-info {
  font-weight: 600;
  padding: 10px 20px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: white;
  color: black;
}
</style>
