require('dotenv').config()

/**
 * @author Daniel Ramos
 * Function that parse Coordinates within our planet according to latitud, longitud and distance arguments
 * @param {*} latitud  Latitude coordinates (Y axis)
 * @param {*} longitud Longitude coordinates (X axis)
 * @param {*} distance Radius where must be parsed coordinates
 * @returns {object} Coordinates to search
 */
exports.parseCoordinates = (latitud, longitud, distance) => {
    
    // Info 
    const radian = process.env.RADIAN;
    const Ydistance = process.env.LATITUDE;
    const Xdistance = process.env.LONGITUDE * Math.cos(latitud/radian);

    // Delta
    const yDelta = distance / Ydistance;
    const xDelta = distance / Xdistance;

    
    // Calculates coordinates
    const coordinates = {}
    const minY = latitud - yDelta
    const maxY = latitud + yDelta
    const minX = longitud - xDelta
    const maxX = longitud + xDelta

    // validates coordinates 
    coordinates.minY = minY < -90 ? -90 : minY;
    coordinates.maxY = maxY > 90 ? 90 : maxY;
    coordinates.minX = minX < -180 ? minX + 360 : minX;
    coordinates.maxX = maxX > 180 ? maxX - 360 : maxX;

    return coordinates;
}

/**
 * @author Daniel Ramos
 * Function that will encodeURI request url with query parameters
 * @param {*} coordinates Coordinates to filter
 */
exports.parseSearchQueryParams = coordinates => {
    const { minY, minX, maxX, maxY } = coordinates;
    let parsedURL = `${process.env.API_URL}?$where=latitude>${minY} AND latitude<${maxY} AND longitude>${minX} AND longitude<${maxX}&facilitytype=Truck`;
    return encodeURI(parsedURL);
}
