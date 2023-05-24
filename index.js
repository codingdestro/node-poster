#!/bin/node

const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const { exec } = require("child_process");

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
  hostname: "localhost",
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

const inputHandler = (inp) => {
  if (inp == "exit" || inp == "close") process.exit();
  if (inp == "clear" || inp == "cls") {
    exec("clear", (err, output) => console.log(output));
    return;
  }
  if (!inp || inp == "default") {
    req = "default";
    createOptions();
  } else {
    req = inp;
    createOptions();
  }
};

const loop = async () => {
  gettingReq();
  input.question("", (inp) => {
    inputHandler(inp);
    print(35, `${req} selected to make request`);
    makeRequest().then(() => {
      loop();
    });
  });
};
loop();
