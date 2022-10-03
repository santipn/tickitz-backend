const express = require('express')
const {getAllMovies, getMoviesById, addNewMovies, updateMovies, deleteMovies, searchMovie, sortMovie} = require('../controller/moviesController.js')
const router = express.Router()
const authVerify = require('../helper/authVerify')
const upload = require('../helper/multer')

// router.use('/', (req, res, next)=> {
//     if(req.query.title) {
//         router.get('/', searchMovie)
//         next()
//     } else (req.query.order) {
//         router.get('/', sortMovie)
//         next()
//     }
// })


router.get('/', getAllMovies)
router.get('/:idMovie', getMoviesById)
router.post('/', authVerify, upload, addNewMovies)
router.patch('/:idMovie', authVerify, upload, updateMovies)
router.delete('/:idMovie', deleteMovies)



module.exports = router