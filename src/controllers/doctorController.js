import doctorService from '../services/doctorService';

let getOutstandingDoctor = async (req, res) => {
    let limit = 8;
    try {
        let doctor = await doctorService.handleGetOutstandingDoctor(limit);
        console.log(doctor);
        return res.status(200).json(doctor);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctor = await doctorService.handleGetAllDoctor();
        console.log(doctor);
        return res.status(200).json(doctor);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let saveInfoDoctor = async (req, res) => {
    try {
        let inforDoctor = req.body;
        console.log(req.body);
        let response = await doctorService.handleSaveInfoDoctor(inforDoctor);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let doctorId = req.query.id;
        let detailDoctor = await doctorService.handleGetDetailDoctor(doctorId);
        console.log(detailDoctor);
        return res.status(200).json(detailDoctor);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let createSchedule = async (req, res) => {
    try {
        let dataSchedule = req.body;
        let response = await doctorService.handleCreateSchedule(dataSchedule);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getScheduleByDoctor = async (req, res) => {
    try {
        let date = req.query.date;
        let doctorId = req.query.doctorId;
        let response = await doctorService.handlegetScheduleByDoctor(doctorId, date);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getExtraDoctorInfo = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let response = await doctorService.handleGetExtraDoctorInfo(doctorId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getProfileDoctor = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let response = await doctorService.handleGetProfileDoctor(doctorId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let confirmRemedy = async (req, res) => {
    try {
        let dataRemedy = req.body;
        let response = await doctorService.handleConfirmRemedy(dataRemedy);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}


module.exports = {
    getOutstandingDoctor,
    getAllDoctor,
    saveInfoDoctor,
    getDetailDoctor,
    createSchedule,
    getScheduleByDoctor,
    getExtraDoctorInfo,
    getProfileDoctor,
    confirmRemedy

}
