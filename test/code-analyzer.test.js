import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {first} from '../src/js/code-analyzer';
//import {describe} from 'search-ms:displayname=Search%20Results%20in%20Noy&crumb=location:C%3A%5CUsers%5CNoy\nyc';
//import {describe} from 'nyc';

describe('The javascript parser',() => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}'
        );
    });

    it('is parsing a declaration statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('let i = 0 ; ')).length),5);
    });

    it('is parsing an return statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('function f(x){\n' +
                'if (x < 10)\n' +
                'return x-10; \n' +
                '}'))[0].length), 5);
    });
});

describe('The javascript parser',() => {
    it('is parsing a function statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('if (i<0){i++ ; } else if (i >10){i -= 10 ; } else {i += 6; }')).length), 5);
    });

    it('is parsing a while statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('function f(){\n' +
                'while (i < 10){\n' +
                'i+=1 }\n' +
                '}'))[3].length),4);
    });

    it('is parsing a for statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('function f(x){\n' +
                'for (i; i < 10 + x ; i = i + 1){\n' +
                ' x -= 1; }\n' +
                '}')).length), 5);
    });
});

describe('The javascript parser',() => {
    it('is parsing a function statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('x = n')).length), 5);
    });

    it('is parsing a function statement', () => {
        assert.equal(
            JSON.stringify(first (parseCode('function foo(x){}')).length),5);
    });

        it('is parsing a for statement, decleration statement, member statement, else statement', () => {
            assert.equal(
                JSON.stringify(first(parseCode ('function f(x){\n' +
                    'let i ; \n' +
                    'for (i = 14 ; i > x[10] ; i--){\n' +
                    'if (i == 10)\n' +
                    'return i\n' +
                    'else\n' +
                    'i +=1 ; \n' +
                    '}\n' +
                    '}'))[0].length), 11);
        });

    it('is parsing a declaration statement in for statement', () => {
        assert.equal(
            JSON.stringify(first(parseCode ('function f(x){\n' +
                'let i ;\n' +
                'let y = m[10] \n' +
                'for (i = 0 ; i < x[10] ; i++){\n' +
                'let c = 10  }\n' +
                '}'))[0].length), 9);
    });
});
