const uuidv5 = require('uuid/v4');
require('../globals');

const getUser = (id) => {
    return mockUsers.filter(user => user.id === id);
};

const createUser = (name) => {
    const newUser = {
        id: uuidv5(),
        name
    };
    mockUsers = [...mockUsers, newUser];
    return newUser;
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
    deleteUser
};
