"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Rings", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			power: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			bearer: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			forgedBy: {
				type: Sequelize.ENUM("Elfos", "Anões", "Homens", "Sauron"),
				allowNull: false,
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false,
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Rings");
	},
};
