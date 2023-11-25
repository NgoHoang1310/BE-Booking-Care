import { raw } from "body-parser";
import db from "../models";
import { sendEmailRemery } from "./mailService";
require('dotenv').config();
import _, { isEmpty } from "lodash";
const MAX_SCHEDULE_NUMBER = process.env.MAX_SCHEDULE_NUMBER;

let handleGetOutstandingDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: { roleID: 'R2' },

                attributes: {
                    exclude: ['password'],
                },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,
            })
            if (data) {
                resolve({
                    errCode: 0,
                    message: "Get doctor success",
                    doctors: data,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Get doctor failed",
                    doctors: data,
                })
            }
        } catch (error) {
            reject(error);
            console.log('lỗi');
        }
    })
}

let handleGetAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: { roleID: 'R2' },
                attributes: {
                    exclude: ['password', 'image'],
                },
            })
            if (data) {
                resolve({
                    errCode: 0,
                    message: "Get doctor success",
                    doctors: data,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Get doctor failed",
                    doctors: data,
                })
            }
        } catch (error) {
            reject(error);
            console.log('lỗi');
        }
    })
}

let handleSaveInfoDoctor = (inforDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inforDoctor.action || !inforDoctor.id || !inforDoctor.contentHTML || !inforDoctor.contentMarkdown
                || !inforDoctor.description || !inforDoctor.clinicName || !inforDoctor.addressClinic
                || !inforDoctor.price || !inforDoctor.payment || !inforDoctor.province || !inforDoctor.specialty || !inforDoctor.clinic) {
                resolve({
                    errCode: 1,
                    message: "Missing data doctor input",
                })
            } else {
                if (inforDoctor.action === 'EDIT') {
                    await db.Markdown.update({
                        contentHTML: inforDoctor.contentHTML,
                        contentMarkdown: inforDoctor.contentMarkdown,
                        description: inforDoctor.description
                    }, {
                        where: { doctorId: inforDoctor.id },
                    })

                } else {
                    await db.Markdown.create({
                        doctorId: inforDoctor.id,
                        contentHTML: inforDoctor.contentHTML,
                        contentMarkdown: inforDoctor.contentMarkdown,
                        description: inforDoctor.description
                    })
                }


                let checkDoctorInfo = await db.Doctor_Info.findOne({
                    where: { doctorID: inforDoctor.id },
                    attributes: {
                        exclude: ['UserId'],
                    },
                    raw: false,
                })
                console.log(checkDoctorInfo);
                if (checkDoctorInfo) {
                    await db.Doctor_Info.update({
                        priceID: inforDoctor.price.value,
                        provinceID: inforDoctor.province.value,
                        paymentID: inforDoctor.payment.value,
                        specialtyID: inforDoctor.specialty.value,
                        clinicID: inforDoctor.clinic.value,
                        addressClinic: inforDoctor.addressClinic,
                        nameClinic: inforDoctor.clinicName,
                        note: inforDoctor.note,
                    }, {
                        where: { doctorId: inforDoctor.id },
                    })
                } else {
                    await db.Doctor_Info.create({
                        doctorID: inforDoctor.id,
                        priceID: inforDoctor.price.value,
                        provinceID: inforDoctor.province.value,
                        paymentID: inforDoctor.payment.value,
                        specialtyID: inforDoctor.specialty.value,
                        clinicID: inforDoctor.clinic.value,
                        addressClinic: inforDoctor.addressClinic,
                        nameClinic: inforDoctor.clinicName,
                        note: inforDoctor.note,
                    })
                }

                resolve({
                    errCode: 0,
                    message: "Save information doctor success",
                })
            }


        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

let handleGetDetailDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing doctor id",
                })
            } else {
                let data = await db.User.findOne({
                    where: { roleID: 'R2', id: doctorId },
                    attributes: {
                        exclude: ['password'],
                    },
                    order: [['createdAt', 'DESC']],
                    include: [
                        { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        {
                            model: db.Doctor_Info,
                            attributes: ['priceID', 'specialtyID', 'paymentID', 'provinceID', 'addressClinic', 'nameClinic', 'note'],
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                                // { model: db.Speciality },

                            ]
                        }
                    ],
                    raw: true,
                    nest: true,
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Get detail doctor success",
                        detailDoctor: data,
                    })
                }
            }
        } catch (error) {
            reject(error);
            console.log(error);
        }
    })
}

