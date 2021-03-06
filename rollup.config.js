import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: './src/index.ts',
        output: {
            file: './lib/index.esm.js',
            format: 'esm',
        },
        plugins: [typescript()],
        external: [ 'moment' ],
    },
    {
        input: './src/utils.ts',
        output: {
            file: './lib/utils.esm.js',
            format: 'esm',
        },
        plugins: [typescript()],
        external: [ 'moment' ],
    },
    {
        input: './src/index.ts',
        output: {
            file: './lib/index.js',
            format: 'cjs',
        },
        plugins: [typescript()],
        external: [ 'moment' ],
    },
    {
        input: './src/utils.ts',
        output: {
            file: './lib/utils.js',
            format: 'cjs',
        },
        plugins: [typescript()],
        external: [ 'moment' ],
    },
]