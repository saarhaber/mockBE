const Users = require('./database/models/users')
const Users_data = require('./data/users')

const populateUsers = users => {
    for (let i = 0; i < users.length; i++) {
        Users.create(users[i])
    }
}

const seedDatabase = async () => {
    try {
        await populateUsers(Users_data)
        console.log("Database seeded with users")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = seedDatabase