const router = require('express').Router();
const SearchController = require('../controllers/SearchController');
const SearchValidator = require('../validators/SearchValidator');

// GET /SearchForm/
router.get('/', SearchValidator.validateSearch, async (req, res) => {
    try {
        let response = await SearchController.search(req, res)
        response = response.data;
        if (response) {
            res.send(response)
        } else {
            res.send([])
        }
    } catch(err) {
        res.json({message: err})
    }
});

module.exports = router;