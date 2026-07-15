const {formatResult} = require('./result_format');
const PROJECT = require('../schema/project')

const FilterController = async (req, res)=>{
    console.log('FilterController called with query:', req.query);
    try {
        const filter = req.query;
        console.log('FilterController called with filter:', filter);
        const result = await PROJECT.find(filter).lean();
        res.status(200).json(formatResult(res, result, null));
        
    }catch (error) {
        res.status(500).json(formatResult(false, "An error occurred while processing the request.", null));
    }

}
module.exports = FilterController;