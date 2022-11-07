const plugin = require('tailwindcss/plugin');
const color = require('color');

module = module ?? {};

const BgATPlugin = plugin(({theme, matchUtilities, addUtilities}) => {
    function flattenColors(colors) {
        return Object.fromEntries(Object.entries(colors).map(pair => {
            return typeof pair[1] === 'string' ? [pair] :
                Object.entries(flattenColors(pair[1])).map(inner => [`${pair[0]}-${inner[0]}`, inner[1]])
        }).flat(1).filter(pair => {
            try {
                // noinspection JSCheckFunctionSignatures
                color(pair[1]);
                return true;
            } catch (e) {
                return false;
            }
        }))
    }

    matchUtilities({
        'bgat': (value) => {
            let bg = color(value);
            let fg = bg.isDark() ?
                'rgb(255 255 255 / var(--tw-text-opacity))' :
                'rgb(0 0 0 / var(--tw-text-opacity))';
            let backgroundColor = `rgb(${bg.rgb().array().join(' ')} / var(--tw-bg-opacity))`;
            return {
                '--tw-bg-opacity': '1',
                '--tw-text-opacity': '1',
                backgroundColor,
                color: fg
            };
        },
        'cauto': (value) => {
            let bg = color(value);
            let text = bg.isDark() ?
                '255 255 255' :
                '0 0 0';
            let negate = bg.negate().array().join(' ');
            return {
                '--tw-cauto': bg.array().join(' '),
                '--tw-cauto-text': text,
                '--tw-cauto-negate': negate,
            }
        }
    }, {values: flattenColors(theme('colors')), type: 'color'});
});

module.exports = BgATPlugin;
