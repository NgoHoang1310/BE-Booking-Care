import db from "../models";

let handleCreateHandbook = (dataCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataCreate.title || !dataCreate.image ||
                !dataCreate.author || !dataCreate.release ||
                !dataCreate.descriptionMarkdown ||
                !dataCreate.descriptionHTML) {
                resolve({
                    errCode: 1,
                    message: "Missing data handbook input",
                })
            } else {
                let data = await db.Handbook.create({
                    title: dataCreate.title,
                    image: dataCreate.image,
                    author: dataCreate.author,
                    release: dataCreate.release,
                    descriptionHTML: dataCreate.descriptionHTML,
                    descriptionMarkdown: dataCreate.descriptionMarkdown,
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Create Handbook success"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbooks = await db.Handbook.findAll();
            if (handbooks) {
                resolve({
                    errCode: 0,
                    message: "Get all handbook success",
                    handbooks: handbooks
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleEditHandbook = (dataEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataEdit.id || !dataEdit.title ||
                !dataEdit.image || !dataEdit.author || !dataEdit.descriptionHTML ||
                !dataEdit.descriptionMarkdown ||
                !dataEdit.release
            ) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let data = await db.Handbook.update(
                    {
                        title: dataEdit.title,
                        image: dataEdit.image,
                        author: dataEdit.author,
                        release: dataEdit.release,
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
                        message: "Update handbook success",
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleDeleteHandbook = (dataDelete) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataDelete) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let foundHandbook = await db.Handbook.findOne({
                    where: { id: dataDelete },
                });
                if (!foundHandbook) {
                    resolve({
                        errCode: 2,
                        message: "Handbook is not exist",
                    })
                } else {
                    await db.Handbook.destroy({
                        where: { id: dataDelete },
                    });
                    resolve({
                        errCode: 0,
                        message: "Handbook was deleted",
                    })
                }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

let handleGetDetailHandbook = (handbookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!handbookId) {
                resolve({
                    errCode: 1,
                    message: "Missing data input",
                })
            } else {
                let detailHandbook = await db.Handbook.findOne({
                    where: {
                        id: handbookId,
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                });
                if (detailHandbook) {
                    resolve({
                        errCode: 0,
                        message: "Get detail clinic success",
                        detailHandbook: detailHandbook
                    })

                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleCreateHandbook,
    handleGetAllHandbook,
    handleEditHandbook,
    handleDeleteHandbook,
    handleGetDetailHandbook
}