import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig(({mode, command, isPreview})=> {
//   // console.log('mode',mode);
//   // console.log('command',command);
//   // console.log('preview',isPreview);
//   // const env = loadEnv('.env', process.cwd(), '');
//   // console.log('env',env);
//   return {
//       plugins: [react()],
//     }
// })

export default defineConfig({
  plugins: [react()],
})
