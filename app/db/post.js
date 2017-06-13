import { sequelize, conn } from './db'

const Post = conn.define('post', {
   title: {
        type: sequelize.STRING,
        allowNull: false
    },
    content: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
});

export default Post;