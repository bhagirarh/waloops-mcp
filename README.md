# WALoops MCP Server — WhatsApp OTP & WhatsApp Business automation for AI assistants

WALoops is a **remote, hosted MCP server** that gives your AI coding assistant WhatsApp tools: send and verify OTPs, manage conversations, build automation drafts, send approved templates, and more.

**Nothing to install.** The server runs at `https://app.waloops.com/api/mcp.php` and speaks the [MCP Streamable HTTP](https://modelcontextprotocol.io) protocol. Point your client at that URL, add your API key as a header, and start building.

---

## Features

- Send and verify WhatsApp (or SMS) OTPs from the WALoops number -- no Meta account needed for the free tier
- Read dashboard stats, conversations, and campaign data
- List, create, and submit WhatsApp templates for Meta approval
- Build automation drafts (trigger + action + conditions + delays) that are always saved switched OFF for your review
- Install proven ready-made automation recipes as safe drafts
- Pause live automations
- All store tokens and secrets stay server-side and are never returned to the AI

---

## Quick start

**Get a free key** at [app.waloops.com/register](https://app.waloops.com/#/register?plan=wp-otp-free&src=github) -- 100 WhatsApp OTPs/month, no credit card required.

The server can initialize, list tools, and run `get_started` with no key at all. A key is only needed for tools that send or read account data.

---

## Install configs

### Claude Code

```bash
claude mcp add --transport http waloops https://app.waloops.com/api/mcp.php --header 'X-API-Key: YOUR_KEY'
```

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "waloops": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://app.waloops.com/api/mcp.php",
        "--header",
        "X-API-Key: YOUR_KEY"
      ]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "waloops": {
      "url": "https://app.waloops.com/api/mcp.php",
      "headers": {
        "X-API-Key": "YOUR_KEY"
      }
    }
  }
}
```

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "waloops": {
      "type": "http",
      "url": "https://app.waloops.com/api/mcp.php",
      "headers": {
        "X-API-Key": "YOUR_KEY"
      }
    }
  }
}
```

### Windsurf

Add to your Windsurf MCP config:

```json
{
  "mcpServers": {
    "waloops": {
      "serverUrl": "https://app.waloops.com/api/mcp.php",
      "headers": {
        "X-API-Key": "YOUR_KEY"
      }
    }
  }
}
```

---

## Tools

| Tool | Key required | Description |
|------|-------------|-------------|
| `get_started` | None | Explains WALoops setup, key types, available tool groups, API docs, and example OTP requests |
| `send_otp` | Free OTP key | Sends a one-time code to a phone number via WhatsApp or SMS from the WALoops number |
| `verify_otp` | Free OTP key | Verifies a previously sent OTP using the recipient's phone number and code |
| `get_otp_usage` | Free OTP key | Reads OTP usage and limits for the API key |
| `list_templates` | Advance plan | Lists your approved WhatsApp templates and their variables |
| `send_template` | Advance plan | Sends an approved WhatsApp template message to a phone number |
| `get_dashboard_stats` | Advance plan | Returns messages, conversations, automations, and plan usage overview |
| `list_conversations` | Advance plan | Lists and searches inbox conversations |
| `get_conversation_messages` | Advance plan | Lists messages in a conversation |
| `list_automations` | Advance plan | Lists automations, or fetches one automation with its run stats |
| `list_connected_apps` | Advance plan | Lists connected apps (Shopify, WooCommerce, etc.) with available event triggers |
| `list_actions` | Advance plan | Lists every action an automation can run: WhatsApp, Shopify, WooCommerce, webhooks, bot flows, tags |
| `list_recipes` | Advance plan | Lists proven ready-made automations that can be installed as safe drafts |
| `list_bot_flows` | Advance plan | Lists bot flows available as automation actions |
| `list_tags` | Advance plan | Lists tags available as automation actions |
| `list_campaigns` | Advance plan | Lists campaigns, or fetches one campaign by id |
| `create_template` | Advance plan | Creates a WhatsApp template and submits it to Meta for approval |
| `pause_automation` | Advance plan | Switches an automation off |
| `create_automation_draft` | Advance plan | Creates an automation as a draft, saved switched off, named "[AI draft] ..." |
| `install_recipe_draft` | Advance plan | Installs a recipe as a switched-off draft for the owner to review |

---

## Example prompts

1. "Send a login OTP to +91 98765 43210 for my app at https://myapp.com and verify the code 482910."
2. "Show me my WhatsApp OTP usage this month."
3. "List my approved WhatsApp templates and send the order_confirmation one to +44 7700 900000."
4. "Create an automation draft that sends a WhatsApp message when a new Shopify order is placed -- use a 10-minute delay."
5. "Show me the last 20 conversations in my inbox and summarise any unread ones."

---

## Security

- Your API key is passed per request as the `X-API-Key` header and is never stored or logged by the MCP layer.
- Automation drafts are always saved switched off and named "[AI draft] ..." -- nothing runs until you review and enable it inside the WALoops app.
- The AI can only pause automations, not delete them.
- Connected app tokens and secrets stay server-side and are never returned to the AI.

---

## Pricing

Free OTP keys include 100 WhatsApp OTPs/month with no credit card. Advance plan keys unlock the full Business automation toolset.

See all plans at [waloops.com/pricing](https://waloops.com/pricing).

---

## Links

- MCP server page: [waloops.com/mcp](https://waloops.com/mcp)
- Support: support@waloops.com
