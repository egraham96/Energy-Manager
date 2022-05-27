import httpClient from "./httpClient";
import authHeader from "./authHeader";

class UserService {
  getPropertyData() {
    return httpClient.get("/properties", { headers: authHeader() });
  }

  getUnitData() {
    return httpClient.get("/units", { headers: authHeader() });
  }
}

export default new UserService();
