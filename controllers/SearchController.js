const utils = require('../utils/utils')
const axios = require('axios')

// Default values
const defaultValues = {
    "distance": 5
}

/**
 * @author Daniel Ramos
 * Function that will request the foodTrucks from the App that host the data
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.search = async (req, res, next) => {

    // Grab location
    const latitud = parseFloat(req.query.y);
    const longitud = parseFloat(req.query.x);

    // Validates and grabs radius query param
    let distance = req.query.radius;
    if (!distance) {
        distance = defaultValues.distance
    }
    
    // Parse coordinates and creates request URL
    const coordinates = utils.parseCoordinates(latitud, longitud, distance);
    const url = utils.parseSearchQueryParams(coordinates);

    // Request call
    let results = []
    try {
        results = await axios.get(url);
        return results;
    } catch(err) {
        return [];
    }
}