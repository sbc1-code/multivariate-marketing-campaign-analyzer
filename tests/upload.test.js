const path = require('path');
const fs = require('fs/promises');
const request = require('supertest');
const app = require('../server');

describe('POST /api/upload', () => {
  test('returns 400 when no file uploaded', async () => {
    const res = await request(app).post('/api/upload');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No file uploaded');
  });

  test('rejects non CSV files', async () => {
    const filePath = path.join(__dirname, 'test.txt');
    await fs.writeFile(filePath, 'hello');
    const res = await request(app)
      .post('/api/upload')
      .attach('file', filePath);
    await fs.unlink(filePath);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Only CSV files allowed');
  });

  test('accepts CSV files and removes them', async () => {
    const csvPath = path.join(__dirname, 'test.csv');
    await fs.writeFile(csvPath, 'a,b\n1,2');
    const res = await request(app)
      .post('/api/upload')
      .attach('file', csvPath);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('File uploaded');
    const uploadedPath = path.join(
      path.dirname(csvPath),
      '..',
      'uploads',
      res.body.filename
    );
    const exists = await fs
      .access(uploadedPath)
      .then(() => true)
      .catch(() => false);
    expect(exists).toBe(false);
    await fs.unlink(csvPath);
  });
});
