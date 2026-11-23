import { defineProtoConfig } from "@protohq/cli/config";

export default defineProtoConfig({
  title: "Solstice",
  prototypes: "src/**/*.proto.tsx",
  locale: "en",
  specs: {
    booking: "Booking & stays",
  },
  roles: {
    guest: "Guest",
    member: "Member",
    host: "Host",
  },
  guards: {
    forbidRuntimeImports: ["src/lib/api.ts"],
  },
});
