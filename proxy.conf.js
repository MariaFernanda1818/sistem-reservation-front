module.exports = {
  "/api/v1/input/*": {
    "target": "http://localhost:8080/api/v1/input/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/input/": ""
    }
  },
  "/api/v1/output/*": {
    "target": "http://localhost:8080/api/v1/output/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/output/": ""
    }
  }
};