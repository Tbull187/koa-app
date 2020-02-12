const uuidv5 = require('uuid/v4');
const dbClient = require('./db-client');
require('../globals');

const getUser = async (id) => {
    const user = await dbClient.getUserById(id);
    // Handle errors, etc
    return user;
};

const getAllUsers = async () => {
    const users = await dbClient.getAllUsers();
    return users;
};

const createUser = async (name, email) => {
    const newUser = {
        // id: uuidv5(), // database handles the identifier for now
        name,
        email
    };
    const newUserId = await dbClient.createUser(newUser);
    return newUserId;
};

const updateUser = async (id, name, email) => {
    const returnId = await dbClient.updateUser(id, name, email);
    return returnId;
};

const deleteUser = async (id) => {
    // const userToDelete = mockUsers.find(user => user.id === id);
    // mockUsers = mockUsers.filter(user => user.id !== userToDelete.id);
    // return userToDelete;
    await dbClient.deleteUser(id);
};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
};
