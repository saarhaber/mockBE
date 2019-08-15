const Users = require('./database/models/users')
const Users_data = require('./data/users')
const Interviews = require('./database/models/interviews')
const Interviews_data = require('./data/interviews')

const populateUsers = users => {
    for (let i = 0; i < users.length; i++) {
        Users.create(users[i])
    }
}

const populateInterviews = interviews => {
    for (let i = 0; i < interviews.length; i++) {
        Interviews.create(interviews[i])
    }
}

const seedDatabase = async () => {
    try {
        await populateUsers(Users_data)
        console.log("Database seeded with users")
        await populateInterviews(Interviews_data)
        console.log("Database seeded with interviews")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = seedDatabase