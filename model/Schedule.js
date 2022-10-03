// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/dbConnection.js')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {dateTime='', place=''} = req.query
        const sql = 'SELECT * FROM `schedule`'
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from schedule success",
            status: 200,
            data: results
          })
        })
      })
    },
    getById: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {idSch} = req.params
        const sql = `SELECT * FROM schedule WHERE idSch=${idSch}`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all schedule by id success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {dateTime, place, cinema, logo, showtime, price} = req.body
        db.query(`INSERT INTO schedule(dateTime, place, cinema, logo, showtime, price) VALUES ('${dateTime}','${place}','${cinema}','${logo}','${showtime}','${price}')`, 
        (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new schedule success",
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
        db.query(`SELECT * FROM schedule where idSch=${idSch}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {dateTime, place, cinema, logo, showtime, price} = previousData
      
          db.query(`UPDATE schedule SET dateTime='${dateTime}', place='${place}', cinema='${cinema}', logo='${logo}', showtime='${showtime}', price='${price}' WHERE idSch=${idSch}`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update schedule success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {idSch} = req.params
        db.query(`DELETE FROM schedule where idSch=${idSch}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete schedule success",
            status: 200,
            data: results
          })
        })
      })
    }
}
