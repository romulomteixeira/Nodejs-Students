var models = require('../../models');
var request = require('request');
require('dotenv').config();

module.exports = function (app) {

    app.get("/managestudents", function (req, res) {
        var options = {
            uri: 'http://' + process.env.BACKEND_URL + '/students',
            method: 'GET'
        }
        request.get(
            options,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var students  = JSON.parse(body);
                    res.render("studentmodule/managestudent", {
                        student : students
                    });
                }
            }
        );
        
    });

    app.get("/createstudent", function (req, res) {
        res.render('studentmodule/createstudent');
    });

    app.post("/createstudent", function (req, res) {
        var uc = req.body
        var options = {
            uri: 'http://' + process.env.BACKEND_URL + '/students',
            method: 'POST',
            json: {
                "name": uc['name'],
                "passportNumber":uc['passportNumber']
            }
        }
        request.post(
            options,
            function (error, response, body) {
                console.log(response.statusCode)
                if (!error && response.statusCode == 200 || response.statusCode == 201) {
                    res.redirect("/managestudents");
                }
            }
        );
    });


    app.post("/deletestudent", function (req, res) {
        var idToDelete = req.body['studentToDelete'];
        console.log(idToDelete);
        var options = {
            uri: 'http://' + process.env.BACKEND_URL + '/students/' + idToDelete,
            method: 'DELETE'
        }
        request.delete(
            options,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.redirect("/managestudents");
                }
            }
        );

    });

    app.post("/editstudent", function (req, res) {
        var idToEdit = req.body['studentToEdit'];
        console.log(idToEdit);
        var options = {
            uri: 'http://' + process.env.BACKEND_URL + '/students/' + idToEdit,
            method: 'GET'
        }
        request.get(
            options,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var appended  = JSON.parse(body);
                    res.render("studentmodule/editstudent", {
                        student : appended
                    });
                }
            }
        );
       
    });

    app.post("/updatestudent", function (req, res) {
        console.log("update");
        var studentToEdit = req.body['studentToEdit'];
        var uc = req.body;
        var options = {
            uri: 'http://' + process.env.BACKEND_URL + '/students/' + studentToEdit,
            method: 'PUT',
            json: {
                "name": uc['name'],
                "passportNumber":uc['passportNumber']
            }
        }
        request.put(
            options,
            function (error, response, body) {
                console.log(response.statusCode)
                if (!error && response.statusCode == 200 || response.statusCode == 204) {
                    res.redirect("/managestudents");
                }
            }
        );


    });

}
