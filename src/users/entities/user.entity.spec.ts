import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('User entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
        user.password = 'testPassword';
        user.salt = 'testSalt';
        bcrypt.hash = jest.fn();
    });

    describe('validatePassword', () => {
        it('Deve retornar verdadeiro para uma senha válida', async () => {
            bcrypt.hash.mockReturnValue('testPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await user.checkPassword('123456');
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(true);
        });
        
        it('Deve retornar falso se a senha for inválida', async () => {
            bcrypt.hash.mockReturnValue('wrongPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await user.checkPassword('123456');
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(false);
        });
    });
});