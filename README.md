# multivariate-marketing-campaign-analyzer

Analytics tool for multi-variant campaign performance analysis.

## Live Demo

The application is deployed on GitHub Pages and can be accessed at:
**https://sbc1-code.github.io/multivariate-marketing-campaign-analyzer/**

The live version is a fully functional static site that runs entirely in your browser - no backend required!

## About This Project

This project includes:
- **Static Web App** (`index.html`): Fully client-side analytics tool that works in any browser
- **Optional Node.js Backend** (`server.js`): Provides a local development server with CSV upload API

All CSV parsing and analysis happens client-side using PapaParse and Chart.js, so the app works perfectly as a static site on GitHub Pages.

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

## GitHub Pages Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions.

### How It Works

1. Any push to the `main` or `master` branch triggers the deployment workflow
2. GitHub Actions uploads the static files to GitHub Pages
3. The site becomes available at: https://sbc1-code.github.io/multivariate-marketing-campaign-analyzer/

### Manual Deployment

The deployment workflow can also be triggered manually from the Actions tab in GitHub.

### Configuration

To enable GitHub Pages for your fork:
1. Go to repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The next push to main/master will automatically deploy the site
