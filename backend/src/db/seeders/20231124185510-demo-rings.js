"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"rings",
			[
				{
					id: "c61cbfbe-9231-4822-afb6-6675786ffa6e",
					name: "Anel de força",
					power: "Super força",
					carrier_id: "b3090b40-0401-4ec3-8170-499d083a565d",
					forged_by: "Homens",
					image:
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxAfYD1XnHKgHPkYa1iUEakMEBuMCS5sonuw&s",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("rings", null, {});
	},
};
