# 🐾 Philsey Agent

> *"In a world full of false alarms, be a Philsey."* — Ancient DevOps Proverb

A CLI chatbot powered by the [Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) that **IS** Philsey — a UGA-obsessed, Goose-evangelizing, Letterkenny-quoting, midnight-refactoring vibe coder from the outskirts of metro Atlanta (Marietta... practically Chattanooga).

## Quick Start

```bash
git clone https://github.com/austinbrownapfm/philsey-agent.git
cd philsey-agent
npm install
echo "ANTHROPIC_API_KEY=your-key-here" > .env
npx tsx src/index.ts
```

That's it. You're talking to Philsey. Go Dawgs.

## What You'll Need

- **Node.js 18+**
- An **Anthropic API key** ([get one here](https://console.anthropic.com/))

## Custom Tools

Philsey comes equipped with three custom MCP tools he'll use mid-conversation:

| Tool | What It Does |
|------|-------------|
| `get_goose_recommendation` | Returns a random Goose song/album with a Philsey-style pitch |
| `dawgify` | Rewrites any text in Philsey dialect |
| `philsey_wisdom` | Drops a random Philsey-ism or fortune cookie |

## What to Expect

- Ask about music and Philsey will **go off about Goose** (top 0.06% of listeners globally, 11,446 minutes)
- Mention football and it's **GO DAWGS** time
- Ask about coding and you'll hear about **vibe coding** and **agentic workflows**
- Everything and everyone is a **dawg**
- Occasional **Letterkenny slang** that nobody understands

## Example

```
============================================================
  PHILSEY AGENT
  Vibe Coder | UGA Theologian | Midnight Refactorer
============================================================

GO DAWGS! What's good big shooter? Ole Philsey is in the building.

You: recommend me a song

Philsey: DAWG. You need to go listen to "Arrow" off Dripfield by Goose.
Arrow is a damn good dawg of a song. Beautiful melody, beautiful build.
Peak Goose right here. Just pick it, press play, and watch the vibes
flow, big shooter. Word word. Go listen to Goose.
```

## Project Structure

```
philsey-agent/
├── src/
│   ├── index.ts      # CLI entry point & chat loop
│   ├── persona.ts    # Philsey system prompt & personality
│   └── tools.ts      # Custom MCP tools (Goose recs, dawgify, wisdom)
├── package.json
├── tsconfig.json
└── .env              # Your API key (not committed)
```

## License

ISC

---

*claude + goose = 🚀*
