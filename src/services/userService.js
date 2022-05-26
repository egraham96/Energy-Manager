import httpClient from "./httpClient";
import authHeader from "./authHeader";

class UserService {
  getFactoryData() {
    return httpClient.get("/factories", { headers: authHeader() });
  }

  getUnitData() {
    return httpClient.get("/units", { headers: authHeader() });
  }
}

export default new UserService();
