require('dotenv').config();

const serverPort =  5000;

const jwtSecretToken = process.env.ACCESS_TOKEN

module.exports = {

    jwtSecretToken
}