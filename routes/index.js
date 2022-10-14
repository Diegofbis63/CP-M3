'use strict'

const models = require('../models/model')
const express = require('express')
// const { response } = require('../app')

const router = express.Router();
module.exports = router;

// Escriban sus rutas acá

router.get("/users", (req, res) => {
	const result = models.listUsers();
	res.status(200).json(result);
});

router.post("/users", (req, res) => {
	try {
		const { email, name } = req.body;
		const result = models.addUser(email, name);
		res.status(201).json({ msg: result });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.patch("/users/plan", (req, res) => {
	try {
		const { user } = req.query;
		const result = models.switchPlan(user);
		res.status(200).json({ msg: result });
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

router.get("/series", (req, res) => {
	const result = models.listSeries();
	res.status(200).json(result);
});

router.post("/series", (req, res) => {
	try {
		const { name, seasons, category, year } = req.body;
		const result = models.addSerie(name, seasons, category, year);
		res.status(201).json({ msg: `La serie ${name} fue agregada correctamente` });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get("/series/:category", (req, res) => {
    try {
        
        const {category }= req.params;
        const result = models.listSeries(category);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });

    }
});

router.get("/play/:serie", (req, res) => {
    try {
        
        const {serie }= req.params;
        const {user}= req.query;
        const result = models.play(serie,user);
        res.status(200).json({ msg: result});
    } catch (error) {
        res.status(404).json({ error: error.message });

    }
});

router.get("/watchAgain", (req, res) => {
    try {
        
       
        const {user}= req.query;
        const result = models.watchAgain(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });

    }
});

router.post("/rating/:serie", (req, res) => {
	try {
		const {serie } = req.params;
		const { email, score} = req.body;
		const result = models.rateSerie(serie, email, score)
		res.status(200).json({ msg:result });
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

// Siéntanse libres de dividir entre archivos si lo necesitan

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.