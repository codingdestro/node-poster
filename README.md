### welcome to my poster app

# Here you can make requests from terminal to any backend by creating config file.

This is a very simple solution to make requests from terminal

Hi, My name is mohd anas and i am full stack web developer,

I love to use terminal for development and I create node.js backend from terminal
sometimes i need to test routes so i had to use another app like `postman` or vscode `thunderclient`.

I had to write multiple things again and again.

# That's why i created this app.

As a developer or to create a project in node.js.

## How to use poster app.

- create `config.json` file.
- add `default` field
- add `requests name` .

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

- run the app and select the request name.