let handleCreateSchedule = (dataSchedule) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (dataSchedule && dataSchedule.length > 0) {
                dataSchedule = dataSchedule.map((item) => {
                    item.maxNumber = MAX_SCHEDULE_NUMBER;
                    return item;
                })
                //check tồn tại data
                let existSchedule = await db.Schedule.findAll({
                    where: { doctorID: dataSchedule[0].doctorID },
                    attributes: ['doctorID', 'maxNumber', 'date', 'timeType']
                })
                //format lại data
                if (existSchedule && existSchedule.length > 0) {
                    existSchedule = existSchedule.map((item) => {
                        item.date = new Date(1673370000000).getTime();
                        return item;
                    })

                    //kiểm tra tồn tại
                    let toCreate = _.differenceWith(dataSchedule, existSchedule, (a, b) => {
                        return a.timeType === b.timeType && a.date === b.date;
                    });
                    console.log(toCreate);
                    if (toCreate && toCreate.length > 0) {
                        await db.Schedule.bulkCreate(toCreate);
                        resolve({
                            errCode: 0,
                            message: "Success",
                            data: dataSchedule
                        })
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Schedule was existed",
                        })
                    }
                } else {
                    await db.Schedule.bulkCreate(dataSchedule);
                    resolve({
                        errCode: 0,
                        message: "Success",
                        data: dataSchedule
                    })

                }
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            }
        } catch (error) {
            reject(error);
        }
    })

}

let handlegetScheduleByDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: { doctorID: doctorId, date: date },
                    include: [
                        { model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi'] },

                    ],
                    raw: true,
                    nest: true
                })
                console.log(dataSchedule);
                if (dataSchedule) {
                    resolve({
                        errCode: 0,
                        message: "Success",
                        dataSchedule: dataSchedule
                    })
                }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })

}

let handleGetExtraDoctorInfo = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing doctor id",
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: { doctorID: doctorId },
                    attributes: {
                        exclude: ['id', 'doctorID', 'priceID', 'provinceID', 'paymentID', 'createdAt', 'updatedAt'],
                    },

                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },

                    ],
                    raw: true,
                    nest: true,
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Get extra info doctor success",
                        extraInfoDoctor: data,
                    })
                }
            }
        } catch (error) {
            reject(error);
            console.log(error);
        }
    })
}

let handleGetProfileDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing doctor id",
                })
            } else {
                let data = await db.User.findOne({
                    where: { roleID: 'R2', id: doctorId },
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt'],
                    },
                    order: [['createdAt', 'DESC']],
                    include: [
                        { model: db.Markdown, attributes: ['description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Info,
                            attributes: ['priceID', 'paymentID', 'provinceID', 'addressClinic', 'nameClinic', 'note'],
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },


                            ]
                        }
                    ],
                    raw: true,
                    nest: true,
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Get detail doctor success",
                        detailDoctor: data,
                    })
                }
            }
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}

let handleConfirmRemedy = (dataRemedy) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(dataRemedy.imageBase64);
            if (isEmpty(dataRemedy)) {
                resolve({
                    errCode: 1,
                    message: "Missing data input"
                })
            } else {
                await sendEmailRemery(dataRemedy);
                let response = await db.Booking.findOne({
                    where: {
                        doctorID: dataRemedy.doctorId,
                        patientID: dataRemedy.patientId,
                        statusID: 'S2'
                    },
                    raw: false
                })

                if (response) {
                    response.statusID = 'S3';
                    await response.save();
                    resolve({
                        errCode: 0,
                        message: 'Confirm remedy successful !'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleGetOutstandingDoctor,
    handleGetAllDoctor,
    handleSaveInfoDoctor,
    handleGetDetailDoctor,
    handleCreateSchedule,
    handlegetScheduleByDoctor,
    handleGetExtraDoctorInfo,
    handleGetProfileDoctor,
    handleConfirmRemedy
}