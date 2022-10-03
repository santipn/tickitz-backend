// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/dbConnection.js')
const fs = require('fs')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      // const limit = req.query.limit
      const { limit = 7, page = 1 } = req.query
      // const page  = req.query.page
      // console.log (req.query.page)
      const offset = (page - 1) * limit;
      const sql = `SELECT * FROM movies LIMIT ${limit} OFFSET ${offset} `;

      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({
            message: "Ada error",
          });
        } else {
          db.query(`SELECT idMovie from movies`, (err, result) => {
            if (err) {
              console.log(err)
              reject({
                message: "Ada error"
              })
            } else {
              totalPage = Math.ceil(result.length / limit)
              if (page > totalPage) {
                reject({
                  message: "Page not found!",
                  status: 404,
                  data: []
                })
              }
              resolve({
                message: "Get all from movies success",
                status: 200,
                data: {
                  totalRow: results.length,
                  totalPage: totalPage,
                  results: results
                },
              });
            }
          })
        }
      });
    });
  },
  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { idMovie } = req.params
      const sql = `SELECT * FROM movies WHERE idMovie='${idMovie}'`
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: "ada error" })
        }
        resolve({
          message: "get all movies by id success",
          status: 200,
          data: results
        })
      })
    })
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { title, cover, releaseDate, director, synopsis, duration, casts, categories } = req.body
      console.log(req.body, 'ngeeeeeng')
      db.query(`INSERT INTO movies(title, cover, releaseDate, director, synopsis, duration, casts, categories) VALUES ('${title}','${cover}','${releaseDate}','${director}','${synopsis}','${duration}','${casts}','${categories}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: "ada error" })
          }
          resolve({
            message: "add new movies success",
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
    return new Promise((resolve, reject) => {
      const { idMovie } = req.params
      db.query(`SELECT * FROM movies where idMovie=${idMovie}`, (err, results) => {
        if (err) { res.send({ message: "ada error" }) }

        const previousData = {
          ...results[0],
          ...req.body
        }
        const { title, cover, releaseDate, director, synopsis, duration, casts, categories } = previousData

        const tempImg = results[0].cover
        console.log(tempImg)
        if (req.body.cover) {
          fs.unlink(`uploads/${tempImg}`, function (err) {
            if (err) {
              reject({
                message: "ada error",
              })
              console.log(err)
            }
          })
        }

        db.query(`UPDATE movies SET title='${title}', cover='${cover}', releaseDate='${releaseDate}', director='${director}', synopsis='${synopsis}', duration='${duration}', casts='${casts}', categories='${categories}' WHERE idMovie=${idMovie}`, (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: "ada error" })
          }
          resolve({
            message: "update movies success",
            status: 200,
            data: results
          })
        })

      })
    })
  },
  remove: (req, res) => {
    // delete done
    return new Promise((resolve, reject) => {
      const { idMovie } = req.params;
      db.query(`SELECT cover FROM movies WHERE idMovie=${idMovie}`, (err, results) => {
        if (!results.length) {
          reject({ message: "Data id not found" });
        } else {
          const tempImg = results[0].cover
          db.query(
            `DELETE FROM movies WHERE idMovie=${idMovie}`,
            (err, results) => {
              if (err) {
                console.log(err);
                reject({ message: "Something wrong" });
              }
              fs.unlink(`uploads/${tempImg}`, function (err) {
                if (err) {
                  resolve({
                    message: "Delete movies success",
                    status: 200,
                    data: results,
                  });
                }
                resolve({
                  message: "Delete movies success",
                  status: 200,
                  data: results,
                });
              })
            }
          );
        }
      })
    });
  },

  searchMovie: (req, res) => {
    return new Promise((resolve, reject) => {
      const { title = '' } = req.query
      const sql = `SELECT * FROM movies WHERE title LIKE '%${title}%' `
      db.query(sql, (err, results) => {
        console.log(title)
        if (err) {
          console.log(err)
          reject({ message: "ada error" })
        }
        resolve({
          message: "search success",
          status: 200,
          data: results
        })
      })
    })
  },
  sortMovie: (req, res) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM movies ORDER BY ${req.query.order} ASC`
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: "ada error" })
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
