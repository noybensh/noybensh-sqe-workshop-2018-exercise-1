import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {first} from '../src/js/code-analyzer';
import {deleteResults} from '../src/js/code-analyzer';


describe('The javascript parser',() => {
    afterEach (() => {
        deleteResults(); });

    it('is parsing a declaration statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('let i = 0;'))[4][1]),0);
    });

    it('is parsing a while statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('while (i <10){}'))[3][1]),'"i < 10"'); });


});


describe('The javascript parser',() => {
    afterEach (() => {
        deleteResults(); });

    it('is parsing a function statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('if (i<0){i++ ; } else if (i >10){i -= 10 ; } else {i += 6; }'))[0][1]), 1); });

    it('is parsing a while statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('while (i <10){}'))[3][1]),'"i < 10"');
    });

    it('is parsing a for statement', () => {
        assert.equal(
            JSON.stringify(first(parseCode('for (i; i < 10 ; i = i + 1){}'))[3][1]), '"i < 10"');
    });
});
/*

    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}');
    });

describe('The javascript parser',() => {
    afterEach (() => {
        deleteResults();
    });
    it('is parsing a function statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('let x ; x = n'))[2][1]), '"x"');
    });
/*
    it('is parsing a function statement', () => {
        assert.equal(
            JSON.stringify(first ('function foo(x){}')[2][1]),'foo');
    });
/*
    it('is parsing a update var statement', () => {
        assert.equal(
            JSON.stringify(first ('i--').length), 5);
    });
    it('is parsing a if statement', () => {
        assert.equal(
            JSON.stringify(first ('if (i < 5){ if (i == 5) y = 6 ; else y = 8; }').length), 5);
    });

        it('is parsing an return statement', () => {
        assert.equal(
            JSON.stringify(first ('return x;')[0].length), 1);
    });
});
*/