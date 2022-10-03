// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/dbConnection.js')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
 //       const {dateTime='', place=''} = req.query
        const sql = 'SELECT * FROM `user`'
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from user success",
            status: 200,
            data: results
          })
        })
      })
    },
    getById: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {idUser} = req.params
        const sql = `SELECT * FROM user WHERE idUser=${idUser}`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get user by id success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {username, fullName, email} = req.body
        db.query(`INSERT INTO user(username, fullName, email) VALUES ('${username}','${fullName}','${email}')`, 
        (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new user success",
            status: 200,
            // data: {
            //   id: results.insertId,
            //   ...req.body,
            // }
            data: results
          })
        })
      })
    },
    update: (req, res) => {
      return new Promise((resolve, reject)=> {
        const {idSch} = req.params
        db.query(`SELECT * FROM user WHERE idUser=${idUser}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {username, fullName, email} = previousData
      
          db.query(`UPDATE user SET username='${username}', fullname='${fullName}', email='${email}' 
          WHERE idUser=${idUser}`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update user success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {idUser} = req.params
        db.query(`DELETE FROM user where idUser=${idUser}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete user success",
            status: 200,
            data: results
          })
        })
      })
    },

    searchUser: (req, res)=> {
        return new Promise((resolve, reject)=> {
        //const {title='', director=''} = req.query
          const sql = `SELECT * FROM user WHERE username LIKE '%${username}%' ` 
          db.query(sql,(err, results)=> {
            console.log(title)
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "search success",
              status: 200,
              data: results
            })
          })
        })
      },
      sortUser: (req, res)=> {
        return new Promise((resolve, reject)=> {
          const sql = `SELECT * FROM user ORDER BY ${req.query.order} ASC` 
          db.query(sql,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "sort movies success",
              status: 200,
              data: results
            })
          })
        })
      }

}
