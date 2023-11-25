import specialtyService from '../services/specialtyService'

let createSpecialty = async (req, res) => {
    try {
        let dataCreate = req.body;
        let response = await specialtyService.handleCreateSpecialty(dataCreate);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.handleGetAllSpecialty();
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

let editSpecialty = async (req, res) => {
    try {
        let dataEdit = req.body;
        let response = await specialtyService.handleEditSpecialty(dataEdit);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let deleteSpecialty = async (req, res) => {
    try {
        let dataDelete = req.query.id;
        console.log(dataDelete);
        let response = await specialtyService.handleDeleteSpecialty(dataDelete);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getDetailSpecialty = async (req, res) => {
    try {
        let specialtyId = req.query.specialtyId;
        let response = await specialtyService.handleGetDetailSpecialty(specialtyId);
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
    createSpecialty,
    getAllSpecialty,
    editSpecialty,
    deleteSpecialty,
    getDetailSpecialty
}