import { fileURLToPath } from 'node:url';

// Point Tailwind at its config by path, so it is found even when the dev
// server is started from the repository root.
const config = fileURLToPath(new URL('./tailwind.config.js', import.meta.url));

export default { plugins: { tailwindcss: { config }, autoprefixer: {} } };
