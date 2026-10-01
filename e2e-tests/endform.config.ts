import { defineEndformConfig } from "endform";
import { baserowConfig } from "./playwright.config";

const applicationPorts = [
  baserowConfig.PUBLIC_WEB_FRONTEND_URL,
  baserowConfig.PUBLIC_BACKEND_URL,
  baserowConfig.BUILDER_PREVIEW_URL,
]
  .map((address) => new URL(address))
  .filter(
    ({ hostname }) =>
      ["localhost", "127.0.0.1", "[::1]"].includes(hostname) ||
      hostname.endsWith(".localhost")
  )
  .map(({ port, protocol }) => Number(port || (protocol === "https:" ? 443 : 80)));

export default defineEndformConfig({
  // Runtime image reads and the imported module outside the e2e package need
  // explicit transfer; the latter was missing on the remote runner.
  additionalFiles: [
    "assets/testuploadimage.png",
    "../web-frontend/modules/core/plugins/realtimeProtocol.js",
  ],
  // The Axios API setup stalls with HTTP interception. Forward only the
  // application URLs plus MailHog, barrier, and S3Mock loopback ports.
  proxyNetworkPorts: [...new Set([...applicationPorts, 8025, 8102, 9090])],
  // One shared application stack: avoid overwhelming its three API workers.
  concurrentTestLimits: [{ scope: "within-suite-run", limit: 4 }],
});
