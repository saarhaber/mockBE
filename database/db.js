const Sequelize = require('sequelize')
// const db_name = "dftnqcdqoll5e6"
const db_name = "mockme"
console.log("Opening database connection")

// const db = new Sequelize(db_name, "vzhxabscbyteob", "17cac384ca9f13d9da66d4b107cc9559b46f498609499a0611b6af96ed2f5c17", {
//     host: 'ec2-54-243-197-120.compute-1.amazonaws.com',
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: true
//     },
//     define: {
//         timestamps: false
//     },
//     logging: false
// })

const db = new Sequelize(db_name, "","", {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false
})

module.exports = db