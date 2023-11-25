const { json } = require("body-parser");
import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)
    console.log(email + " " + password);
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })

    }
    let userData = await userService.userHandleLogin(email, password);
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        userData,
    })
}

let handleCreateUser = async (req, res) => {
    let dataCreate = req.body;
    if (!dataCreate.firstName || !dataCreate.lastName || !dataCreate.email || !dataCreate.password || !dataCreate.address || !dataCreate.gender || !dataCreate.role ||!dataCreate.position||!dataCreate.phone) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing data create',
        })
    } else {
        let userData = await userService.createUser(dataCreate);
        if (userData) {
            return res.status(200).json({
                errCode: userData.errCode,
                message: userData.message,
                userData,
            })
        }
    }

}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    console.log(req.query);
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing id',
            userData: {}
        })
    } else {
        let userData = await userService.getAllUser(id);
        if (userData) {
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                userData,
            })
        }
    }
}

let handleEditUser = async (req, res) => {
    let dataEdit = req.body;
    console.log(dataEdit);
    if (!dataEdit.id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data edit',
        })
    } else {
        let userData = await userService.editUser(dataEdit);
        if (userData) {
            return res.status(200).json({
                errCode: userData.errCode,
                message: userData.message,
                userData,
            })
        }
    }
}

let handleDeleteUser = async (req, res) => {
    let dataDelete = req.body.id;
    if (!dataDelete) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data delete',
        })
    } else {
        let userData = await userService.deleteUser(dataDelete);
        if (userData) {
            return res.status(200).json({
                errCode: userData.errCode,
                message: userData.message,
                userData,
            })
        }
    }
}

let getAllCode = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing data inputType",
            })
        } else {
            let dataAllCode = await userService.getAllCodeService(type);
            return res.status(200).json({
                dataAllCode: dataAllCode,
            })

        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateUser: handleCreateUser,
    handleGetAllUser: handleGetAllUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}