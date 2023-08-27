import {Sequelize, DataTypes, Model} from 'sequelize';
import 'dotenv/config';

const database: string | null | undefined = process.env.DB_DATABASE;
const username: string | null | undefined  = process.env.DB_USERNAME;
const password:  string | null | undefined = process.env.DB_PASSWORD;
const host:  string | null | undefined = process.env.DB_HOST;

if (!database || !username || !password || !host) {
    throw new Error('Missing database configuration');
}

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql'
});

export class CardModel extends Model {
    declare id: number;
    declare titulo: string;
    declare conteudo: string;
    declare lista: string;
}

CardModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lista: {
        type: DataTypes.ENUM('TODO', 'DOING', 'DONE'),
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'cards' // We need to choose the model name
});
