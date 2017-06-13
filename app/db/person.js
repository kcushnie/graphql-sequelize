import { sequelize, conn } from './db'

const Person = conn.define('person', {
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
});

export default Person