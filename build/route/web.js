"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _doctorController = _interopRequireDefault(require("../controllers/doctorController"));
var _patientController = _interopRequireDefault(require("../controllers/patientController"));
var _specialtyController = _interopRequireDefault(require("../controllers/specialtyController"));
var _clinicController = _interopRequireDefault(require("../controllers/clinicController"));
var _handbookController = _interopRequireDefault(require("../controllers/handbookController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import {handleLogin} from "../controllers/userController";

var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.get('/', _homeController["default"].getHomePage);
  router.get('/login', _homeController["default"].getLogin);
  router.post('/create', _homeController["default"].postCRUD);
  router.get('/display', _homeController["default"].displayData);
  router.get('/edit', _homeController["default"].editUser);
  router.post('/putUser', _homeController["default"].putUser);
  router.get('/delete', _homeController["default"].deleteUser);
  router.post('/api/login', _userController["default"].handleLogin);
  router.post('/api/createUsers', _userController["default"].handleCreateUser);
  router.get('/api/getAllUsers', _userController["default"].handleGetAllUser);
  router.put('/api/editUsers', _userController["default"].handleEditUser);
  router["delete"]('/api/deleteUsers', _userController["default"].handleDeleteUser);
  router.get('/api/getAllCode', _userController["default"].getAllCode);
  router.get('/api/outstanding_doctor', _doctorController["default"].getOutstandingDoctor);
  router.get('/api/getAllDoctor', _doctorController["default"].getAllDoctor);
  router.post('/api/saveInfoDoctor', _doctorController["default"].saveInfoDoctor);
  router.get('/api/getDetailDoctor', _doctorController["default"].getDetailDoctor);
  router.get('/api/getScheduleByDoctor', _doctorController["default"].getScheduleByDoctor);
  router.get('/api/getExtraDoctorInfo', _doctorController["default"].getExtraDoctorInfo);
  router.get('/api/getProfileDoctor', _doctorController["default"].getProfileDoctor);
  router.post('/api/createSchedule', _doctorController["default"].createSchedule);
  router.post('/api/confirmRemedy', _doctorController["default"].confirmRemedy);
  router.post('/api/patientBooking', _patientController["default"].patientBooking);
  router.get('/api/getAllBooking', _patientController["default"].getAllBooking);
  router.post('/api/verifyEmailBooking', _patientController["default"].verifyEmailBooking);
  router.post('/api/createSpecialty', _specialtyController["default"].createSpecialty);
  router.get('/api/getAllSpecialty', _specialtyController["default"].getAllSpecialty);
  router.put('/api/editSpecialty', _specialtyController["default"].editSpecialty);
  router["delete"]('/api/deleteSpecialty', _specialtyController["default"].deleteSpecialty);
  router.get('/api/getDetailSpecialty', _specialtyController["default"].getDetailSpecialty);
  router.post('/api/createClinic', _clinicController["default"].createClinic);
  router.get('/api/getAllClinic', _clinicController["default"].getAllClinic);
  router.put('/api/editClinic', _clinicController["default"].editClinic);
  router["delete"]('/api/deleteClinic', _clinicController["default"].deleteClinic);
  router.get('/api/getDetailClinic', _clinicController["default"].getDetailClinic);
  router.post('/api/createHandbook', _handbookController["default"].createHandbook);
  router.get('/api/getAllHandbook', _handbookController["default"].getAllHandbook);
  router.put('/api/editHandbook', _handbookController["default"].editHandbook);
  router["delete"]('/api/deleteHandbook', _handbookController["default"].deleteHandbook);
  router.get('/api/getDetailHandbook', _handbookController["default"].getDetailHandbook);
  return app.use('/', router);
};
module.exports = initWebRoutes;