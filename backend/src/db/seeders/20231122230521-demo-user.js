"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"users",
			[
				{
					id: "b3090b70-0401-4ec3-8170-499d083a565d",
					name: "Admin",
					password:
						"$2a$08$T2GDl/ZAMMQfRSaO54w/7.2eJHTKZahWDdDC7oGIl6vJHo5kCa4W6",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
