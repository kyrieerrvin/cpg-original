const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');  // Directory to save uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // File naming convention
    }
});

const upload = multer({ storage: storage });

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to serve root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'articles.html'));
});

// Handle file upload
app.post('/upload', upload.array('files', 10), (req, res) => {
    const files = req.files;

    console.log('Files:', files);

    // Respond with details of the uploaded files
    res.json({
        message: 'Files uploaded successfully',
        files: files.map(file => ({
            filename: file.filename,
            path: `/uploads/${file.filename}`,  // Path to be used to access the uploaded file
            size: file.size
        }))
    });
});

// Ensure uploads directory exists
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
