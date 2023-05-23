import axios from "axios";
import fs from "fs";
import readline from "readline";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = process.cwd() + "/config.json";

const print = (no, text) => {
  console.log(`\x1b[${no}m%s\x1b[0m`, text);
};

print(33, "welcome to poster");

const requiredProps = {
  port: "3000",
  protocol: "http",
  method: "get",
};
let base = "default";
let req = "default";

const file = fs.readFileSync(filePath);
const config = JSON.parse(file);

for (let x in requiredProps) {
  try {
    if (!config.default[x]) {
      config.default[x] = requiredProps[x];
    }
  } catch {
    print(31, "default property required!");
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
    print(31, "wrong url pattern");
    process.exit();
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
      print(31, "selected request doesn't exists!");
      process.exit();
      return;
    }
  }
};

const makeRequest = async () => {
  const url = createUrl();
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
    if (err.response) {
      print(31, err.response.status, ":", err.response.statusText);
      print(35, err.response.data || "");
      return;
    }
    print(31, "error");
  }
};

const gettingReq = () => {
  print(32, "select request");
  for (let x in config) {
    print(36, x);
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
  print(35, `${req} selected to make request`);
  makeRequest();
  input.close();
});
