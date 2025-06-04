const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(__dirname));

// Set up multer for CSV uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Simple validation for CSV
  if (path.extname(req.file.originalname) !== '.csv') {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Only CSV files allowed' });
  }
  res.json({ message: 'File uploaded', filename: req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
