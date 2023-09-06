import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { getFolders } from './scripts/buildUtils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy'

const packageJson = require('./package.json');

const plugins = [
  peerDepsExternal(),
  resolve(),
  replace({
    __IS_DEV__: process.env.NODE_ENV === 'development',
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
  }),
  terser(),
];
const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../cjs/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
  copy({
    targets: [
      {
        src: `src/${folderName}/${folderName}.scss`,
        dest: `dist/${folderName}/`,
        transform: (contents, name) => contents.toString().replace('../styles', '../scss'),
      },
    ],
  }),
];
const folderBuilds = getFolders('./src').map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
      format: 'esm',
    },
    plugins: subfolderPlugins(folder),
    external: [/\.scss$/, 'react', 'react-dom', 'primereact'],
  };
});

const fontTokens = {
  __FONTSDIR__: '../fonts',
}

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [...plugins],
    external: ['react', 'react-dom', 'primereact'],
  },
  ...folderBuilds,
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: 'inline',
        exports: 'named',
      },
    ],
    plugins,
    external: [/\.scss$/, 'react', 'react-dom', 'primereact'],
  },
  {
    input: ['src/styles/index.scss'],
    output: [{
      file: 'dist/styles/devs-ui-kit.css',
    }],
    plugins: [
      replace(fontTokens),
      scss({
        fileName: 'devs-ui-kit.css',
      }),
      copy({
        targets: [
          {
            src: ['src/fonts/NotoSansHK/NotoSansHK-Light.otf'],
            dest: 'dist/fonts/NotoSansHK',
          },
          {
            src: ['src/styles/*'],
            dest: 'dist/scss',
          },
          {
            src: ['src/styles/index.scss'],
            dest: 'dist/scss',
            transform: (contents, name) => {
              let content = contents.toString();
              for (const tokenKey of Object.keys(fontTokens)) {
                content = content.replaceAll(tokenKey, fontTokens[tokenKey]);
              }
              return content;
            },
          },
        ],
      }),
    ],
  },
  {
    input: ['src/styles/icons.scss'],
    output: [{
      file: 'dist/styles/devs-ui-kit-icons.css',
    }],
    plugins: [
      replace(fontTokens),
      scss({
        fileName: 'devs-ui-kit-icons.css',
      }),
      copy({
        targets: [
          {
            src: [
              'src/fonts/lineicons/lineicons.eot',
              'src/fonts/lineicons/lineicons.svg',
              'src/fonts/lineicons/lineicons.ttf',
              'src/fonts/lineicons/lineicons.woff',
              'src/fonts/lineicons/lineicons.woff2',
            ],
            dest: 'dist/fonts/lineicons',
          },
        ],
      }),
    ],
  },
];
