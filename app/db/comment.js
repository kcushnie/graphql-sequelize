import { sequelize, conn } from './db'

const Comment = conn.define('comment', {
    rating: {
        type: sequelize.INTEGER,
        allowNull: true
    },
    message: {
        type: sequelize.STRING,
        allowNull: true
    }
});

export default Comment