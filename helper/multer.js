const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
}) 

const imgFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
        return cb(new Error('File Must be an Image!'), 'test')
    }
    cb(null, true)
}

const limits = {
    fileSize: 1 * 1024 * 1024
}

const uploadMovies = multer({
    storage: storage,
    fileFilter: imgFilter,
    limits: limits
}).single('cover')

const upload = (req, res, next) => {
    uploadMovies(req, res, (err) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            })
        } else if (err) {
            return res.json({
                success: false,
                message: 'Failed to Upload Image!'
            })
        }
        next()
    })
}

module.exports = upload