"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rings", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			power: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			carrier_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "carriers",
					key: "id",
				},
			},
			forged_by: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			image: {
				allowNull: false,
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("rings");
	},
};
