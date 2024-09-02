module.exports = {
  "/api/v1/input/*": {
    "target": "http://localhost:8001/api/v1/input/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/input/": ""
    }
  },
  "/api/v1/output/*": {
    "target": "http://localhost:8001/api/v1/output/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/output/": ""
    }
  }
  ,
  "/api/v1/login/*": {
    "target": "http://localhost:8003/api/v1/login/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/login/": ""
    }
  }
  ,
  "/api/v1/afiliado/*": {
    "target": "http://localhost:8001/api/v1/afiliado/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/afiliado/": ""
    }
  }
};