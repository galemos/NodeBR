const assert = require('assert');
const PasswordHelper = require('./../helpers/passwordHelper');

const SENHA = '123';
const HASH = '$2b$04$3/Z91SCJfVbFNOa3AdYyYur6b0moiea232y5.DgR7M6UY0CGZOI9e';

describe('UserHelper test suit', function () {
   it('Deve gerar um hash a partir de uma senha', async ()=>{
        const result = await PasswordHelper.hashPassword(SENHA);
        assert.ok(result.length > 10);
   });

    it('Deve validar a senha com o hash', async ()=>{
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result);
    });