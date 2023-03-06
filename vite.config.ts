import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { name, version, homepage, license } from './package.json'

export default defineConfig((config) => {
  return {
    plugins: [
      Userscript({
        entry: 'src/index.ts',
        header: {
          name,
          version,
          license,
          homepage,
          icon: 'https://www.google.com/s2/favicons?sz=64&domain=web-standards.ru',
          match: 'https://web-standards.ru/*'
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
