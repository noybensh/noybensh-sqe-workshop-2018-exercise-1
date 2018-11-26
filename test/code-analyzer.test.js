import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {first} from '../src/js/code-analyzer';
import {deleteResults} from '../src/js/code-analyzer';


describe('The javascript parser',() => {
    afterEach (() => {
        deleteResults(); });

    it('is parsing a declaration statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('let i = 0; i += 4 ; '))[4][1]),0);
    });

    it('is parsing a while statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('while (i <10){}'))[3][1]),'"i < 10"'); });

    it('is parsing a if - else statement without block state', () => {
        assert.equal(
            JSON.stringify(first (parseCode('let i = 8 ; if (i<0) i++ ;  else i = 10 ; '))[0][1]), 1); });


});


describe('The javascript parser',() => {
    afterEach (() => {
        deleteResults(); });

    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(first(parseCode('')).length), 5);
    });

    it('is parsing a if - else if statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('if (i<0){i++ ; } else if (i >10){i -= 10 ; } else {i += 6; }'))[0][1]), 1); });

    it('is parsing a while statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('while (i <10){let x = x + i ;}'))[3][1]),'"i < 10"');
    });

    it('is parsing a for statement', () => {
        assert.equal(
            JSON.stringify(first(parseCode('for (i; i < 10 ; i = i + 1){}'))[3][1]), '"i < 10"');
    });
});




describe('The javascript parser',() => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing a let statement', () => {
        assert.equal(
            JSON.stringify(first(parseCode('let x ; x = n'))[2][1]), '"x"');
    });

    it('is parsing an return statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('function foo(x){return x;}'))[2][2]), '"x"');
    });

    it('is parsing an assignment statement - array', () => {
        assert.equal(
            JSON.stringify(first (parseCode('x = m[0];'))[4][1]), '"m[0]"');
    });

    it('is parsing a for statement - with variable declaration', () => {
        assert.equal(
            JSON.stringify(first(parseCode('for (let i = 0; i > 10 + x ; i --){x = m[i] + x ; }'))[3][1]), '"i > 10 + x"');
    });

    it('is parsing a for statement - without declaration', () => {
        assert.equal(
            JSON.stringify(first(parseCode('let i = 4 ; for (; i < 10 ; i = i + 1){}'))[4][1]), 4);
    });


    it('is parsing a for statement - with assignment exp', () => {
        assert.equal(
            JSON.stringify(first(parseCode('for (i = 0 ; i < 10 ; i = i + 1){}'))[3][1]), '"i < 10"');
    });

    it('is parsing a if statement', () => {
        assert.equal(
            JSON.stringify(first(parseCode('if (1==1) {m[0] = x;} else {x = 2}; '))[3][1]), '"1 == 1"');
    });

});
