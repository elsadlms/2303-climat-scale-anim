import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle(bundle) {
      console.log(bundle)

      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

// const moduleExports = `
//   export const styles = ['https://assets-decodeurs.lemonde.fr/redacweb/2302-rechauffement-scale-anim/animScaleBars.css']
//   export const init = window.__intro_module_for_scrllgngn.init
//   export const update = window.__intro_module_for_scrllgngn.update
// `

const moduleExports = `
  export const init = window.__intro_module_for_scrllgngn.init
  export const update = window.__intro_module_for_scrllgngn.update
`

export default {
  input: production ? 'src/main.js' : 'src/dev.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
    footer: production && moduleExports
  },
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      }
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    // css({ output: 'bundle.css' }),
    // css(),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
