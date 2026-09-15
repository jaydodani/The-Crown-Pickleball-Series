import { resolve } from "path";
import { defineConfig } from "vite";
import { handleApiRequest } from "./server/dbHandler.js";

function backendDatabasePlugin() {
  return {
    name: "backend-database-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith("/api/")) {
          return handleApiRequest(req, res);
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith("/api/")) {
          return handleApiRequest(req, res);
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [backendDatabasePlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin/index.html")
      }
    }
  }
});

