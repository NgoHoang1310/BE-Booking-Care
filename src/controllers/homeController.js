import crudService from "../services/crudService";
let getHomePage = async(req, res) => {
    // try {
    //     let data = await db.User.findAll();
    //     console.log(data);
    //     return res.render('homePage',{
    //         data: JSON.stringify(data),
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
    return res.render('homePage.ejs');
   
}

let getLogin = (req, res) => {
    return res.render('login.ejs');
}

let postCRUD = async(req, res) => {
    await crudService.createUser(req.body);
    console.log(req.body);
    return res.send('post crud succeed');

}
let displayData = async(req,res) => {
    let users = await crudService.readUser();
    return res.render('renderUser.ejs', {
        dataTable: users
    });
}

let editUser = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData = await crudService.findUserById(userId);
        console.log(userData);
        return res.render('editUser.ejs', {
            userInfo: userData
        });
    }else{
        return res.send('not found');
    }
}

let putUser = async (req, res) => {
     let newUser = await crudService.updateUser(req.body);
     console.log(req.body);
     return res.render('renderUser.ejs', {
        dataTable: newUser
    });
}

let deleteUser = async(req, res) => {
    let userId = req.query.id;
    if(userId) {
       await crudService.deleteUserInfo(userId);
        return res.send('delete succeed');
    }else{
        return res.send('not found');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getLogin: getLogin,
    postCRUD: postCRUD,
    displayData:displayData,
    editUser: editUser,
    putUser: putUser,
    deleteUser: deleteUser,
}