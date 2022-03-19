const Points = require('../model/point');
const Polygons = require('../model/polygon');

async function postPoint(req, res) {

    try {
        console.log("Criando point")
        const point = await Points.create(req.body);
        return res.status(201).send({message: "Ponto adicionado com sucesso"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({error:'Erro ao criar ponto'});
    }
}

async function getPoint(req, res) {

    try{
        var allPoints = await Points.find({})
        return res.send(allPoints)
    }catch (err) {
        console.log(err);
        return res.status(500).send({error:'Erro ao dar get pontos'})
    }
}

async function postPolygon(req, res) {

    try {
        console.log("Criando poligono")
        const polygon = await Polygons.create(req.body);
        return res.status(201).send({message: "Poligono adicionado com sucesso"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({error:'Erro ao criar poligono'});
    }
}

async function getPolygon(req, res) {

    try{
        var allPolygons = await Polygons.find({})
        return res.send(allPolygons)
    }catch (err) {
        console.log(err);
        return res.status(500).send({error:'Erro ao dar get poligonos'})
    }
}
module.exports = {postPoint,getPoint,postPolygon,getPolygon}