import { defineProtoConfig } from "@protohq/cli/config";

export default defineProtoConfig({
  title: "Product review",
  prototypes: "src/**/*.proto.tsx",
  locale: "en",
});
