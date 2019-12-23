const path = require('path');

global.__path = {
    root: __dirname,
    dist: path.join(__dirname, '../dist'),
    middleware: path.join(__dirname, 'middleware'),
    routes: path.join(__dirname, 'routes'),
    services: path.join(__dirname, 'services'),
    utils: path.join(__dirname, 'utils'),
    views: path.join(__dirname, 'views')
};

// Could define global error messages here

// Mock Data
global.mockUsers = [
    {
        id: '1',
        name: 'user1',
        metadata: 'default'
    },
    {
        id: '2',
        name: 'user2',
        metadata: 'default'
    },
    {
        id: '3',
        name: 'user3',
        metadata: 'default'
    }
];
