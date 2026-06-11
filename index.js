const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const app = express();
const path = require('path');
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');
const port = 8080;
app.use(helmet());
const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);   
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const _router = express.Router();
const { chatAIModel } = require('./agents/chatAIModel');
const { fileEvalModel } = require('./agents/fileEvalModel');
// const NestedRoute = require('./routers/index');
const {formatResult} = require('./controllers/result_format');

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Configure Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generates a unique filename while preserving the original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 3. Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
});

app.get('/', (req, res) => {
    res.json(formatResult(res, 'Welcome to the API', null));
});

// _router.post('/eval', async (req, res) => {
//     const { message } = req.body;
//     const prompt = await chatAIModel(message);
//     res.json({ result: prompt });
// });
// _router.post('/file-eval', upload.array('files'), async (req, res) => {
//     console.log("Received file evaluation request with body:", req.files);
//     const  _files  = req.files;

//     const prompt = await fileEvalModel(_files);
//     res.json({ result: prompt });
// });

app.use('/api', require('./routers/index'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

