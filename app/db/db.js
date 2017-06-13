import sequelize from 'sequelize';

const conn = new sequelize('testdb', 'newuser', 'newuser', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

export { sequelize, conn }