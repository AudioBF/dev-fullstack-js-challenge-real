const express = require("express");
const StudentController = require("../controllers/StudentController");

module.exports = (app) => {
    const router = express.Router();
    const StudentsControllerInstance = new StudentController(app);
    router.get("/list/:searchQuery?", StudentsControllerInstance.listAction);
    router.get("/find/:ra", StudentsControllerInstance.findAction);
    router.post("/save", StudentsControllerInstance.createAction);
    router.put("/edit/:ra", StudentsControllerInstance.editAction);
    router.delete("/delete/:ra", StudentsControllerInstance.deleteAction);
    return router;
}