/* eslint-disable no-console */
import app from "app";
import { PORT } from "config/config";
import { StatusCodes } from "http-status-codes";
import { initRootUser, tryDBConnect } from "./db/db";

tryDBConnect(async () => {
  try {
    app.listen(PORT, () =>
      process.stdout.write(`App is running on http://localhost:${PORT}`)
    );
    await initRootUser();
  } catch (e) {
    if (e.statusCode ===  StatusCodes.CONFLICT) {
      console.error('User already exists.');
    } else {
      console.error(e);
    }
  }
});
