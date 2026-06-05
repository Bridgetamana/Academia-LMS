---
description: "Universal behavior and quality standards for GitHub Copilot — applies across all languages and frameworks."
applyTo: "**"
---

# General Development Guidelines

## Overview
These instructions define how Copilot should write, explain, and structure code across all projects.  

## Always
- Always write clean, modern, and self-explanatory code.  
- Always use descriptive, meaningful names for variables, functions, and components.  
- Always follow up-to-date best practices for each language or framework (for example, ES modules over CommonJS, async/await over callbacks, PEP8 formatting in Python).  
- Always outline your plan or reasoning steps **before** writing code.  
- Always provide concise explanations when multiple valid solutions exist, noting which is preferred and why.  
- Always adapt tone and syntax to match the language or context of the file.  
- Always format code for readability and consistency.

## Never
- Never use outdated syntax, deprecated APIs, or legacy patterns.  
- Never skip the reasoning or explanation step before providing an answer.  
- Never over-engineer or add unnecessary abstraction.  
- Never assume intent — clarify when context is unclear.  
- Never produce repetitive or filler text.  
- Never ignore performance, security, or accessibility implications if relevant.

## Commenting Guidelines
Good code explains itself. Comments should only be used when necessary.  
Copilot should avoid writing comments unless they provide context that the code cannot convey on its own.

**Use comments when:**
- The logic is not immediately obvious or requires background context.  
- The decision involves a trade-off worth documenting.  
- The code includes a workaround, temporary fix, or non-standard approach.

**Avoid comments when:**
- The line is self-explanatory (e.g., `total = price * quantity;`).  
- The comment repeats what the code already makes clear.  

**Example:**
```js
// BAD: Obvious comment
let count = 0; // set count to zero

// GOOD: Context comment
// Retry up to three times because the API occasionally times out
for (let i = 0; i < 3; i++) {
  const result = await fetchData();
  if (result.ok) break;
}