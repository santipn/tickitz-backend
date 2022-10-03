// controller = tempat dimana kita menghubungkan antara client dan database
const { query } = require('express')
const Movies = require('../model/Movies')

module.exports = {
    getAllMovies: async (req, res)=> {
        try {
            const results = await Movies.get(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getMoviesById: async (req, res)=> {
        try {
            const results = await Movies.getById(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addNewMovies: async (req, res)=> {
        try {
            const reqModifer = {
                ...req,
                body: { ...req.body, cover: req.file.filename }
            }
            const results = await Movies.add(reqModifer, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    updateMovies: async (req, res) => {
        try {
            let reqModifer = {
                ...req,
            }
            if (req.file) {
                reqModifer = {
                    ...req,
                    body: { ...req.body, cover: req.file.filename }
                }
            }
            const results = await Movies.update(reqModifer, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    deleteMovies: async(req, res)=> {
        try {
            const results = await Movies.remove(req, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    searchMovie: async (req, res)=> {
        try {
            const results = await Movies.searchMovie(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    sortMovie: async (req, res)=> {
        try {
            const results = await Movies.sortMovie(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}