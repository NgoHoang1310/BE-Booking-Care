import handbookService from '../services/handbookService';

let createHandbook = async (req, res) => {
    try {
        let dataCreate = req.body;
        let response = await handbookService.handleCreateHandbook(dataCreate);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getAllHandbook = async (req, res) => {
    try {
        let response = await handbookService.handleGetAllHandbook();
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getDetailHandbook = async (req, res) => {
    try {
        let handbookId = req.query.id;
        let response = await handbookService.handleGetDetailHandbook(handbookId);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let editHandbook = async (req, res) => {
    try {
        let dataEdit = req.body;
        let response = await handbookService.handleEditHandbook(dataEdit);
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let deleteHandbook = async (req, res) => {
    try {
        let dataDelete = req.query.id;
        let response = await handbookService.handleDeleteHandbook(dataDelete);
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
    createHandbook,
    getAllHandbook,
    editHandbook,
    deleteHandbook,
    getDetailHandbook
}