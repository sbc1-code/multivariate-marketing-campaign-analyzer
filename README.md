# multivariate-marketing-campaign-analyzer

Analytics tool for multi-variant campaign performance analysis.

This project now includes a simple Node.js/Express backend that serves the static
`index.html` page and provides a basic API for CSV uploads.

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

## API

### `POST /api/upload`
Upload a CSV file using a form field named `file`. Only CSV files are
accepted. The endpoint returns a JSON response confirming the upload.
