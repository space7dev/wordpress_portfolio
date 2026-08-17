import { createApp } from './app.js';

const port = Number.parseInt(process.env.PORT || '3000', 10);
const baseUrl = process.env.SITE_URL || `http://localhost:${port}`;
const app = createApp({ baseUrl });

app.listen(port, () => {
  console.log(`Portfolio running at ${baseUrl}`);
});

