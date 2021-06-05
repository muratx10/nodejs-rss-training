import app from './app';
import { PORT } from './common/config';

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`App is running on http://localhost:${PORT}`)
);
