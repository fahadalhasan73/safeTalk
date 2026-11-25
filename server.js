require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/db');
const port = Number(process.env.PORT || 5000);
connectDB().then(() => app.listen(port, () => console.log(`SafeTalk running: http://localhost:${port}`))).catch(e => {console.error('Database connection failed:', e.message);process.exit(1)});
