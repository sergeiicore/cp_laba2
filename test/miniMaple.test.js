import {MiniMaple} from "../src/miniMaple";

const miniMaple = new MiniMaple();

test('differentiates a monomial', () => {
    expect(miniMaple.diff('4*x^3', 'x')).toBe('12*x^2');
});

test('returns zero when the variable is absent', () => {
    expect(miniMaple.diff('4*x^3', 'y')).toBe('0');
});

test('differentiates and formats a polynomial', () => {
    expect(miniMaple.diff('4*x^3-x^2', 'x')).toBe('12*x^2 - 2*x');
});

test('rejects unsupported operations', () => {
    expect(() => miniMaple.diff('x/2', 'x')).toThrow('Unsupported operation');
});
