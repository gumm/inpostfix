const assert = require('assert');
import * as RPN from '../module/rpn.mjs'

describe('Tokenize an infix string to a token array', () => {

  it('10+3', () => {
    let s = '10+3';
    let tokens = [10, '+', 3];
    let rArr = [10, 3, '+'];
    let c = 13;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('10 - 3', () => {
    let s = '10 - 3';
    let tokens = [10, '-', 3];
    let rArr = [10, 3, '-'];
    let c = 7;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('10.5-3.25', () => {
    let s = '10.5-3.25';
    let tokens = [10.5, '-', 3.25];
    let rArr = [10.5, 3.25, '-'];
    let c = 7.25;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('42*0.1', () => {
    let s = '42*0.1';
    let tokens = [42, '*', 0.1];
    let rArr = [42, 0.1, '*'];
    let c = 4.2;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('42/0.1', () => {
    let s = '42/0.1';
    let tokens = [42, '/', 0.1];
    let rArr = [42, 0.1, '/'];
    let c = 420;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('-42', () => {
    let s = '-42';
    let tokens = ['_', 42];
    let rArr = [42, '_'];
    let c = -42;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('+23', () => {
    let s = '+23';
    let tokens = [23];
    let rArr = [23];
    let c = 23;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('12^2', () => {
    let s = '12^2';
    let tokens = [12, '^', 2];
    let rArr = [12, 2, '^'];
    let c = 144;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('-2 * 4', () => {
    let s = '-2 * 4';
    let tokens = ['_', 2, '*', 4];
    let rArr = [2, '_', 4, '*'];
    let c = -8;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('(10+3)', () => {
    let s = '(10+3)';
    let tokens = ['(', 10, '+', 3, ')'];
    let rArr = [10, 3, '+'];
    let c = 13;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('(10+3)*2', () => {
    let s = '(10+3)*2';
    let tokens = ['(', 10, '+', 3, ')', '*', 2];
    let rArr = [10, 3, '+', 2, '*'];
    let c = 26;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('10+3*3', () => {
    let s = '10+3*3';
    let tokens = [10, '+', 3, '*', 3];
    let rArr = [10, 3, 3, '*', '+'];
    let c = 19;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('10+3*3-1', () => {
    let s = '10+3*3-1';
    let tokens = [10, '+', 3, '*', 3, '-', 1];
    let rArr = [10, 3, 3, '*', '+', 1, '-'];
    let c = 18;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('10+3*3/2', () => {
    let s = '10+3*3/2';
    let tokens = [ 10, '+', 3, '*', 3, '/', 2];
    let rArr = [10, 3, 3, '*', 2, '/', '+'];
    let c = 14.5;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('(-10+3)', () => {
    let s = '(-10+3)';
    let tokens = ['(', '_', 10, '+', 3, ')'];
    let rArr = [10, '_', 3, '+'];
    let c = -7;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3', () => {
    let s = '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3';
    let tokens = [3, '+', 4, '*', 2, '/', '(', 1, '-', 5, ')', '^', 2, '^', 3];
    let rArr = [3, 4, 2, '*', 1, 5, '-', 2, 3, '^', '^', '/', '+'];
    let c = 3.0001220703125;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('-1 * (-4 + 2)', () => {
    let s = '-1 * (-4 + 2)';
    let tokens = ['_', 1, '*', '(', '_', 4, '+', 2, ')'];
    let rArr = [1, '_', 4, '_', 2, '+', '*'];
    let c = 2;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('-+1', () => {
    let s = '-+1';
    let tokens = ['_', 1];
    let rArr = [1, '_'];
    let c = -1;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('+-1', () => {
    let s = '+-1';
    let tokens = ['_', 1];
    let rArr = [1, '_'];
    let c = -1;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('-(-1)', () => {
    let s = '-(-1)';
    let tokens = ['_', '(', '_', 1, ')'];
    let rArr = [1, '_', '_'];
    let c = 1;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('+(+1)', () => {
    let s = '+(+1)';
    let tokens = ['(', 1, ')'];
    let rArr = [1];
    let c = 1;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('52+(1+2)*4-3', () => {
    let s = '52+(1+2)*4-3';
    let tokens = [52, '+', '(', 1, '+', 2, ')', '*', 4, '-', 3];
    let rArr = [52, 1, 2, '+', 4, '*', '+', 3, '-'];
    let c = 61;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('52+((1+2)*4)-3', () => {
    let s = '52+((1+2)*4)-3';
    let tokens = [52, '+', '(', '(', 1, '+', 2, ')', '*', 4, ')', '-', 3];
    let rArr = [52, 1, 2, '+', 4, '*', '+', 3, '-'];
    let c = 61;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('(52+1+2)*4-3', () => {
    let s = '(52+1+2)*4-3';
    let tokens = ['(', 52, '+', 1, '+', 2, ')', '*', 4, '-', 3];
    let rArr = [52, 1, '+', 2, '+', 4, '*', 3, '-'];
    let c = 217;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr),  c);
    assert.deepStrictEqual(RPN.calcInfix(s),  c);
  });

  it('6+myFn(a,5,urFn(7,3))', () => {
    const lookup = { 'a': 7, 'myFn': (a,b,c) => a+b+c, 'urFn': (a,b) => a+b }
    let s = '6+myFn(a,5,urFn(7,3))';
    let tokens = [6,'+','myFn','(','a',5,'urFn','(',7,3,')',')'];
    let rArr = [6,'a',5,7,3,'urFn(2)','myFn(3)','+'];
    let c = 28;
    assert.deepStrictEqual(RPN.tokenize(s), tokens);
    assert.deepStrictEqual(RPN.toRPN(s), rArr);
    assert.deepStrictEqual(RPN.calcRPN(rArr, lookup),  c);
    assert.deepStrictEqual(RPN.calcInfix(s, lookup),  c);
  });

});