import db from "../models";

let userHandleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let existUser = await checkEmailExist(email);
            if (existUser) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'password', 'email', 'roleId', 'firstName', 'lastName'],
                    raw: true,
                })
                if (user) {
                    if (user.password === password) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        let { password, ...newUser } = user;
                        userData.user = newUser;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Password not match";
                    }
                }
            } else {
                userData.errCode = 2;
                userData.message = 'Your email is not exist';
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}
let checkEmailExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let createUser = (dataCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmailExist(dataCreate.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Email is already exist",
                })
            } else {
                await db.User.create({
                    email: dataCreate.email,
                    password: dataCreate.password,
                    phoneNumber: dataCreate.phone,
                    firstName: dataCreate.firstName,
                    lastName: dataCreate.lastName,
                    address: dataCreate.address,
                    gender: dataCreate.gender,
                    roleID: dataCreate.role,
                    positionID: dataCreate.position,
                    image: dataCreate.avatar
                })
                resolve({
                    errCode: 0,
                    message: "Create succeed",
                })

            }
        } catch (error) {
            reject(error);
        }
    })
}
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = '';
            if (userId == "ALL") {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (userId && userId != 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                });
            }
            if (user != '') {
                userData.user = user;
            }
            console.log(user);
            resolve(userData);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    })
}

let editUser = (dataEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(dataEdit);
            let userData = {};
            await db.User.update({
                firstName: dataEdit.firstName,
                lastName: dataEdit.lastName,
                address: dataEdit.address,
                gender: dataEdit.gender,
                roleID: dataEdit.role,
                positionID: dataEdit.position,
                phoneNumber: dataEdit.phone,
                image: dataEdit.avatar
            }, {
                where: { id: dataEdit.id }
            })
            userData.errCode = 0;
            userData.message = "Edit succeed";
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

// let compareUserPassword = (password) => {
//     return new Promise((resolve, reject) => {
//         try {
//             let user = db.User.findOne({
//                 where: {email}
//             })
//         } catch (error) {
//             reject(error);
//         }
//     })
// }
let deleteUser = (dataDelete) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: dataDelete },
            });
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    message: "User is not exist",
                })
            } else {
                await db.User.destroy({
                    where: { id: dataDelete },
                });
                resolve({
                    errCode: 0,
                    message: "User was deleted",
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let allCode = await db.Allcode.findAll({
                where: { type: typeInput },
            });
            console.log(allCode);
            if (allCode.length != 0) {
                data.errCode = 0;
                data.message = "Get all code succeed";
                data.dataAllCode = allCode;
            } else {
                data.errCode = 2;
                data.message = "Get all code failed";
            }
            resolve(data);


        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    userHandleLogin: userHandleLogin,
    createUser: createUser,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
}