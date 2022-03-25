// rollup.config.js
const rollup = require('rollup')
const webWorkerLoader =  require('rollup-plugin-web-worker-loader');
const commonjs = require("rollup-plugin-commonjs");

const configPre = {
    input: './main.js',
    output: { file: 'bundle.js'},
    plugins: [ commonjs({ include: '**' }) ]
}

const config = {
    input: './bundle.js',
    output: { file: 'dist/bundle.js' },
    plugins: [ webWorkerLoader({ inline: false, outputFolder: 'worker' }) ]
}

function buildEntry(config) {
    const output = config.output
    return rollup.rollup(config)
        .then(bundle => bundle.write(output))
}

buildEntry(configPre).then(() => buildEntry(config))