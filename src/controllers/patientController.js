const { json } = require("body-parser");
import patientService from '../services/patientService';

let patientBooking = async (req, res) => {
    try {
        let dataBooking = req.body;
        let response = await patientService.handlePatientBooking(dataBooking);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let verifyEmailBooking = async (req, res) => {
    try {
        let dataVerify = req.body;
        let response = await patientService.handleVerifyEmailBooking(dataVerify);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getAllBooking = async (req, res) => {
    try {
        let date = req.query.date;
        let doctorId = req.query.doctorId;
        let response = await patientService.handleGetAllBooking(doctorId, date);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}


module.exports = {
    patientBooking,
    verifyEmailBooking,
    getAllBooking
}