const { Users, Interviews }  = require('../database/models')
const Users_data = require('../data/users')
const Interviews_data = require('../data/interviews')

const populateUsers = async users => {
    for (let i = 0; i < users.length; i++) {
        await Users.create(users[i])
    }
}

const populateInterviews = async interviews => {
    for (let i = 0; i < interviews.length; i++) {
        const int = await Interviews.create(interviews[i]);
        await int.setInterviewer(2);
        await int.setStudent(1);
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
// seedDatabase()
module.exports = seedDatabase