---
sidebar_position: 4
title: Tool Calling & AI Agents
---

# Tool Calling & AI Agents

RAG lets a model *read* your data. **Tool calling** lets a model *act* — query a database, call an API, create a record — by asking your backend to run functions you've defined.

## How tool calling works

1. You describe available tools (name, description, JSON schema of arguments) to the model.
2. The model, instead of replying with text, may respond: "call `searchKnowledgeBase` with `{query: '...'}`".
3. **Your code** executes that function and returns the result to the model.
4. The model uses the result to produce its final answer (or calls another tool).

The model never runs anything itself — it only *requests* a call. Your backend stays in control of every action.

```js
const tools = [
  {
    type: 'function',
    function: {
      name: 'createTicket',
      description: 'Create a support ticket',
      parameters: {
        type: 'object',
        properties: {
          title: {type: 'string'},
          priority: {type: 'string', enum: ['low', 'medium', 'high']},
        },
        required: ['title'],
      },
    },
  },
];

const res = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
  tools,
});

const call = res.choices[0].message.tool_calls?.[0];
if (call?.function.name === 'createTicket') {
  const args = Ticket.parse(JSON.parse(call.function.arguments)); // validate!
  const ticket = await ticketService.create(args);               // you run it
  // send the result back to the model for its final response
}
```

## From tools to agents

An **agent** is a loop: the model calls tools, observes results, and decides the next step until the task is done. Agents add:

- **Multi-step workflows** — chain several tool calls to accomplish a goal.
- **State & checkpoints** — persist progress so long tasks can resume.
- **Planning** — the model decides which tools to use and in what order.

Start simple. Reach for an agent framework (**OpenAI Agents SDK**, **LangGraph**, etc.) only when the use case genuinely needs orchestration — don't add agent complexity to what a single tool call solves.

## Safety: the non-negotiables

Giving a model the ability to act is powerful and dangerous. Wrap every tool with guardrails:

- **Permission checks** — enforce the *user's* authorization on each tool, server-side. The model must never be able to exceed what the user is allowed to do.
- **Input validation** — validate tool arguments with Zod before executing; the model can produce malformed or malicious args.
- **Human-in-the-loop approval** — for consequential actions (sending email, charging money, deleting data), require explicit user confirmation before executing.
- **Timeouts & budgets** — cap how many tool calls / tokens / dollars a single task may consume to prevent runaway loops.
- **Audit logs** — record every tool call, its arguments, and its result for debugging and accountability.

```js
async function runTool(name, args, user) {
  assertUserMayUse(user, name);          // authorization
  const safeArgs = schemas[name].parse(args); // validation
  if (isConsequential(name) && !args._approved) {
    return {status: 'needs_confirmation'}; // human approval
  }
  logger.info({userId: user.id, tool: name, args: safeArgs}, 'tool call');
  return tools[name](safeArgs);
}
```

:::danger
A tool-calling agent effectively lets an LLM — steered by untrusted user input and untrusted documents — trigger real actions in your system. Authorization, validation, and human approval are what stand between "helpful assistant" and "confused deputy deleting your database."
:::

## Build

An **AI support assistant** that can search your knowledge base (RAG) and create support tickets via tool calling — but only creates a ticket after the user explicitly confirms, with every action authorized and logged.
