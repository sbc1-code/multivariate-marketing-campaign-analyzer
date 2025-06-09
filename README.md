# multivariate-marketing-campaign-analyzer

Analytics tool for multi-variant campaign performance analysis.

This project now includes a simple Node.js/Express backend that serves the static
`index.html` page and provides a basic API for CSV uploads. Uploaded files are
immediately removed after processing to avoid cluttering the `uploads` folder.

The server port can be customised with the `PORT` environment variable and the
upload directory via `UPLOAD_DIR`.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   node server.js
   ```
The app will be available at `http://localhost:3000`.

### Running tests

Unit tests cover the CSV upload endpoint. Run them with:

```bash
npm test
```

## API

### `POST /api/upload`
Upload a CSV file using a form field named `file`. Only CSV files are
accepted. The endpoint returns a JSON response confirming the upload. Example
using `curl`:

```bash
curl -F "file=@path/to/data.csv" http://localhost:3000/api/upload
```
