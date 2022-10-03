const express = require("express")

const {getAllSchedule, addNewSchedule, updateSchedule, deleteSchedule} = require('../controller/scheduleController.js')
const router = express.Router()

router.get('/', getAllSchedule)
router.post('/', addNewSchedule)
router.patch('/:idSch', updateSchedule)
router.delete('/:idSch', deleteSchedule)



module.exports = router