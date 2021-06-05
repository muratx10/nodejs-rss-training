import { appendFile } from 'fs';

const logger = (msg: string, level = 'common'): void => {
  const filename = `${level}.txt`;
  const message = `Date: ${new Date().toISOString()}\n${msg}\n`;

  appendFile(filename, message, (err: NodeJS.ErrnoException | null): void => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to save log [${message}] to file [${level}]: Error: ${err}`);
    }
  });
};

export default logger;
