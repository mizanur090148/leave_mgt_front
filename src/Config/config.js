//require("dotenv").config();

const port = 5000;
let baseUrl = `http://localhost`;
if (port) {
  baseUrl = `${baseUrl}:${port}`;
}
console.log("base url: ", baseUrl);
const CONFIG = {
  baseUrl: baseUrl + "/api",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-type": "application/json",
  // },
};

export default CONFIG;
