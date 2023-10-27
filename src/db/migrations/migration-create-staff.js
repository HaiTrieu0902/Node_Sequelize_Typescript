'use strict';
// const Roles = sequelize.define('Roles', { name: DataTypes.STRING });

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Staffs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            userName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            roleId: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            role: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            accesstoken: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        // Movie.belongsToMany(Actor, { through: ActorMovies });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Staffs');
    },
};
