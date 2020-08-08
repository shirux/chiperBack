exports.validateSearch = (req, res, next) => {
    const latitud = req.query.y;
    const longitud = req.query.x;

    // Case where no parameters exist
    if (!latitud || !longitud) {
        const err = new Error('Missing parameters');
        next(err);
    }

    // Case where latitude is not a number
    if (isNaN(latitud)) {
        const err = new Error('Latitud is not a number');
        next(err);
    }
    
    // Case where longitud is not a number
    if(isNaN(longitud)) {
        const err = new Error('Longitude is not a number');
        next(err);
    }

    // Case where Latitude is not within a valid range
    if (latitud < -90 || latitud > 90) {
        const err = new Error('Latitud is not in a valid range');
        next(err);
    }

    // Case where Longitude is not within a valid range
    if (longitud > 180 || longitud < -180) {
        const err = new Error('Longitude is not in a valid range');
        next(err);
    }
    
    next();
}