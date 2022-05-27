<template>
  <div v-if="user" class="dashboard">
    <div
      v-if="properties && properties.length > 0 && propertyDataType"
      class="property-table-container"
    >
      <h3 class="text-center">Properties</h3>
      <button
        v-if="user.role === 'admin'"
        @click="openNewColumnModal('properties')"
        class="btn btn-primary d-block ms-auto"
      >
        Add New Column
      </button>
      <table class="table">
        <thead>
          <tr>
            <th
              scope="col"
              v-for="(key, index) in propertyColumnNames"
              :key="index"
            >
              {{ key | convertTableHeading }}
              <span v-if="user.role === 'admin' && key !== 'id'">
                <svg
                  @click="deletepropertyColumn(key)"
                  class="delete-icon-column ms-3"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                  />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="property in properties"
            :key="property.id"
            @click="getPropertyUnits(property.id)"
          >
            <td v-for="(item, index) in property" :key="index">{{ item }}</td>
            <td class="icon-container" v-if="user.role === 'admin'">
              <span
                ><svg
                  @click="editData(propertyDataType, 'properties', property)"
                  class="edit-icon"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  /></svg
              ></span>
              <span>
                <svg
                  @click="deletePropertyById(property.id)"
                  class="delete-icon ms-3"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                  />
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="user.role === 'admin'"
        @click="addNewData(propertyDataType, 'properties')"
        class="add-data-btn"
      >
        Add New Data
      </div>
    </div>
    <div class="unit-table-container">
      <h3 class="text-center">Consumption Details</h3>
      <button
        v-if="units && user.role === 'admin'"
        @click="openNewColumnModal('units')"
        class="btn btn-primary d-block ms-auto"
      >
        Add New Column
      </button>
      <table v-if="units && units.length > 0 && unitDataType" class="table">
        <thead>
          <tr>
            <th
              scope="col"
              v-for="(key, index) in unitColumnNames"
              :key="index"
            >
              {{ key | convertTableHeading }}
              <span
                v-if="
                  user.role === 'admin' &&
                  key !== 'unit_id' &&
                  key !== 'property_id'
                "
              >
                <svg
                  @click="deleteUnitColumn(key)"
                  class="delete-icon-column ms-3"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                  />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(unit, index) in units" :key="index">
            <td v-for="(item, index) in unit" :key="index">
              {{ item | formatUnits(index) }}
            </td>
            <td class="icon-container" v-if="user.role === 'admin'">
              <span
                ><svg
                  @click="editData(unitDataType, 'units', unit)"
                  class="edit-icon"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  /></svg
              ></span>
              <span>
                <svg
                  @click="
                    deleteUnitById({
                      unit_id: unit.unit_id,
                      property_id: unit.property_id,
                    })
                  "
                  class="delete-icon ms-3"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                  />
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="user.role === 'admin'"
        @click="addNewData(unitDataType, 'units')"
        class="add-data-btn"
      >
        Add New Data
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapState([
      "user",
      "properties",
      "units",
      "unitDataType",
      "propertyDataType",
    ]),
    propertyColumnNames() {
      let newArr = [...this.propertyDataType];
      newArr.sort((a, b) => a.ordinal_position - b.ordinal_position);
      let result = newArr.map((item) => item.column_name);
      return result;
    },
    unitColumnNames() {
      let newArr = [...this.unitDataType];
      newArr.sort((a, b) => a.ordinal_position - b.ordinal_position);
      let result = newArr.map((item) => item.column_name);
      return result;
    },
  },
  methods: {
    ...mapMutations(["SET_MODAL", "SET_COLUMN_MODAL"]),
    ...mapActions([
      "getPropertyDataType",
      "getUnitDataType",
      "getAllProperties",
      "getPropertyUnits",
      "deletePropertyById",
      "deleteUnitById",
      "deletePropertyColumn",
      "deleteUnitColumn",
    ]),
    addNewData(data, name) {
      this.SET_MODAL({
        isOpen: true,
        data: data.sort((a, b) => a.ordinal_position - b.ordinal_position),
        name: name,
        values: null,
      });
    },
    editData(data, name, values) {
      this.SET_MODAL({
        isOpen: true,
        data: data.sort((a, b) => a.ordinal_position - b.ordinal_position),
        name: name,
        values: values,
      });
    },
    openNewColumnModal(val) {
      this.SET_COLUMN_MODAL({ isOpen: true, table: val });
    },
  },
  filters: {
    convertCurrency(val) {
      return Number(val).toLocaleString("en-US");
    },
    convertTableHeading(val) {
      return val.split("_").join(" ").toUpperCase();
    },
    formatUnits(val, index) {
      switch (index) {
        case "consumption_amount":
          return `${val} kWh`;
        case "consumption_price":
          return `${Number(val).toLocaleString("en-US")} $`;
        case "discount":
          return val ? "20%" : "No Discount";
        case "total_price":
          return `${Number(val).toLocaleString("en-US")} $`;
        default:
          return val;
      }
    },
  },
  created() {
    this.getAllProperties();
    this.getPropertyDataType();
    this.getUnitDataType();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.property-table-container,
.unit-table-container {
  overflow-x: scroll;
}
.table {
  background-color: var(--primary);
  color: white;
}
.property-table-container tbody tr {
  cursor: pointer;
}

.property-table-container tbody tr:hover {
  background-color: var(--light);
}

::-webkit-scrollbar {
  height: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: var(--primary);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--light);
  border-radius: 20px;
}
svg {
  visibility: hidden;
}
tbody tr:hover svg {
  visibility: visible;
}
thead th:hover .delete-icon-column {
  visibility: visible;
}
.edit-icon:hover {
  cursor: pointer;
  color: var(--secondary);
}
.delete-icon:hover {
  cursor: pointer;
  color: rgb(250, 79, 79);
}
.delete-icon-column:hover {
  cursor: pointer;
  color: rgb(250, 79, 79);
}
.icon-container {
  min-width: 80px;
}
.add-data-btn {
  width: max-content;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  background-color: var(--secondary);
  margin-left: auto;
}
</style>
