const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolygonSchema = new Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
      },
      coordinates: {
        type: [[[Number]]], 
        required: true
      }


})

module.exports = mongoose.model('Polygon', PolygonSchema);   