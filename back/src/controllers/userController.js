"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.loginUser = exports.registerUser = void 0;
const userService_1 = require("../services/userService");
const registerUser = async (request, reply) => {
    try {
        const data = request.body;
        if (await (0, userService_1.getByUsername)(data.username)) {
            throw new Error('User already exists');
        }
        const user = await (0, userService_1.createUserService)(data);
        reply.status(201).send({
            id: user.id,
            email: user.email,
            username: user.username,
            class: user.class,
        });
    }
    catch (error) {
        reply.status(500).send(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (request, reply) => {
    try {
        const loginData = request.body;
        const result = await (0, userService_1.loginUserService)(loginData);
        return reply.status(200).send(result);
    }
    catch (error) {
        if (error.statusCode) {
            return reply.status(error.statusCode).send({ error: error.message });
        }
        return reply.status(500).send(error);
    }
};
exports.loginUser = loginUser;
const deleteUser = async (request, reply) => {
    const idUser = request.params.id;
    if (!idUser) {
        return reply.status(400).send({ error: 'Id not provided' });
    }
    const user = await (0, userService_1.getById)(idUser);
    if (!user) {
        return reply.status(404).send({ error: 'User not found' });
    }
    try {
        await (0, userService_1.deleteUserService)(idUser);
        reply.status(204).send();
    }
    catch (error) {
        reply.status(500).send(error);
    }
};
exports.deleteUser = deleteUser;
const getUser = async (request, reply) => {
    try {
        const idUser = request.params.id;
        if (!idUser) {
            return reply.status(400).send({ error: 'Id not provided' });
        }
        const user = await (0, userService_1.getById)(idUser);
        if (!user) {
            return reply.status(404).send({ error: 'User not found' });
        }
        const result = await (0, userService_1.getUserService)(idUser);
        reply.status(200).send(result);
    }
    catch (error) {
        reply.status(500).send(error);
    }
};
exports.getUser = getUser;
