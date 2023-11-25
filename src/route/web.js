import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from '../controllers/doctorController'
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
import handbookController from '../controllers/handbookController';
// import {handleLogin} from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/login', homeController.getLogin);

    router.post('/create', homeController.postCRUD);
    router.get('/display', homeController.displayData);
    router.get('/edit', homeController.editUser);
    router.post('/putUser', homeController.putUser);
    router.get('/delete', homeController.deleteUser);

    router.post('/api/login', userController.handleLogin);
    router.post('/api/createUsers', userController.handleCreateUser);
    router.get('/api/getAllUsers', userController.handleGetAllUser);
    router.put('/api/editUsers', userController.handleEditUser);
    router.delete('/api/deleteUsers', userController.handleDeleteUser);

    router.get('/api/getAllCode', userController.getAllCode);

    router.get('/api/outstanding_doctor', doctorController.getOutstandingDoctor);
    router.get('/api/getAllDoctor', doctorController.getAllDoctor);
    router.post('/api/saveInfoDoctor', doctorController.saveInfoDoctor);
    router.get('/api/getDetailDoctor', doctorController.getDetailDoctor);
    router.get('/api/getScheduleByDoctor', doctorController.getScheduleByDoctor);
    router.get('/api/getExtraDoctorInfo', doctorController.getExtraDoctorInfo);
    router.get('/api/getProfileDoctor', doctorController.getProfileDoctor);

    router.post('/api/createSchedule', doctorController.createSchedule);

    router.post('/api/confirmRemedy', doctorController.confirmRemedy);
    router.post('/api/patientBooking', patientController.patientBooking);
    router.get('/api/getAllBooking', patientController.getAllBooking);
    router.post('/api/verifyEmailBooking', patientController.verifyEmailBooking);

    router.post('/api/createSpecialty', specialtyController.createSpecialty);
    router.get('/api/getAllSpecialty', specialtyController.getAllSpecialty);
    router.put('/api/editSpecialty', specialtyController.editSpecialty);
    router.delete('/api/deleteSpecialty', specialtyController.deleteSpecialty);
    router.get('/api/getDetailSpecialty', specialtyController.getDetailSpecialty);



    router.post('/api/createClinic', clinicController.createClinic);
    router.get('/api/getAllClinic', clinicController.getAllClinic);
    router.put('/api/editClinic', clinicController.editClinic);
    router.delete('/api/deleteClinic', clinicController.deleteClinic);
    router.get('/api/getDetailClinic', clinicController.getDetailClinic);

    router.post('/api/createHandbook', handbookController.createHandbook);
    router.get('/api/getAllHandbook', handbookController.getAllHandbook);
    router.put('/api/editHandbook', handbookController.editHandbook);
    router.delete('/api/deleteHandbook', handbookController.deleteHandbook);
    router.get('/api/getDetailHandbook', handbookController.getDetailHandbook);





    return app.use('/', router);
}
module.exports = initWebRoutes;