# Configuration

Proto reads `proto.config.ts` from your app root using `defineProtoConfig` from `@protohq/cli/config`. The table below is generated from `protoConfigSchema`.

| Key                                           | Type                                                                           | Default                | Description                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `stories.roots[].id`                          | `string`                                                                       | _(required)_           | Unique lowercase identifier for a mounted Storybook story root.                                                |
| `stories.roots[].title`                       | `string`                                                                       | _(optional)_           | Optional display title for the story root in the gallery sidebar.                                              |
| `stories.roots[].dir`                         | `string`                                                                       | `"."`                  | Directory for the story root, relative to the app root.                                                        |
| `stories.roots[].stories`                     | `string` or `string[]`                                                         | _(required)_           | Glob or list of globs locating story files inside `dir`.                                                       |
| `stories.roots[].preview`                     | `string`                                                                       | _(required)_           | Path to the Storybook preview module for this story root.                                                      |
| `stories.roots[].vite`                        | `string`                                                                       | _(required)_           | Path to the Vite config used to render stories in this root.                                                   |
| `stories.roots[].static[].from`               | `string`                                                                       | _(required)_           | Source directory of static assets served for the story root.                                                   |
| `stories.roots[].static[].to`                 | `string`                                                                       | _(required)_           | Mount path where those static assets are served.                                                               |
| `stories.roots[].themeGlobal`                 | `string`                                                                       | `"theme"`              | Storybook global name synchronized with the shell theme toggle.                                                |
| `stories.roots[].guards.forbidRuntimeImports` | `(string \| RegExp)[]`                                                         | _(optional)_           | Optional per-root list of forbidden runtime import matchers for stories.                                       |
| `title`                                       | `string`                                                                       | _(required)_           | Gallery title shown in the header, browser tab, and project home.                                              |
| `prototypes`                                  | `string` or `string[]`                                                         | `"src/**/*.proto.tsx"` | Glob or list of globs matching component and draft prototype files.                                            |
| `drafts`                                      | `string`                                                                       | `"src/drafts"`         | Directory for free-form exploration drafts inside the prototypes glob.                                         |
| `flows`                                       | `string`                                                                       | `"flows"`              | Directory containing `<id>.flow.ts` user-journey definitions.                                                  |
| `canvas`                                      | `string`                                                                       | `"proto.canvas.tsx"`   | File exporting `Canvas` (providers and CSS) and optional `Frame` chrome.                                       |
| `specs`                                       | `Record<string, string> \| ((root: string) => Record<string, string> \| null)` | _(optional)_           | Map of `{ id: label }` spec groups, or a Node function returning that map or `null`.                           |
| `roles`                                       | `Record<string, string>`                                                       | `{}`                   | Map of `{ id: label }` preview roles offered in the shell role picker.                                         |
| `siteUrl`                                     | `string` (URL)                                                                 | _(optional)_           | Origin used to resolve relative paths on external flow nodes.                                                  |
| `locale`                                      | `"en" \| "pt-BR"`                                                              | `"en"`                 | Gallery shell language (`en` or `pt-BR`).                                                                      |
| `guards.forbidRuntimeImports`                 | `(string \| RegExp)[]`                                                         | `[]`                   | Module paths, prefixes, globs, package names, or RegExp patterns forbidden in prototypes, drafts, and stories. |
| `guards.productionBoundary`                   | `boolean`                                                                      | `true`                 | Fail the production app build when prototype-only modules reach the production bundle.                         |
| `evidence.dir`                                | `string`                                                                       | `"docs/design"`        | App-relative output directory for `proto screenshot` and `proto evidence` artifacts.                           |
| `build.includeReview`                         | `boolean`                                                                      | `false`                | Include local review comments and status in static `proto build` output.                                       |
| `dev.poll`                                    | `boolean`                                                                      | `false`                | Use a polling file watcher for prototypes and config.                                                          |
| `dev.allowedHosts`                            | `string[]`                                                                     | `[]`                   | Extra hostnames (without ports) permitted to access this project's gallery URLs.                               |

## Environment overrides

- `PROTOHQ_PORT`: chooses Proto's shared local port (default `4400`, remembered between starts). Stop Proto before changing the port.
- `PROTOHQ_POLL=1`: enables polling file watching (`dev.poll`).
- `PROTOHQ_TOKEN`: supplies a CLI session token for hosted commands or CI.
- `PROTOHQ_WORKSPACE`: selects the active Proto Cloud workspace slug.
- `PROTOHQ_API_URL`: overrides the API origin for loopback development or `https://staging-api.protohq.design`.

See [CLI and configuration](cli.md), [command catalog](commands.md), and the [JSON Schema](../schema/proto-config.schema.json). Run `proto check` to validate functions, regular expressions, and cross-field rules that JSON Schema cannot express.
