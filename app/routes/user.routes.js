module.exports = app => {
  const controller = require("../controllers/user.controller.js");
  const verifyToken = require("../middleware/verifytoken")
  var router = require("express").Router();
  const multer = require("multer");
  const upload = multer({
      dest: "temp/"
  });

  router.post("/signup", controller.create);

  router.post("/signin", controller.signin);
  // router.post("/upload",middleware, cont);

  router.post("/uplaodfile", upload.single("file"), verifyToken, controller.createFile);


  router.get("/getFiles", verifyToken, controller.getFiles);

  router.delete("/deleteFile", verifyToken, controller.deleteFile);




  app.use('/api/controller', router);
};