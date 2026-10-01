import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // Image uploads/readFileSync use a runtime path, rather than a JS import.
  additionalFiles: ["assets/testuploadimage.png"],
  // The supported Docker stack is started outside Playwright's webServer.
  proxyNetworkHosts: ["<loopback>"],
  // One shared application stack: avoid overwhelming its three API workers.
  concurrentTestLimits: [{ scope: "within-suite-run", limit: 4 }],
});
