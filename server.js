import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'dist')));

// Tratar todas as rotas direcionando para o index.html do React (SPA behavior)
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Render Server rodando na porta ${port}`);
});
