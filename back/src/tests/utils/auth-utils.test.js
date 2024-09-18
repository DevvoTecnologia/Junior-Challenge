"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const authUtils_1 = require("../../utils/authUtils");
(0, vitest_1.describe)('Auth Service', () => {
    (0, vitest_1.it)('deve hash a senha corretamente', async () => {
        const password = 'mySecret123';
        const hashedPassword = await (0, authUtils_1.hashPassword)(password);
        (0, vitest_1.expect)(hashedPassword).not.toBe(password);
    });
    (0, vitest_1.it)('deve comparar a senha corretamente', async () => {
        const password = 'mySecret123';
        const hashedPassword = await (0, authUtils_1.hashPassword)(password);
        const isMatch = await (0, authUtils_1.comparePassword)(password, hashedPassword);
        (0, vitest_1.expect)(isMatch).toBe(true);
    });
    (0, vitest_1.it)('deve gerar um token corretamente', () => {
        const userId = 'user-123';
        const token = (0, authUtils_1.generateToken)(userId);
        (0, vitest_1.expect)(token).toBeDefined();
    });
    (0, vitest_1.it)('deve verificar um token corretamente', () => {
        const userId = 'user-123';
        const token = (0, authUtils_1.generateToken)(userId);
        const decoded = (0, authUtils_1.verifyToken)(token);
        (0, vitest_1.expect)(decoded).toStrictEqual({
            userId,
            iat: vitest_1.expect.any(Number),
            exp: vitest_1.expect.any(Number),
        });
    });
    (0, vitest_1.it)('deve lançar um erro ao verificar um token inválido', () => {
        (0, vitest_1.expect)(() => (0, authUtils_1.verifyToken)('invalid-token')).toThrow();
    });
});
