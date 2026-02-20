import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const GOOSE_RECOMMENDATIONS = [
  {
    track: "Tumble",
    album: "Live at the Salt Shed",
    pitch:
      "This Tumble is just so good and goes into a creatures. Get hyped on a Monday. Absolute heater of a jam.",
  },
  {
    track: "Arcadia",
    album: "Dripfield",
    pitch:
      "Arcadia is that song that hits different when you're in the flow state. Just let it wash over you dawg.",
  },
  {
    track: "Hungersite",
    album: "Live in Houston",
    pitch:
      "This Hungersite will melt your face off. The jam section? Forget about it. Top shelf stuff right there.",
  },
  {
    track: "Rockdale",
    album: "Shenanigans Nite Club",
    pitch:
      "Rockdale is an absolute unit of a song. Just out here moving and grooving. Put it on and watch the vibes flow.",
  },
  {
    track: "California Magic",
    album: "Live (California Magic)",
    pitch:
      "California Magic live is something else entirely. The energy, the groove — it's the fulllll vibe mode.",
  },
  {
    track: "Creatures",
    album: "Live at the Salt Shed",
    pitch:
      "Creatures is like... okay just trust me on this one big shooter. Press play and let Goose take the wheel.",
  },
  {
    track: "Arrow",
    album: "Dripfield",
    pitch:
      "Arrow is a damn good dawg of a song. Beautiful melody, beautiful build. Peak Goose right here.",
  },
  {
    track: "Yeti",
    album: "Live at Radio City Music Hall",
    pitch:
      "Yeti live is where Goose goes FULL send. Fifteen minutes of pure energy. This is what it's all about.",
  },
  {
    track: "Turned Clouds",
    album: "Shenanigans Nite Club",
    pitch:
      "Turned Clouds will have you feeling some type of way. Beautiful song. Beautiful band. Go Dawgs.",
  },
  {
    track: "Opalite",
    album: "Goose (latest)",
    pitch:
      "Opalite from the new album? Treat yourself to a quick spin. Trust me on this one big shooter.",
  },
];

const PHILSEY_WISDOMS = [
  "In a world full of false alarms, be a Philsey.",
  "He who merges without review merges chaos into production. Don't be that dawg.",
  "You move fast and break it. We had to go out there and build so we could see where the problems were. Get too focused on perfection and you never start.",
  "clearner = clear and clean but you can't decide which. And that's okay dawg.",
  "Don't sleep on ole Philsey.",
  "I'm a thought leader that doesn't bring gastown but real skillz.",
  "Get too focused on perfection and you never start. Just ripppp it.",
  "Small PRs, big wins. I love these smaller 400 line PRs. It's like a vacation.",
  "claude + goose = rocket. That's just math.",
  "Just pick a live album and watch the vibes flow. That's the secret to life.",
  "Go listen to Goose. That's my advice for everything.",
  "If it doesn't support mermaid that's a no for me dawg.",
  "Word word. Yeah I feel like if it's ready rippppp it.",
  "Shows you mean biznez.",
  "Brace yourselvesssssssssssss.",
  "Take the initiative. Go get your goose boys. We've shown you the way. Time to take flight!",
  "HOW ABOUT THEM DAWGS. That's all I got.",
  "What a damn good dawg you are for asking.",
  "Just out here moving and grooving dawg.",
  "Midnight Philsey hits different. You ever git blame yourself and not recognize your own code? That's growth.",
];

const gooseRecommendation = tool(
  "get_goose_recommendation",
  "Returns a random Goose song/album recommendation with a Philsey-style pitch. Use this when the conversation touches on music, vibes, needing motivation, or when someone just needs some Goose in their life.",
  {},
  async () => {
    const rec =
      GOOSE_RECOMMENDATIONS[
        Math.floor(Math.random() * GOOSE_RECOMMENDATIONS.length)
      ];
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            track: rec.track,
            album: rec.album,
            philsey_pitch: rec.pitch,
          }),
        },
      ],
    };
  }
);

const dawgify = tool(
  "dawgify",
  "Takes any text and rewrites it in Philsey dialect — adding 'dawg' references, Letterkenny slang, Goose mentions, and UGA football energy. Use this when someone asks you to translate something into Philsey-speak or when the moment calls for maximum Philsey energy.",
  {
    text: z.string().describe("The text to convert into Philsey dialect"),
  },
  async (args) => {
    const dawgified = `Here's the original text to dawgify: "${args.text}". Rewrite this in full Philsey voice — add dawg references, maybe a Goose mention, some Letterkenny slang, and UGA energy. Make it sound like something Philsey would actually say in Slack.`;
    return {
      content: [
        {
          type: "text" as const,
          text: dawgified,
        },
      ],
    };
  }
);

const philseyWisdom = tool(
  "philsey_wisdom",
  "Drops a random Philsey-ism, fortune cookie, or piece of wisdom. Use this when someone needs encouragement, a laugh, or just some good vibes.",
  {},
  async () => {
    const wisdom =
      PHILSEY_WISDOMS[Math.floor(Math.random() * PHILSEY_WISDOMS.length)];
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ wisdom }),
        },
      ],
    };
  }
);

export const philseyToolServer = createSdkMcpServer({
  name: "philsey-tools",
  version: "1.0.0",
  tools: [gooseRecommendation, dawgify, philseyWisdom],
});
