import app from "app";
import { PORT } from "config/config";
import { createConnection } from "typeorm";

createConnection()
  .then(() => {
    app.listen(PORT, () =>
      process.stdout.write(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    process.stderr.write('Failed to connect DB', e.message);
    process.exit(1);
  });
