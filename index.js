import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { OpenAI } from "openai";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORG_ID,
  project: process.env.PROJECT_ID,
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  console.log(message.content);
});

client.login(process.env.TOKEN);

const thread = await openai.beta.threads.create({});

console.log("thread", thread);

async function threadExists() {
  try {
    const threads = await openai.beta.threads.list();
    console.log(threads);
  } catch (error) {
    console.error("Error retrieving threads:", error);
    return false;
  }
}

threadExists();

// const completion = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [{ role: "user", content: "Are you a bot?" }],
// });

// console.log(completion.choices[0].message);
