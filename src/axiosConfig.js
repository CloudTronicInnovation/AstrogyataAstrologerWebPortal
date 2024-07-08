import axios from "axios";

const instance = axios.create({
 baseURL: "https://api.astrogyata.in/api",
  // baseURL: "http://192.168.1.145:4000",
  // baseURL: "http://localhost:4000", 
  // baseURL: "http://api.astrogyata.in:8686/",
});
export const panchanURL = axios.create({
  baseURL:"https://json.astrologyapi.com"
});
export default instance;