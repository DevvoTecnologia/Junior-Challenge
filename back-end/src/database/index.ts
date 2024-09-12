import { DataSource } from 'typeorm';
import { User } from '../models/User';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '210202',
    database: 'DB_TESTE_DEVVO',
    entities: [User],
    synchronize: false, // Em produção, considere definir isso como false
});

export default AppDataSource;
