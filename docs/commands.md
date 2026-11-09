# Command catalog

Generated from the shipped CLI/local MCP catalog.

| CLI                        | Local MCP                  | Tier  | Authority              | Exclusion                                               |
| -------------------------- | -------------------------- | ----- | ---------------------- | ------------------------------------------------------- |
| proto login                | —                          | cloud | cloud mutation         | Cloud management is CLI-only; agents use the remote MCP |
| proto logout               | —                          | cloud | cloud mutation         | Cloud management is CLI-only; agents use the remote MCP |
| proto whoami               | —                          | cloud | read                   | Cloud management is CLI-only; agents use the remote MCP |
| proto workspace list       | —                          | cloud | read                   | Cloud management is CLI-only; agents use the remote MCP |
| proto workspace use        | —                          | cloud | cloud mutation         | Cloud management is CLI-only; agents use the remote MCP |
| proto share                | —                          | cloud | cloud mutation         | Cloud management is CLI-only; agents use the remote MCP |
| proto share list           | —                          | cloud | read                   | Cloud management is CLI-only; agents use the remote MCP |
| proto share invite         | —                          | cloud | cloud mutation         | Cloud management is CLI-only; agents use the remote MCP |
| proto share revoke         | —                          | cloud | cloud mutation         | Cloud management is CLI-only; agents use the remote MCP |
| proto list                 | proto_list                 | local | read                   | —                                                       |
| proto stories list         | proto_stories_list         | local | read                   | —                                                       |
| proto stories run          | proto_stories_run          | local | read                   | —                                                       |
| proto stories url          | proto_stories_url          | local | read                   | —                                                       |
| proto check                | proto_check                | local | read                   | —                                                       |
| proto url                  | proto_url                  | local | read                   | —                                                       |
| proto flow list            | proto_flow_list            | local | read                   | —                                                       |
| proto flow show            | proto_flow_show            | local | read                   | —                                                       |
| proto flow coverage        | proto_flow_coverage        | local | read                   | —                                                       |
| proto new                  | proto_new                  | local | write files            | —                                                       |
| proto flow new             | proto_flow_new             | local | write files            | —                                                       |
| proto comments list        | proto_comments_list        | local | read                   | —                                                       |
| proto comments show        | proto_comments_show        | local | read                   | —                                                       |
| proto comments add         | proto_comments_add         | local | comment                | —                                                       |
| proto comments reply       | proto_comments_reply       | local | comment                | —                                                       |
| proto comments resolve     | proto_comments_resolve     | local | comment                | —                                                       |
| proto comments reopen      | proto_comments_reopen      | local | comment                | —                                                       |
| proto comments attach      | proto_comments_attach      | local | comment (own)          | —                                                       |
| proto comments detach      | proto_comments_detach      | local | comment (own)          | —                                                       |
| proto comments edit        | proto_comments_edit        | local | comment (own)          | —                                                       |
| proto comments attachments | proto_comments_attachments | local | read                   | —                                                       |
| proto comments delete      | proto_comments_delete      | local | review session / local | —                                                       |
| proto review status        | proto_review_status        | local | read                   | —                                                       |
| proto review approve       | —                          | local | review                 | Agents never approve                                    |
| proto review reopen        | —                          | local | review                 | Agents never approve                                    |
| proto review unlock        | —                          | local | local only             | Operator recovery for another host's lock               |
| proto screenshot           | proto_screenshot           | local | write files            | —                                                       |
| proto evidence             | proto_evidence             | local | write files            | —                                                       |
| proto init                 | —                          | local | read                   | Process lifecycle                                       |
| proto dev                  | —                          | local | read                   | Process lifecycle                                       |
| proto build                | —                          | local | read                   | Process lifecycle                                       |
| proto mcp                  | —                          | local | read                   | Process lifecycle                                       |
| proto migrate              | —                          | local | write files            | Operator action with interactive verification           |
