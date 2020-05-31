import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {
	terser
} from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import pkg from '../package.json';



const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: [
		{
		  file: pkg.module,
		  format: 'es',
		  sourcemap: true,
		  name: pkg.name
		},
		{
		  file: pkg.main,
		  format: 'umd',
		  sourcemap: true,
		  name: pkg.name
		}
	  ],
	plugins: [
		svelte({
			dev: !production,
			hydratable: true
		}),
		resolve({
			dedupe: ['svelte']
		}),
		commonjs(),
		production && terser(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			include: '**/node_modules/**',
		})
	],
	watch: {
		clearScreen: false
	}
};