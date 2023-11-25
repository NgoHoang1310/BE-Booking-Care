import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let dataCreate = req.body;
        let response = await clinicService.handleCreateClinic(dataCreate);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.handleGetAllClinic();
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getDetailClinic = async (req, res) => {
    try {
        let clinicId = req.query.clinicId;
        let response = await clinicService.handleGetDetailClinic(clinicId);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let editClinic = async (req, res) => {
    try {
        let dataEdit = req.body;
        let response = await clinicService.handleEditClinic(dataEdit);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let deleteClinic = async (req, res) => {
    try {
        let dataDelete = req.query.id;
        let response = await clinicService.handleDeleteClinic(dataDelete);
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
    createClinic,
    getAllClinic,
    editClinic,
    deleteClinic,
    getDetailClinic
}