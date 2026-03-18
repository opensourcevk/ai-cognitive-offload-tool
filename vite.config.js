import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getBasePath() {
  if (process.env.GITHUB_ACTIONS !== "true") {
    return "/";
  }

  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (!repo) {
    return "/";
  }

  if (repo.endsWith(".github.io")) {
    return "/";
  }

  return `/${repo}/`;
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
    globals: true,
  },
});
