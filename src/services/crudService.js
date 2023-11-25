import db from "../models/index";

const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        address: data.address,
        gender: data.gender,
        roleID: data.role,
      })
      resolve();
      // console.log(resolve());
    } catch (error) {
      reject(error)
    }
  }).then(function () {
    console.log('ok succeed');
  })
}

const readUser = async(data) => {
return new Promise((resolve, reject) => {
  try {
    let users = db.User.findAll({
      raw: true
    });
    resolve(users);
  } catch (error) {
    reject(error);
  }
})
}

const findUserById =  (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: {id: userId},
          raw: true,
        })
        if(user) {
          resolve(user);
        }else{
          resolve({});
        }
      } catch (error) {
        reject(error);
      }
    })
}

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        address: data.address,
        gender: data.gender,
        roleID: data.role,
      }, {
        where: {id: data.id}
      })
     let allUser = await db.User.findAll({
        raw: true,
      })
      resolve(allUser);
    } catch (error) {
      reject(error);
    }
  })
}

const deleteUserInfo = (userId) => {
  return new Promise( async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: {id: userId}
      })
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  createUser: createUser,
  readUser: readUser,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteUserInfo: deleteUserInfo,
}