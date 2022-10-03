// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/dbConnection.js')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT user.fullName, user.email, user.phone, movies.title, schedule.dateTime, booking.cinema, booking.numberOfTicket, booking.totalPayment, booking.paymentMethod 
        FROM booking INNER JOIN user ON booking.idUser=user.idUser
        INNER JOIN schedule ON booking.idSch=schedule.idSch
        INNER JOIN movies ON booking.idMovie=movies.idMovie`
        db.query(sql,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "get all booking success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {cinema, numberOfTicket, totalPayment, paymentMethod} = req.body
        db.query(`INSERT INTO booking(cinema, numberOfTicket, totalPayment, paymentMethod) VALUES ('${cinema}','${numberOfTicket}','${totalPayment}', '${paymentMethod}')`, 
        (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new booking success",
            status: 200,
          })
        })
      })
    },
    update: (req, res) => {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT * FROM booking where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {idMovie, idUser, idSch, cinema, numberOfTicket, totalPayment, paymentMethod} = previousData
      
          db.query(`UPDATE booking SET idMovie='${idMovie}', idUser='${idUser}', idSch='${idSch}', cinema='${cinema}', numberOfTicket='${numberOfTicket}', totalPayment='${totalPayment}', paymentMethod='${paymentMethod}' WHERE id=${id}`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update booking success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`DELETE FROM booking where id=${id}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete booking success",
            status: 200,
            data: results
          })
        })
      })
    }
}