/// <reference path="../../../typings/node/node.d.ts" />
'use strict';
// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        //uri: 'mongodb://nescafe:ohmygithub@52.3.181.23:27017/ohmygithub-dev/'
        // Modified by Tak
        uri: 'mongodb://localhost:27017/ohmygithub-dev/'
    },
    seedDB: true
};
