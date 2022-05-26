<template>
  <div class="column-container">
    <div class="new-column-modal">
      <h3>Add New Column</h3>
      <label for="column-name">Column Name</label>
      <input type="text" id="column-name" v-model="name" />
      <label for="input-type">Input Type</label>
      <select name="inputType" id="input-type" v-model="dataType">
        <option value="TEXT">Text</option>
        <option value="NUMERIC">Numeric</option>
        <option value="DATE">Date</option>
        <option value="BOOLEAN">Boolean</option>
      </select>
      <div class="btn-container">
        <button class="btn btn-secondary" @click="closeModal">Cancel</button>
        <button class="btn btn-success" @click="create">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "NewColumnModal",
  data() {
    return {
      name: "",
      dataType: "numeric",
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_COLUMN_MODAL"]),
    ...mapActions(["createNewColumn"]),
    closeModal() {
      this.SET_COLUMN_MODAL({ isOpen: false, table: null });
    },
    create() {
      this.createNewColumn({
        name: this.name,
        dataType: this.dataType,
      }).then(() => this.closeModal());
    },
  },
};
</script>


<style scoped>
.column-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}
.new-column-modal {
  padding: 60px 50px;
  max-width: 30rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  background-color: var(--light);
  border-radius: 8px;
}
h3 {
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
}
label {
  grid-column-start: 1;
}
#column-name {
  grid-column-start: 2;
  padding-inline-start: 0.3rem;
}
#input-type {
  grid-column-start: 2;
  padding-inline-start: 0.3rem;
}
.btn-container {
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}
</style>
