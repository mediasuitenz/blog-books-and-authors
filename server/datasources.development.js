module.exports = {
  db: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DB || '',
    username: process.env.PG_USER || '',
    password: process.env.PG_PASS || '',
    name: process.env.CONNECTOR_NAME || 'memory',
    connector: process.env.CONNECTOR || 'memory',
    file: process.env.DATA_FILE
  }
}
