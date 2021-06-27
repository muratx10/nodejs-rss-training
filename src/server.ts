import app from "app";
import { PORT } from "config/config";
import { initRootUser, tryDBConnect } from "./db/db";

tryDBConnect(() => {
  initRootUser()
    .then(() => {
      app.listen(PORT, () =>
        process.stdout.write(`App is running on http://localhost:${PORT}`)
      );
    });
});
