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
        // id: uuidv5(),
        name,
        email
    };
    // mockUsers = [...mockUsers, newUser];
    const newUserId = await dbClient.createUser(newUser);
    return newUserId;
};

const updateUser = (id, updateConfig) => {
    // find the user
    let userToUpdate = mockUsers.find(user => user.id === id);
    // update the user object
    userToUpdate = {
        id: userToUpdate.id,
        name: updateConfig.name,
        metadata: updateConfig.metadata
    };
    // create the new collection
    mockUsers = mockUsers.filter(user => user.id !== userToUpdate);
    mockUsers = [...mockUsers, userToUpdate];
    // return the updated user
    return userToUpdate;
};

const deleteUser = (id) => {
    const userToDelete = mockUsers.find(user => user.id === id);
    mockUsers = mockUsers.filter(user => user.id !== userToDelete.id);
    return userToDelete;
};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
};