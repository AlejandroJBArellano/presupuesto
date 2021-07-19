require("dotenv").config();
const { URI } = process.env;
module.exports = {
    mongodb: {
        URI: `${URI}`
    }
}