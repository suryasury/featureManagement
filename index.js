const express = require("express");
const cors = require("cors");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const db = require("./src/models");
var Module = require("module");
var fs = require("fs");

Module._extensions[".png"] = function (module, fn) {
  var base64 = fs.readFileSync(fn).toString("base64");
  module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
};

const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AdminBro.registerAdapter(require("admin-bro-sequelize"));

require("./src/routes/routes.js")(app);

const adminBro = new AdminBro({
  databases: [db],
  rootPath: "/admin",
  branding: {
    logo: require("./src/assets/icons/wealth42Logo.png"),
    companyName: "Admin - wealth42 ",
  },
  resources: [
    {
      resource: db.GroupFeatures,
      options: {},
    },
  ],
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
