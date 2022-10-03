// controller = tempat dimana kita menghubungkan antara client dan database
const Booking = require('../model/User')

module.exports = {
    getAllUsers: async (req, res)=> {
        try {
            const results = await Booking.get(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getUsersById: async (req, res)=> {
        try {
            const results = await User.getById(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addNewUser: async (req, res)=> {
        try {
            const results = await Booking.add(req, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    updateUser: async(req, res) => {
        try {
            const results = await Booking.update(req, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    deleteUser: async(req, res)=> {
        try {
            const results = await Booking.remove(req, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    searchUser: async (req, res)=> {
        try {
            const results = await User.searchUser(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    sortUser: async (req, res)=> {
        try {
            const results = await User.sortUser(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}