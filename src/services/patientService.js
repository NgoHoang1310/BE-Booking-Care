import db from "../models";
import { sendEmail } from "./mailService";
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
let buildUrlVerify = (doctorId, token) => {
    let result = `${process.env.EMAIL_VERIFY}/verify-booking?doctorId=${doctorId}&token=${token}`;
    return result;
}

let handlePatientBooking = (dataBooking) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fieldRequire = ['email', 'name', 'phone', 'gender', 'address', 'doctorId', 'date', 'timeType'];
            let haveDatas = fieldRequire.every((field) => {
                return !!dataBooking[field];
            })
            if (!haveDatas) {
                resolve({
                    errCode: 1,
                    message: 'Missing data input'
                })
            }
            else {
                let token = uuidv4();
                await sendEmail({
                    email: dataBooking.email,
                    date: dataBooking.date,
                    name: dataBooking.name,
                    doctor: dataBooking.doctor,
                    time: dataBooking.timeString,
                    language: dataBooking.language,
                    linkVerify: buildUrlVerify(dataBooking.doctorId, token)
                });

                let data = await db.User.findOrCreate({
                    where: { email: dataBooking.email },
                    defaults: {
                        email: dataBooking.email,
                        lastName: dataBooking.name,
                        address: dataBooking.address,
                        gender: dataBooking.gender,
                        phoneNumber: dataBooking.phone,

                    }

                })

                if (data && data[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientID: data[0].id },
                        defaults: {
                            statusID: 'S1',
                            doctorID: dataBooking.doctorId,
                            patientID: data[0].id,
                            date: dataBooking.date,
                            timeType: dataBooking.timeType,
                            token: token
                        }
                    })

                }


                resolve({
                    errCode: 0,
                    message: 'Booking Success',
                    dataBooking: data
                })

            }
        } catch (error) {
            reject(error);
            console.log(error);
        }
    })
}

let handleVerifyEmailBooking = (dataVerify) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataVerify.doctorId || !dataVerify.token) {
                resolve({
                    errCode: 1,
                    message: "Missing data verify"
                })
            } else {
                let response = await db.Booking.findOne({
                    where: {
                        token: dataVerify.token,
                        doctorID: dataVerify.doctorId,
                        statusID: 'S1'
                    },
                    raw: false
                })

                if (response) {
                    response.statusID = 'S2';
                    await response.save();
                    resolve({
                        errCode: 0,
                        message: 'Confirm successful examination schedule!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Examination schedule has been confirmed!'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })

}

let handleGetAllBooking = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing data input"
                })
            } else {
                let data = await db.Booking.findAll({
                    where: { date: date, doctorID: doctorId, statusID: 'S2' },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: db.User,
                            as: 'patientData',
                            attributes: { exclude: ['id', 'firstName', 'password', 'roleID', 'positionID', 'image', 'createdAt', 'updatedAt'] },
                            include: { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                        },
                        { model: db.Allcode, as: 'bookingTimeData', attributes: ['valueEn', 'valueVi'] },
                        // { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true,
                })

                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Get all booking success",
                        dataBooking: data
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handlePatientBooking,
    handleVerifyEmailBooking,
    handleGetAllBooking
}