"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = exports.deleteUserService = exports.getById = exports.getByEmail = exports.getByUsername = exports.loginUserService = exports.createUserService = void 0;
const authUtils_1 = require("../utils/authUtils");
const user_1 = __importDefault(require("../models/user"));
const createUserService = async (newUser) => {
    try {
        const hashedPassword = await (0, authUtils_1.hashPassword)(newUser.password);
        const result = await user_1.default.create({
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword,
            class: newUser.class,
        });
        if (!result) {
            throw new Error('Error on create user');
        }
        const data = {
            id: result.id,
            username: result.username,
            email: result.email,
            class: result.class,
        };
        return data;
    }
    catch (error) {
        throw new Error('Error creating user');
    }
};
exports.createUserService = createUserService;
const loginUserService = async (loginData) => {
    const user = await (0, exports.getByEmail)(loginData.email);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await (0, authUtils_1.comparePassword)(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = (0, authUtils_1.generateToken)(user.id);
    const loggedUser = {
        user: {
            email: user.email,
            username: user.username,
            id: user.id,
            class: user.class,
        },
        token,
    };
    return loggedUser;
};
exports.loginUserService = loginUserService;
const getByUsername = async (username) => {
    return user_1.default.findOne({
        where: { username },
    });
};
exports.getByUsername = getByUsername;
const getByEmail = async (email) => {
    return await user_1.default.findOne({
        where: { email },
    });
};
exports.getByEmail = getByEmail;
const getById = async (id) => {
    return await user_1.default.findOne({ where: { id } });
};
exports.getById = getById;
const deleteUserService = async (id) => {
    return await user_1.default.destroy({ where: { id } });
};
exports.deleteUserService = deleteUserService;
const getUserService = async (id) => {
    const data = await (0, exports.getById)(id);
    return {
        email: data?.email,
        username: data?.username,
        class: data?.class,
        id: data?.id,
    };
};
exports.getUserService = getUserService;
