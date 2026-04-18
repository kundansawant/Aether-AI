import mysql from 'mysql2/promise';

// Create a connection pool for MySQL
// Using a pool is recommended for production-grade Next.js apps to manage concurrent connections
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'aether_db',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Execute a MySQL query
 * @param sql The SQL query string
 * @param params Array of parameters for the query
 */
export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('MySQL Query Error:', error);
    throw error;
  }
}
