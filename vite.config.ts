import fs from "fs";
import {defineConfig} from "vite";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

})
