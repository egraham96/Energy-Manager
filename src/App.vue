<template>
  <div id="app">
    <Header />
    <NewRowModal v-if="modal.isOpen" />
    <NewColumnModal v-if="columnModal.isOpen" />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Header from "./components/Header.vue";
import NewRowModal from "./components/NewRowModal.vue";
import NewColumnModal from "./components/NewColumnModal.vue";

export default {
  name: "App",
  components: {
    Header,
    NewRowModal,
    NewColumnModal,
  },
  computed: {
    ...mapState(["modal", "columnModal"]),
  },
  methods: {
    ...mapActions(["checkTokenValidity"]),
  },
  mounted() {
    if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
      this.checkTokenValidity().then(() => {
        this.$router.push({ name: "Dashboard" });
      });
    }
  },
};
</script>

<style>
:root {
  --primary: #1a2035;
  --secondary: #2bb930;
  --light: #202940;
}
*,
:after,
:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: var(--primary);
}
#app {
  font-family: "Poppins", sans-serif;
  color: #fff;
}
</style>
