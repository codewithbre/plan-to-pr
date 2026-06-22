# plan-to-pr

A planning framework for AI-assisted feature development.

## Why this exists

For agentic and AI-assisted development to work, work needs to be broken
down into deliverable and auditable tasks based on intention and verified
by outcome. Every problem is expected to have its quirks, but AI needs a
system to be able to help.

It is a developer cycle from planning to PR, applicable to work of any size, 
from a quick focused task to a full epic.

## How it works

The planning skills operate under the assumption that the implementing agent
will be working with less context than the person/agent who designed/planned 
the work. It is assumed that the implemnting agent will only have the task 
document and the surface area of whatever it is working on. All relevant context 
must exist in that file. Any agent should be able to read the document, understand 
the intention, and produce a verifiable outcome.

Implementation is adhering to the plan. Not interpreting nor extending it.

## Human judgment is the foundation

This framework embeds human judgment. The breakdown is where scope, intent,
and task boundaries are decided by a human. Every step after formalizes and
verifies that decision.

This system is only as concrete as the human judgment embedded in it. If
someone does not understand the problem, this system will reveal that. The
gaps in the breakdown are the gaps in the thinking.

## The cycle

```
/workflow        orchestrate the full cycle for a piece of work
  /breakdown     decompose work into a reviewable task list       [human judgment gate]
  /write-task    produce a self-contained task document
  /verify-task   confirm the document is executable without extra context
  /create-tracker sequence and track all tasks for implementation
  implement      adhere to the task document
  Human UAT
  /feedback      if the outcome fell short, capture the gap and amend the task doc
  /create-pr     prove the intention was met
```

## Installation

Copy the `.claude/commands/` directory into your project or global Claude
Code config:

```bash
# project-level (applies to this repo only)
cp -r .claude/commands/ your-project/.claude/commands/

# global (applies to all projects)
cp -r .claude/commands/ ~/.claude/commands/
```

Skills are available as slash commands in Claude Code once installed.

## Skills

### /workflow
The entry point for the full cycle. Invoke this with a description of the
work and it will orchestrate each step in sequence, enforcing the human
judgment gate at the breakdown before any documents are written or
implementation begins.

### /breakdown
Decomposes a piece of work into a list of scoped, ordered tasks. Presents
the breakdown for human review and waits for approval. Does not write
documents or make decisions.

### /write-task
Produces a single self-contained task document for one approved task. The
document must be executable by any agent with no context beyond the file
and the codebase.

### /verify-task
Spawns a fresh agent to read each task document cold and confirm it is
self-contained and executable. Surfaces gaps without editing the documents.

### /create-tracker
Produces an IMPLEMENTATION.md from the verified task documents. Sequences
tasks by dependency and provides a session-by-session execution guide.

### /create-pr
Produces a PR summary framed as proof that an intention was met. Title,
intention, outcome, value, and verification. Not a changelog.

### /feedback
Captures a UAT finding and appends a correction to the existing task
document without modifying original content. The gap is confirmed by the
human before anything is written.
