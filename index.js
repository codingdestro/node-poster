import axios from "axios";
import fs from "fs";
import readline from "readline";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("welcome to poster");

const requiredProps = {
  hostname: "localhost",
  port: "3000",
  protocol: "http",
  method: "get",
};
let base = "default";
let req = "default";

const file = fs.readFileSync("config.json");
const config = JSON.parse(file);

for (let x in requiredProps) {
  try {
    if (!config.default[x]) {
      config.default[x] = requiredProps[x];
    }
  } catch {
    console.log("default property required!");
    break;
  }
}

const createUrl = () => {
  try {
    let url = "";
    const params = config[req];
    url = `${params["protocol"]}://${params["hostname"]}:${params["port"]}/`;
    if (params["path"]) {
      url += `${params["path"]}/`;
    }
    return url;
  } catch (err) {
    return "";
  }
};

const createOptions = () => {
  for (let x in config.default) {
    try {
      if (!config[req][x]) {
        config[req][x] = config.default[x];
      }
    } catch (err) {
      console.log("select request doesn't exists!");
      return;
    }
  }
};

const makeRequest = async () => {
  const url = createUrl();
  if (!url) return;
  try {
    const res =
      config[req]["method"] == "get"
        ? await axios(url, {
            params: config[req]["data"],
          })
        : await axios.post(url, config[req]["data"]);
    console.log(`${res.status} : ${res.statusText}`);
    console.log(res.data);
  } catch (err) {
    console.log(err.response.status);
  }
};

const gettingReq = () => {
  console.log("select request");
  for (let x in config) {
    console.log(x);
  }
  console.log("\n");
};

gettingReq();
await input.question("", (inp) => {
  if (!inp || inp == "default") {
    req = "default";
    createOptions();
  } else {
    req = inp;
    createOptions();
  }
  console.log(`${req} selected to make request`);
  makeRequest();
  input.close();
});
