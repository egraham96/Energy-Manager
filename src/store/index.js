import Vue from "vue";
import Vuex from "vuex";
import httpClient from "../services/httpClient";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    remember: false,
    factories: null,
    units: null,
    factoryDataType: null,
    unitDataType: null,
    modal: {
      isOpen: false,
      data: null,
      name: null,
      values: "",
    },
    columnModal: {
      isOpen: false,
      table: null,
    },
  },
  mutations: {
    SET_USER(state, payload) {
      if (payload === null) {
        state.user = null;
      } else {
        state.user = { ...payload };
      }
    },
    SET_REMEMBER(state, payload) {
      state.remember = payload;
    },
    SET_FACTORIES(state, payload) {
      state.factories = payload;
    },
    SET_UNITS(state, payload) {
      state.units = payload;
    },
    SET_FACTORY_DATA_TYPE(state, payload) {
      state.factoryDataType = payload;
    },
    SET_UNIT_DATA_TYPE(state, payload) {
      state.unitDataType = payload;
    },
    SET_MODAL(state, payload) {
      state.modal = { ...payload };
    },
    SET_COLUMN_MODAL(state, payload) {
      state.columnModal = { ...payload };
    },
  },
  actions: {
    register(context, payload) {
      return httpClient
        .post("/register", payload)
        .then((res) => {
          context.commit("SET_USER", res.data);
          sessionStorage.setItem("user", JSON.stringify(res.data));
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
    login(context, payload) {
      return httpClient
        .post("/login", payload)
        .then((res) => {
          context.commit("SET_USER", res.data);
          if (context.state.remember) {
            localStorage.setItem("user", JSON.stringify(res.data));
          } else {
            sessionStorage.setItem("user", JSON.stringify(res.data));
          }
          return Promise.resolve(res.status);
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
    checkTokenValidity(context) {
      return httpClient
        .post("/check")
        .then((res) => {
          context.commit(
            "SET_USER",
            JSON.parse(
              localStorage.getItem("user") || sessionStorage.getItem("user")
            )
          );
          return Promise.resolve(res.status);
        })
        .catch((err) => {
          context.commit("SET_USER", null);
          return Promise.reject(err.response.status);
        });
    },
    getFactoryDataType(context) {
      httpClient
        .get("/factories/type")
        .then((res) => {
          context.commit("SET_FACTORY_DATA_TYPE", res.data);
        })
        .catch((err) => console.log(err));
    },
    getUnitDataType(context) {
      httpClient
        .get("/units/data/type")
        .then((res) => {
          context.commit("SET_UNIT_DATA_TYPE", res.data);
        })
        .catch((err) => console.log(err));
    },
    createNewFactory(context, payload) {
      httpClient
        .post("/factories", payload)
        .then(() => {
          context.dispatch("getAllFactories");
        })
        .catch((err) => console.log(err));
    },
    createNewUnit(context, payload) {
      httpClient
        .post("/units", payload)
        .then(() => {
          context.dispatch("getFactoryUnits", payload.factory_id);
        })
        .catch((err) => console.log(err));
    },
    getAllFactories(context) {
      httpClient
        .get("/factories")
        .then((res) => {
          let data = res.data.map((item) => {
            item.membership_start = new Date(
              item.membership_start
            ).toLocaleDateString();
            item.membership_end = new Date(
              item.membership_end
            ).toLocaleDateString();
            return item;
          });
          context.commit("SET_FACTORIES", data);
        })
        .catch((err) => console.log(err));
    },
    deleteFactoryById(context, payload) {
      httpClient
        .delete(`/factories/${payload}`)
        .then(() => {
          context.dispatch("getAllFactories");
          context.dispatch("deleteUnitsByFactoryId", payload);
        })
        .catch((err) => console.log(err));
    },
    editFactoryData(context, payload) {
      httpClient
        .put(`/factories/${payload.id}`, payload)
        .then(() => {
          context.dispatch("getAllFactories");
        })
        .catch((err) => console.log(err));
    },
    getFactoryUnits(context, payload) {
      httpClient
        .get(`/units/${payload}`)
        .then((res) => {
          context.commit("SET_UNITS", res.data);
        })
        .catch((err) => console.log(err));
    },
    deleteUnitById(context, payload) {
      httpClient
        .delete(`/units/${payload.unit_id}`)
        .then(() => {
          context.dispatch("getFactoryUnits", payload.factory_id);
        })
        .catch((err) => console.log(err));
    },
    deleteUnitsByFactoryId(context, payload) {
      httpClient
        .delete(`/units/all/${payload}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    editUnitData(context, payload) {
      httpClient
        .put(`/units/${payload.unit_id}`, payload)
        .then(() => {
          context.dispatch("getFactoryUnits", payload.factory_id);
        })
        .catch((err) => console.log(err));
    },
    deleteFactoryColumn(context, payload) {
      httpClient
        .delete(`/factories/column/delete/${payload}`)
        .then(() => {
          context.dispatch("getFactoryDataType");
          context.dispatch("getAllFactories");
        })
        .catch((err) => console.log(err));
    },
    deleteUnitColumn(context, payload) {
      httpClient
        .delete(`/units/column/delete/${payload}`)
        .then(() => {
          context.dispatch("getUnitDataType");
          context.dispatch(
            "getFactoryUnits",
            context.state.units[0].factory_id
          );
        })
        .catch((err) => console.log(err));
    },
    createNewColumn(context, payload) {
      return httpClient
        .post(`/${context.state.columnModal.table}/column/new`, payload)
        .then(() => {
          if (context.state.columnModal.table === "factories") {
            context.dispatch("getFactoryDataType");
            context.dispatch("getAllFactories");
          } else {
            context.dispatch("getUnitDataType");
            context.dispatch(
              "getFactoryUnits",
              context.state.units[0].factory_id
            );
          }
        })
        .catch((err) => console.log(err));
    },
  },
  modules: {},
});
