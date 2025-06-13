export const config = {
  dbFilename: process.env.DB_FILENAME || 'db.sqlite3',
  dbTestFilename: process.env.DB_TEST_FILENAME || 'db.test.sqlite3',
};
