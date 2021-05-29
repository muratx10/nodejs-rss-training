const { PORT } = require('src/common/config');
const app = require('src/app');

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`App is running on http://localhost:${PORT}`)
);

/**
 * @file
 * @author Murat AKMAMEDAU <muratx10@gmail.com>
 */
