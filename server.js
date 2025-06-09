const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

app.use(cors());
// Serve static files from root directory
app.use(express.static(__dirname));

// Set up multer for CSV uploads
const upload = multer({ dest: UPLOAD_DIR });

app.post('/api/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Simple validation for CSV
    if (path.extname(req.file.originalname) !== '.csv') {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: 'Only CSV files allowed' });
    }
    res.json({ message: 'File uploaded', filename: req.file.filename });
    await fs.unlink(req.file.path);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
