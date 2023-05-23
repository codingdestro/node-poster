# welcome to my poster app

## Here you can make requests from terminal to any backend by creating config file.

This is a very simple solution to make requests from terminal

Hi, My name is mohd anas and i am full stack web developer,

I love to use terminal for development and I create node.js backend from terminal
sometimes i need to test routes so i had to use another app like _postman_ or vscode _thunderclient_.

I had to write multiple things again and again.

### That's why i created this app.

As a developer or to create a project in node.js.

## How to use poster app.

- create _config.json_ file.
- add _default_ field
- add _requests name_ .

exmaple

```json
{
  "default": {
    "hostname": "localhost",
    "port": 5500
  },
  "add user": {
    "method": "post",
    "path": "api/adduser",
    "data": {
      "name": "mohd anas"
    }
  }
}
```

**run the app and select the request name.**

### What did i use to create it.

- axios
- fs
- readline
- object destructuring

**thanks for using this**
