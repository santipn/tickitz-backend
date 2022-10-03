const express = require('express')
const {getAllUsers, addNewUser, updateUser, deleteUser, searchUser, sortUser} = require('../controller/userController')
const router = express.Router()

// router.use('/', (req, res, next)=> {
//     if(req.query.username) {
//         router.get('/', searchUser)
//         next()
//     } else (req.query.order) {
//         router.get('/', sortUser)
//         next()
//     }
// })

router.get('/', getAllUsers)
router.post('/', addNewUser)
router.patch('/:idMovie', updateUser)
router.delete('/:idMovie', deleteUser)



module.exports = router