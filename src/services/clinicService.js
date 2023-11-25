import db from "../models";

let handleCreateClinic = (dataCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataCreate.name || !dataCreate.address ||
                !dataCreate.image || !dataCreate.banner ||
                !dataCreate.introductionHTML || !dataCreate.descriptionMarkdown ||
                !dataCreate.descriptionHTML) {
                resolve({
                    errCode: 1,
                    message: "Missing data clinic input",
                })
            } else {
                let data = await db.Clinic.create({
                    name: dataCreate.name,
                    image: dataCreate.image,
                    banner: dataCreate.banner,
                    address: dataCreate.address,
                    descriptionHTML: dataCreate.descriptionHTML,
                    descriptionMarkdown: dataCreate.descriptionMarkdown,
                    introductionHTML: dataCreate.introductionHTML,
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Create clinic success"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = await db.Clinic.findAll();
            if (clinics) {
                resolve({
                    errCode: 0,
                    message: "Get all clinic success",
                    clinics: clinics
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleEditClinic = (dataEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataEdit.id || !dataEdit.name ||
                !dataEdit.image || !dataEdit.banner || !dataEdit.descriptionHTML ||
                !dataEdit.descriptionMarkdown || !dataEdit.introductionHTML ||
                !dataEdit.address
            ) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let data = await db.Clinic.update(
                    {
                        name: dataEdit.name,
                        image: dataEdit.image,
                        banner: dataEdit.banner,
                        descriptionHTML: dataEdit.descriptionHTML,
                        descriptionMarkdown: dataEdit.descriptionMarkdown,
                        introductionHTML: dataEdit.introductionHTML,
                        address: dataEdit.address

                    },
                    {
                        where: { id: dataEdit.id }
                    }
                )

                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Update clinic success",
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleDeleteClinic = (dataDelete) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataDelete) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let foundClinic = await db.Clinic.findOne({
                    where: { id: dataDelete },
                });
                if (!foundClinic) {
                    resolve({
                        errCode: 2,
                        message: "Clinic is not exist",
                    })
                } else {
                    await db.Clinic.destroy({
                        where: { id: dataDelete },
                    });
                    resolve({
                        errCode: 0,
                        message: "Clinic was deleted",
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetDetailClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!clinicId) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let detailClinic = await db.Clinic.findOne({
                    where: {
                        id: clinicId,
                    },
                    attributes: {
                        exclude: ['createdAt', 'updateAt'],
                    },
                });
                if (detailClinic) {
                    let doctors = await db.Doctor_Info.findAll({
                        where: {
                            clinicID: clinicId,
                        }
                    })
                    if (doctors) {
                        resolve({
                            errCode: 0,
                            message: "Get detail clinic success",
                            detailClinic: {
                                description: detailClinic.descriptionHTML,
                                introduction: detailClinic.introductionHTML,
                                doctors: doctors,
                                address: detailClinic.address,
                                name: detailClinic.name,
                                image: detailClinic.image,
                                banner: detailClinic.banner,
                            }
                        })

                    }
                }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

module.exports = {
    handleCreateClinic,
    handleGetAllClinic,
    handleEditClinic,
    handleDeleteClinic,
    handleGetDetailClinic
}