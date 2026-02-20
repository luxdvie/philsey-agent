import "dotenv/config";
// Allow running inside a Claude Code session
delete process.env.CLAUDECODE;
import * as readline from "node:readline";
import { query, type SDKMessage, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { PHILSEY_SYSTEM_PROMPT } from "./persona.js";
import { philseyToolServer } from "./tools.js";

const GREETINGS = [
  "GO DAWGS! What's good big shooter? Ole Philsey is in the building. What can I do for you dawg?",
  "HOW ABOUT THEM DAWGS! Welcome in, welcome in. Just out here moving and grooving. What's up?",
  "What's good dudskies! Philsey here, ready to wheel and deal. Drop me your question dawg.",
  "Big dawg! You caught me mid-vibe-code session. What's on your mind? Go Dawgs.",
  "Ayyyye what's up! Just had a little goose dose this morning and feeling good. What we working on dawg?",
];

const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

console.log("\n" + "=".repeat(60));
console.log("  PHILSEY AGENT");
console.log("  Vibe Coder | UGA Theologian | Midnight Refactorer");
console.log("=".repeat(60));
console.log(`\n${greeting}\n`);
console.log('Type your message and press Enter. Type "exit" to quit.\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(): Promise<string> {
  return new Promise((resolve) => {
    rl.question("\x1b[36mYou:\x1b[0m ", (answer) => {
      resolve(answer);
    });
  });
}

const THINKING_MESSAGES = [
  "Philsey is thinking...",
  "Consulting the dawg logs...",
  "Vibe coding a response...",
  "Channeling the Goose...",
  "Barking up the right tree...",
  "Running it through the dawg filter...",
  "Midnight refactoring thoughts...",
  "Checking between the hedges...",
  "Loading dawg wisdom...",
  "Tuning into the jam...",
  "Sniffing out the answer...",
  "Brewing up some dawg sauce...",
  "Asking the UGA elders...",
  "Deep in the vibe zone...",
  "Fetching big dawg energy...",
];

function startSpinner(): () => void {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const message = THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)];
  let i = 0;
  process.stdout.write(`\x1b[33m${frames[0]} ${message}\x1b[0m`);
  const timer = setInterval(() => {
    i = (i + 1) % frames.length;
    process.stdout.write(`\r\x1b[33m${frames[i]} ${message}\x1b[0m`);
  }, 80);
  return () => {
    clearInterval(timer);
    process.stdout.write("\r\x1b[K");
  };
}

function extractText(message: SDKMessage): string | null {
  if (message.type === "assistant") {
    const textBlocks = (message.message as any).content?.filter(
      (block: any) => block.type === "text"
    );
    if (textBlocks?.length) {
      return textBlocks.map((b: any) => b.text).join("");
    }
  }
  if (message.type === "result" && (message as any).subtype === "success") {
    return (message as any).result || null;
  }
  return null;
}

async function chat(userMessage: string, sessionId?: string): Promise<string | undefined> {
  async function* generateMessages(): AsyncGenerator<SDKUserMessage> {
    yield {
      type: "user" as const,
      session_id: sessionId ?? "",
      parent_tool_use_id: null,
      message: {
        role: "user" as const,
        content: userMessage,
      },
    };
  }

  const options: Record<string, any> = {
    systemPrompt: PHILSEY_SYSTEM_PROMPT,
    mcpServers: {
      "philsey-tools": philseyToolServer,
    },
    allowedTools: [
      "mcp__philsey-tools__get_goose_recommendation",
      "mcp__philsey-tools__dawgify",
      "mcp__philsey-tools__philsey_wisdom",
    ],
    maxTurns: 5,
    model: "claude-sonnet-4-5-20250929",
  };

  if (sessionId) {
    options.resume = sessionId;
  }

  let capturedSessionId: string | undefined;
  let fullResponse = "";

  const stopSpinner = startSpinner();

  try {
    const response = query({
      prompt: generateMessages(),
      options,
    });

    for await (const message of response) {
      if (message.type === "system" && (message as any).subtype === "init") {
        capturedSessionId = message.session_id;
      }

      const text = extractText(message);
      if (text && message.type === "assistant") {
        fullResponse = text;
      }

      if (message.type === "result") {
        const result = message as any;
        if (result.subtype === "success" && result.result) {
          fullResponse = result.result;
        }
      }
    }
  } finally {
    stopSpinner();
  }

  if (fullResponse) {
    console.log(`\n\x1b[33mPhilsey:\x1b[0m ${fullResponse}\n`);
  }

  return capturedSessionId;
}

async function main() {
  let sessionId: string | undefined;

  while (true) {
    const userInput = await prompt();

    if (!userInput.trim()) continue;
    if (userInput.trim().toLowerCase() === "exit") {
      console.log(
        "\n\x1b[33mPhilsey:\x1b[0m Alright big shooter, I'm out. Go Dawgs! 🐾\n"
      );
      rl.close();
      process.exit(0);
    }

    try {
      const newSessionId = await chat(userInput, sessionId);
      if (newSessionId) {
        sessionId = newSessionId;
      }
    } catch (error: any) {
      console.error(`\n\x1b[31mError:\x1b[0m ${error.message}\n`);
    }
  }
}

main();
