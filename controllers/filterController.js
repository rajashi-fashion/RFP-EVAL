const {formatResult} = require('./result_format');
const PROJECT = require('../schema/project')

const FilterController = async (req, res)=>{
    try {
        const { filter } = req.query;
        const result = await PROJECT.find({ category: filter }).limit(4);
        res.status(200).json(formatResult(res, result, null));
        
    }catch (error) {
        res.status(500).json(formatResult(false, "An error occurred while processing the request.", null));
    }

}
module.exports = FilterController;