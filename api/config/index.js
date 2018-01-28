import app from './app'
import db from './db'

const prod = (process.env.NODE_ENV === 'production')
const dev = !prod

export { db, prod, dev }
export default app