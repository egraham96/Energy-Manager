<template>
  <div class="user-modal">
    <img
      @click="toggleModal"
      class="modal-avatar"
      src="../assets/user-photo.jpg"
      alt="user avatar"
    />
    <div v-if="isOpen" class="modal-body">
      <div class="header">
        <img
          class="profile-photo"
          src="../assets/user-photo.jpg"
          alt="user avatar"
        />
        <div class="header-side">
          <p class="name">{{ user.first_name }} + {{user.last_name}}</p>
          <p class="email">{{ user.email }}</p>
          <div @click="goSettings" class="link">Settings</div>
        </div>
      </div>
      <hr />
      <div class="logout" @click="logout">Logout</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "UserModal",
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    goSettings() {
      this.toggleModal();
      this.$router.push({ name: "Settings" });
    },
    logout() {
      this.toggleModal();
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      this.SET_USER(null);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-modal {
  height: 100%;
  position: relative;
}
.modal-avatar {
  border-radius: 50%;
  cursor: pointer;
}
.modal-body {
  position: absolute;
  top: 50px;
  right: -10px;
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 4px;
}
.header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.profile-photo {
  width: 70px;
  height: auto;
  border-radius: 8px;
}
.header-side {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.name,
.email,
.link {
  margin: 0;
  font-size: 0.8rem;
}
.name {
  font-weight: 500;
}
.email {
  font-weight: 200;
}
.link {
  text-align: center;
  text-decoration: none;
  padding: 5px 10px;
  color: white;
  background-color: var(--secondary);
  border-radius: 4px;
  cursor: pointer;
}
.link:hover {
  background-color: green;
}
.logout {
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  background-color: var(--primary);
  text-align: center;
  cursor: pointer;
}
.logout:hover {
  background-color: var(--light);
}
</style>
