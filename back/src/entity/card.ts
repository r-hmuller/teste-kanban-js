import {Sequelize, DataTypes, Model} from 'sequelize';
const sequelize: Sequelize = new Sequelize('sqlite::memory:');

class Card extends Model {}

Card.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
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
    modelName: 'Card' // We need to choose the model name
});
