// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require("../helper/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
module.exports = {
  login: (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    return new Promise((resolve, reject) => {

      db.query(
        `SELECT idUser, password, role FROM user WHERE email='${email.toLowerCase()}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: "ada error" });
          } else {
            if(!results.length) {
              reject({message: "Email/Password Salah."})
            } else {
              bcrypt.compare(password, results[0].password, (errHashing, successHashing) => {
                if(errHashing) {reject({message: "Ada Masalah Saat Login, Harap coba lagi."})} //bycript error, tampilin ke user seolah2
                if(successHashing) {
                  const token = jwt.sign({ user_id: results[0].idUser, role: results[0].role}, process.env.JWT_SECRET_KEY);
                  console.log(process.env.JWT_SECRET_KEY)
                  resolve({
                    message: "login success",
                    status: 200,
                    data: {
                      token,
                      user_id: results[0].idUser
                    },
                  });
                }else {reject({message: "Email/Password Salah."})}
              });
            }
          }
        }
      );
    });
  },
  register: (req, res) => {
    const { username, password, firstName, lastName, fullName, email, phone, image } = req.body;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hashedPassword) {
        if (err) {
          reject({ message: "ada error" });
        } else {
          db.query(
            `INSERT INTO user(username, password, firstName, lastName, fullName, email, phone, 
            image) VALUES('${username}', '${hashedPassword}', '${firstName}', '${lastName}', '${fullName}', '${email}', 
            '${phone}', '${image}')`,
            (err, results) => {
              if (err) {
                reject({ message: "Email already in use" });
              }
              resolve({
                message: "register success",
                status: 201,
                data: results,
              });
            }
          );
        }
      });
    });
  },
};