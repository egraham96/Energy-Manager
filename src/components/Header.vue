<template>
  <nav class="navbar navbar-expand-sm navbar-dark">
    <div class="w-100 d-flex nav-container">
      <div class="logo" @click="navigate">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <ul class="m-0 ms-auto d-flex align-items-center justify-content-evenly">
        <div v-if="user" @click="goDashboard" class="dashboard-icon">
          <span>Dashboard</span>
          <svg width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
            />
          </svg>
        </div>
        <UserModal class="ms-4 d-flex align-items-center" v-if="user" />
        <select class="ms-4" name="language" id="language">
          <option value="en">en</option>
          <option value="tr">tr</option>
        </select>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import UserModal from "./UserModal.vue";

export default {
  name: "Header",
  components: {
    UserModal,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    navigate() {
      if (!this.user) {
        this.$router.push({ name: "Home" });
      }
    },
    goDashboard() {
      if (this.$route.path !== "/dashboard") {
        this.$router.push({ name: "Dashboard" });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background-color: var(--primary);
  min-height: 10vh;
  padding-inline: 30px;
  box-shadow: 0px 2px 0px 0px rgba(73, 73, 73, 0.2);
}
.logo {
  cursor: pointer;
}
#language {
  height: 25px;
  width: max-content;
  font-size: 0.8rem;
  border: 1px solid #989aa4;
  border-radius: 4px;
  background: var(--light);
  color: #989aa4;
  cursor: pointer;
}
.dashboard-icon {
  cursor: pointer;
  position: relative;
  height: 40px;
  width: 40px;
  transition: 0.5s;
  border-radius: 8px;
}
.dashboard-icon > svg {
  position: absolute;
  right: 4px;
  top: 4px;
}
.dashboard-icon > span {
  position: absolute;
  right: 44px;
  top: 8px;
}
.dashboard-icon:hover {
  width: 145px;
  background-color: var(--secondary);
}
@media screen and (max-width: 500px) {
  .dashboard-icon > span {
    display: none;
  }
  .dashboard-icon:hover {
    height: 40px;
    width: 40px;
    background-color: var(--secondary);
  }
  ul {
    width: 100%;
    margin-left: 0;
    padding-left: 0;
  }
  .nav-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>
