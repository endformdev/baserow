import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // Image uploads/readFileSync use a runtime path, rather than a JS import.
  additionalFiles: ["assets/testuploadimage.png"],
  // The Axios API setup stalls with HTTP interception. Forward only the
  // existing frontend, backend, MailHog, barrier, and S3Mock loopback ports.
  proxyNetworkPorts: [3000, 8000, 8025, 8102, 9090],
  // One shared application stack: avoid overwhelming its three API workers.
  concurrentTestLimits: [{ scope: "within-suite-run", limit: 4 }],
});
