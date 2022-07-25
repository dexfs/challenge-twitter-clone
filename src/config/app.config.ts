export default () => ({
  pg: {
    dsn: process.env.DATABASE_DSN,
    dialect: process.env.DATABASE_DSN.split(':')[0],
  },
});
