const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const path = require('path');
const multer = require('multer');

const { register, login } = require('./controllers/auth');
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const { verifyToken } = require('./middleware/auth');
const { createPost } = require('./controllers/posts');

/* CONFIGURATIONS */
dotEnv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors());

app.use("/assets", express.static('public/assets'));


// File Storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


app.post('/auth/register', upload.single('picture'), register);
app.post('/auth/login', login);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

app.use('/users', userRoutes);
app.use('/posts', postRoutes);


// Mongoose Setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_CONNECT).then(() => {
    app.listen(PORT, () => console.log('server listning on PORT: ', PORT));
}).catch((error) => {
    console.log('failed to connect :', error);
});
