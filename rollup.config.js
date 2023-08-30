import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import commonjs from '@rollup/plugin-commonjs';
import * as fs from 'fs';

const packageJson = require("./package.json");

const plugins = [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
        tsconfig: './tsconfig.json',
    }),
    terser(),
]
const getFolders = (entry) => {
    const dirs = fs.readdirSync(entry, { withFileTypes: true })
    return dirs
        .filter((dir) => dir.name !== 'index.ts' && dir.isDirectory())
        .filter((dir) => dir.name !== 'theme')
        .map((dir) => dir.name);
}

const folderBuilds = getFolders('./src').map(folder => {
    return {
        input: `src/${folder}/index.ts`,
        output: {
            file: `dist/${folder}/index.js`,
            sourcemap: true,
            exports: 'named',
        },
        plugins,
        external: [/\.scss$/, 'react', 'react-dom'],
    }
})

export default [
    {
        input: "src/index.ts",
        output: {
            file: packageJson.module,
            format: "mjs",
            sourcemap: true,
        },
        plugins: [...plugins,
            scss({
                name: 'devs-ui-kit',
                fileName: 'devs-ui-kit.css',
                sourceMap: true,

            }),
        ],
        external: ['react', 'react-dom'],
    },
    ...folderBuilds,
];