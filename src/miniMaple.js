class MiniMaple {
    diff(expression, variable) {
        if (/[^\w\d+\-*^\s]/.test(expression)) {
            throw new Error('Unsupported operation');
        }

        const terms = expression
            .replace(/\s/g, '')
            .replace(/-/g, '+-')
            .split('+')
            .filter(Boolean)
            .map(term => this.diffTerm(term, variable))
            .filter(Boolean);

        if (terms.length === 0) {
            return '0';
        }

        return terms
            .map((term, index) => this.formatTerm(term, index))
            .join('');
    }

    diffTerm(term, variable) {
        let coefficient = 1;
        const powers = {};

        if (term.startsWith('-')) {
            coefficient = -1;
            term = term.slice(1);
        }

        for (const factor of term.split('*')) {
            if (/^\d+$/.test(factor)) {
                coefficient *= Number(factor);
                continue;
            }

            const match = factor.match(/^([A-Za-z_]\w*)(?:\^(\d+))?$/);
            if (!match) {
                throw new Error('Invalid polynomial');
            }

            const name = match[1];
            powers[name] = (powers[name] || 0) + Number(match[2] || 1);
        }

        const power = powers[variable] || 0;
        if (power === 0) {
            return null;
        }

        coefficient *= power;
        powers[variable] -= 1;
        return {coefficient, powers};
    }

    formatTerm(term, index) {
        const sign = term.coefficient < 0 ? '-' : '+';
        const variables = Object.entries(term.powers)
            .filter(([, power]) => power > 0)
            .map(([name, power]) => power === 1 ? name : `${name}^${power}`)
            .join('*');
        const number = Math.abs(term.coefficient);
        const coefficient = number === 1 && variables ? '' : number;
        const value = coefficient && variables
            ? `${coefficient}*${variables}`
            : `${coefficient}${variables}`;

        if (index === 0) {
            return sign === '-' ? `-${value}` : value;
        }
        return ` ${sign} ${value}`;
    }
}

export {MiniMaple};
