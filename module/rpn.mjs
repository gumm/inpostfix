/**
 * Given a string, returns a number if you can. Else return what was given.
 * @param {*} s
 * @returns {number|*}
 */
const maybeNumber = s => {
  if (s === null) {
    return s;
  }
  const p = 1 * s;
  return Number.isNaN(p) ? s : p;
};

const NEG = '_';

const OPS = new Map()
    .set(NEG, [5, 'L', 1, a => -a]) // A unary negative symbol
    .set('^', [4, 'R', 2, (b, a) => Math.pow(a, b)])
    .set('*', [3, 'L', 2, (b, a) => a * b])
    .set('/', [3, 'L', 2, (b, a) => a / b])
    .set('%', [3, 'L', 2, (b, a) => a % b])
    .set('+', [2, 'L', 2, (b, a) => a + b])
    .set('-', [2, 'L', 2, (b, a) => a - b]);

const ops = ['(', ')', '^', '*', '/', '%', NEG, ',', '='];

const unary = ['-', '+'];

const brackets = ['(', ')'];

const isOpp = e => ops.includes(e);

const isUnary = e => unary.includes(e);

const isNegate = e => e === unary[0];

const isBrackets = e => brackets.includes(e);

const isLeftBracket = e => e === brackets[0];

const noEmptyStrings = e => e !== '';

const isUnarySymbol = (lc, i) =>
    lc === undefined || i === 0 || isOperator(lc) || isLeftBracket(lc);

const letterMatch = /[a-z]/i;
const digitMatch = /[0-9]/;

const isLetter = e => !!e.match(letterMatch);

const isDigit = e => !!e.match(digitMatch);

const isDecimalPoint = e => e === '.';

const isNumString = e => isLetter(e) || isDigit(e) || isDecimalPoint(e);

const isNumber = n => typeof n === 'number' && !Number.isNaN(n);

const isOperator = e => OPS.has(e);

const isLeftAss = e => OPS.get(e)[1] === 'L';

const peek = a => a[a.length - 1];

const hasEls = a => a.length > 0;

const opPres = e => isOperator(e) ? OPS.get(e)[0] : 0;

const t1 = (o1, o2) => isLeftAss(o1) && opPres(o1) <= opPres(o2);

const t2 = (o1, o2) => opPres(o1) < opPres(o2);

const tokenize = infixString => infixString
    .split('')
    .reduce(
        ([p, n], e, i) => {
          n = isNumString(e)
              ? n.push(e) && n
              : (hasEls(n)
                  ? p.push(n.join('')) && []
                  : n);

          p = isOpp(e)
              ? p.push(e) && p
              : (isUnary(e)
                  ? (isUnarySymbol(peek(p), i)
                          ? isNegate(e) ? p.push(NEG) && p : p
                          : p.push(e) && p)
                  : p);

          return [p, n];
        }, [[], []])
    .reduce((p, c, i) => i ? [...p, c.join('')] : c, [])
    .filter(noEmptyStrings)
    .map(maybeNumber);


const toRPN = infixString => tokenize(infixString)
    .reduce(([rS, oS], c) => {
      if (isBrackets(c)) {
        if (isLeftBracket(c)) {
          oS.push(c);
        }
        else {
          let nextOpp = oS.pop();
          while (nextOpp !== '(') {
            rS.push(nextOpp);
            nextOpp = oS.pop();
          }
        }
      } else if (!isOperator(c)) {
        rS.push(c);
      } else {
        const o1 = c;
        let o2 = peek(oS);
        let c1 = t1(o1, o2);
        let c2 = t2(o1, o2);

        while (o2 && (c1 || c2)) {
          rS.push(oS.pop());
          o2 = peek(oS);
          c1 = t1(o1, o2);
          c2 = t2(o1, o2);
        }
        oS.push(o1);
      }
      return [rS, oS]
    }, [[], []])
    .reduce((p, c, i) => i ? [...p, ...c.reverse()] : c, []);


const calcRPN = rpn => rpn.reduce((p, c) => {
  if (isNumber(c)) {
    p.push(c);
    return p;
  }
  const arity = OPS.get(c)[2];
  const opp = OPS.get(c)[3];
  p.push(arity === 1
      ? opp(p.pop())
      : opp(...[p.pop(), p.pop()]));
  return p;
}, [])[0];

const calcInfix = s => calcRPN(toRPN(s));


export {
  tokenize,
  toRPN,
  calcRPN,
  calcInfix
};
