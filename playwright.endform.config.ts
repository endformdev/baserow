// Keep both e2e-tests and its frontend source import inside Endform's upload root.
// The existing config still owns test selection, fixtures, projects, and retries.
import config from "./e2e-tests/playwright.config";

export default config;
