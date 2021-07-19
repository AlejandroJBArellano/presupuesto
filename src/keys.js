require("dotenv").config();
const { URI } = process.env;
module.exports = {
    mongodb: {
        URI: `${URI}`
        // URI: `mongodb+srv://alejandro_arellano:2011exitos88@budgetdb.rzykq.mongodb.net/budgetdb?retryWrites=true&w=majority`
    }
}