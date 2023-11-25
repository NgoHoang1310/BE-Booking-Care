
import db from "../models"
let handleCreateSpecialty = (dataCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataCreate.name || !dataCreate.image || !dataCreate.descriptionMarkdown || !dataCreate.descriptionHTML) {
                resolve({
                    errCode: 1,
                    message: "Missing data doctor input",
                })
            } else {
                let data = await db.Speciality.create({
                    name: dataCreate.name,
                    image: dataCreate.image,
                    descriptionMarkdown: dataCreate.descriptionMarkdown,
                    descriptionHTML: dataCreate.descriptionHTML
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Create specialty success"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Speciality.findAll();
            if (specialties) {
                resolve({
                    errCode: 0,
                    message: "Get all specialty success",
                    specialties: specialties
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleEditSpecialty = (dataEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataEdit.id || !dataEdit.name || !dataEdit.image || !dataEdit.descriptionHTML || !dataEdit.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let data = await db.Speciality.update(
                    {
                        name: dataEdit.name,
                        image: dataEdit.image,
                        descriptionHTML: dataEdit.descriptionHTML,
                        descriptionMarkdown: dataEdit.descriptionMarkdown,

                    },
                    {
                        where: { id: dataEdit.id }
                    }
                )

                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Update specialty success",
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleDeleteSpecialty = (dataDelete) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataDelete) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let foundSpecialty = await db.Speciality.findOne({
                    where: { id: dataDelete },
                });
                if (!foundSpecialty) {
                    resolve({
                        errCode: 2,
                        message: "Specialty is not exist",
                    })
                } else {
                    await db.Speciality.destroy({
                        where: { id: dataDelete },
                    });
                    resolve({
                        errCode: 0,
                        message: "Specialty was deleted",
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetDetailSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!specialtyId) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let detailSpecialty = await db.Speciality.findOne({
                    where: {
                        id: specialtyId,
                    },
                    attributes: ['descriptionHTML'],
                });
                if (detailSpecialty) {
                    let doctors = await db.Doctor_Info.findAll({
                        where: {
                            specialtyID: specialtyId,
                        }
                    })
                    if (doctors) {
                        resolve({
                            errCode: 0,
                            message: "Get detail specialty success",
                            detailSpecialty: {
                                description: detailSpecialty.descriptionHTML,
                                doctors: doctors
                            }
                        })

                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleCreateSpecialty,
    handleGetAllSpecialty,
    handleEditSpecialty,
    handleDeleteSpecialty,
    handleGetDetailSpecialty
}