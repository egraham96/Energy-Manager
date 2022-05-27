<template>
  <div class="new-row-modal">
    <form class="input-container">
      <div class="input-group" v-for="(item, index) in modal.data" :key="index">
        <label
          v-if="!(item.column_name === 'id' || item.column_name === 'unit_id')"
          :for="item.column_name"
          >{{ item.column_name | convertTableHeading }}</label
        >
        <input
          v-model="newRow[item.column_name]"
          v-if="!(item.column_name === 'id' || item.column_name === 'unit_id')"
          :id="item.column_name"
          :type="setInputType(item.data_type)"
          required
        />
      </div>
      <div class="btn-container">
        <button
          type="button"
          class="btn btn-secondary"
          @click="SET_MODAL({ isOpen: false })"
        >
          Cancel
        </button>
        <button
          @click.prevent="modal.values !== null ? editData() : createNewData()"
          type="submit"
          class="btn btn-success"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "NewRowModal",
  data() {
    return {
      newRow: {},
    };
  },
  filters: {
    convertTableHeading(val) {
      return val.split("_").join(" ").toUpperCase();
    },
  },
  computed: {
    ...mapState(["unitDataType", "modal"]),
  },
  methods: {
    ...mapMutations(["SET_MODAL"]),
    ...mapActions([
      "createNewProperty",
      "createNewUnit",
      "editPropertyData",
      "editUnitData",
    ]),
    setInputType(val) {
      return val === "text"
        ? "text"
        : val === "numeric" || val === "integer"
        ? "number"
        : val === "date"
        ? "date"
        : "checkbox";
    },
    createNewData() {
      if (this.modal.name === "properties") {
        this.createNewProperty(this.newRow);
      } else {
        this.createNewUnit(this.newRow);
      }
      this.SET_MODAL({
        isOpen: false,
        data: null,
        name: null,
        values: null,
      });
    },
    editData() {
      if (this.modal.name === "properties") {
        this.editPropertyData(this.newRow);
      } else {
        this.editUnitData(this.newRow);
      }
      this.SET_MODAL({
        isOpen: false,
        data: null,
        name: null,
        values: null,
      });
    },
  },
  created() {
    if (this.modal.values && this.modal.name === "properties") {
      const tempObject = { ...this.modal.values };
      tempObject.membership_start = new Date(tempObject.membership_start);
      tempObject.membership_start.setDate(
        tempObject.membership_start.getDate() + 1
      );
      tempObject.membership_start = tempObject.membership_start
        .toISOString()
        .split("T")[0];

      tempObject.membership_end = new Date(tempObject.membership_end);
      tempObject.membership_end.setDate(
        tempObject.membership_end.getDate() + 1
      );
      tempObject.membership_end = tempObject.membership_end
        .toISOString()
        .split("T")[0];
      this.newRow = { ...tempObject };
    } else if (this.modal.values && this.modal.name === "units") {
      this.newRow = { ...this.modal.values };
    } else this.newRow = {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-row-modal {
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
.input-container {
  width: max-content;
  background-color: var(--light);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  gap: 20px;
}
.input-group {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
input {
  padding-left: 10px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
</style>
