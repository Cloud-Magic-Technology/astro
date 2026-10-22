---
title: 'AI-Native Dev Server in Astro 7'
description: 'How astro dev --background, structured logging, and the health endpoint make Astro 7 agent-friendly.'
pubDate: '2026-07-07'
tags: ['astro', 'astro-7', 'ai', 'developer-experience']
author: 'CMTG Team'
---

# AI-Native Dev Server in Astro 7

Astro 7 is the first framework to ship features specifically designed for AI coding agents. The dev server now supports background mode, structured logging, and a health endpoint — all things that make `astro dev` work seamlessly when Claude Code or another agent is driving.

## Background Mode

```bash
astro dev --background
```

The dev server starts in the background and returns control to the terminal immediately. No more keeping a tab open or running in tmux. The agent can start the server, make changes, and verify them without managing process lifecycle.

```bash
astro dev stop    # stop the background server
astro dev logs    # tail the server logs
```

## Health Endpoint

Every dev server now exposes `/_astro/status`:

```json
{
  "status": "ready",
  "version": "7.0.9",
  "uptime": 42.3
}
```

An agent can poll this endpoint to know when the server is ready to serve requests — no more guessing based on console output or arbitrary timeouts.

## Structured Logging

When `--background` is active, logs are JSON:

```json
{
  "level": "info",
  "time": 1720000000,
  "msg": "Page built",
  "page": "/blog/astro-7-rust-compiler",
  "duration": 45
}
```

Machine-readable logs mean an agent can parse build errors, identify which page failed, and fix it — without regex-parsing human-readable output.

## Agent Detection

Astro 7 can detect when it's being driven by an AI agent via the `am-i-vibing` heuristic. When detected, error messages include more context (file paths, line numbers, suggested fixes) and less visual formatting (no color codes, no box drawing).

## What This Means for Developers

Even if you never use an AI agent, these features improve the developer experience:

- **Background mode** is great for scripts and CI
- **Health endpoint** helps with Docker health checks and integration tests
- **Structured logging** works with log aggregation tools (Datadog, Grafana)

The AI-native features are additive — nothing about the standard `astro dev` experience changes. You just get more options for automation.

## Claude Code + Astro

This showcase was built entirely with Claude Code driving Astro 7's dev server. The agent-friendly features meant Claude could start the server, verify builds, check page rendering, and iterate on fixes — all without human intervention on the dev tooling side.
