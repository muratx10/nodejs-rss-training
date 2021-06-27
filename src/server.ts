/* eslint-disable no-console */
import app from "app";
import { PORT } from "config/config";
import { StatusCodes } from "http-status-codes";
import { initRootUser, tryDBConnect } from "./db/db";

tryDBConnect(async () => {
  try {
    await initRootUser();
    app.listen(PORT, () =>
      process.stdout.write(`App is running on http://localhost:${PORT}`)
    );
  } catch (e) {
    if (e.statusCode ===  StatusCodes.CONFLICT) {
      console.error('User already exists.');
    } else {
      console.error(e);
    }
  }
});
