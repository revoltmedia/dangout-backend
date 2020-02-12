import { createConnection } from 'typeorm'
import { Card } from 'entities/card'
import { User } from 'entities/user'

export const databaseInitializer = async () => {

    return await createConnection({
        type     : 'postgres',
        host     : process.env.DB_HOST,
        port     : 5432,
        username : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        entities: [
            Card,
            User
        ],
        logging: ['query', 'error'],
        synchronize: true,
    }).then(() => {
        console.log('Database connection established')
    })

}
