import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.DB_NAME
});

export const sqlQuery = (sql: string, fields?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const sqlQuery = mysql.format(sql, fields);
        console.log('>>>', sqlQuery);

        connection.query(sqlQuery, (err, result) => {
            if (err) reject(err.message);
            resolve(result);
        })   
    });
}