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

// Set up multer for CSV uploads with file size limit (10MB)
const upload = multer({
  dest: UPLOAD_DIR,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

app.post('/api/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Simple validation for CSV
    if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: 'Only CSV files allowed' });
    }

    // Delete file after processing (fire and forget - don't block response)
    fs.unlink(req.file.path).catch(err => console.error('Failed to delete file:', err));

    res.json({ message: 'File uploaded', filename: req.file.filename });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);

  // Check if headers were already sent
  if (res.headersSent) {
    return next(err);
  }

  // Handle Multer file size limit errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 10MB' });
  }

  // Handle other Multer errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
