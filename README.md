# plan-to-pr

A planning framework for AI-assisted development and the foundation for agentic coding workflows.

## Prerequisites

- [Claude Code](https://claude.ai/code) or [Cursor](https://www.cursor.com)
- [Node.js](https://nodejs.org) 18 or later (for the install script)

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
the work. It is assumed that the implementing agent will only have the task 
document and the surface area of whatever it is working on. All relevant context 
must exist in that file. Any agent should be able to read the document, understand 
the intention, and produce a verifiable outcome.

Implementation is adhering to the plan. Not interpreting nor extending it.

## Designed for delegation

Humans cannot micro-manage agentic systems without becoming a bottleneck to
them. To delegate means to set expectations and verify that the work is being
done as it should. That is what this framework makes possible.

The plan is where human judgment lives — not as a checkpoint on every action,
but as an upfront decision about what success looks like. The task document is
the delegation contract: it captures what the human decided, what the agent is
responsible for, and how to verify the handoff worked. Once that contract exists,
the agent executes against it autonomously. The human comes back at the end to
verify the outcome, not to supervise the steps.

This is why plan-to-pr has no opinion on how task documents are implemented or
how the resulting code is tested and deployed. Specifying the how would be
micro-management. The framework specifies the what — intent, scope, and
acceptance criteria — and leaves everything else to the agent. Any agent,
harness, or developer that can read a task document and produce a verifiable
outcome satisfies the contract.

## Human judgment is the foundation

This framework embeds human judgment. The breakdown is where scope, intent,
and task boundaries are decided by a human. Every step after formalizes and
verifies that decision.

This system is only as concrete as the human judgment embedded in it. If
someone does not understand the problem, this system will reveal that. The
gaps in the breakdown are the gaps in the thinking.

## The cycle

```
workflow        orchestrate the full cycle for a piece of work
  breakdown     decompose work into a reviewable task list [human judgment gate]
  write-task    produce a self-contained task document
  verify-task   confirm the document is executable without extra context
  create-tracker sequence and track all tasks for implementation
  implement     adhere to the task document
  [Human UAT]
  feedback      if the outcome fell short, capture the gap and amend the task doc
  create-pr     prove the intention was met
```

## How the skills are designed

Each skill has a single stated responsibility. It does exactly that and
nothing else. Every skill opens by declaring what it does and, just as
importantly, what it will not do. This negative framing is intentional.
It constrains the agent to its role and prevents scope from bleeding
between steps.

The skills are interconnected. Each one's output is the next one's input.

`/breakdown` produces the task list that `/write-task` documents. 

`/write-task` produces the documents that `/verify-task` checks. 

`/verify-task` produces the report that informs `/create-tracker`. 

`/create-pr` closes the loop that `/breakdown` opened. 

`/feedback` re-enters the cycle when UAT reveals a gap.

The planning skills (`/breakdown` and `/write-task`) include a confidence
rating in their output (`high | med | low`). This gives the human a signal 
on how well the work is scoped before deciding to proceed. A low confidence 
rating is not a failure. It surfaces where the thinking needs to go deeper 
before implementation begins.

## Installation

```
node install.js
```

The script detects your existing setup, checks for conflicting command names,
and prompts for a prefix if needed. Supports Claude Code and Cursor, project-level
or global.

## Skills

### workflow
- **Responsibility:** Sequences the full planning cycle and enforces the human judgment gate at the breakdown.
- **Does not:** implement, write task documents, or advance to the next step without explicit user approval.
- **Connects to:** runs breakdown, write-task, verify-task, and create-tracker in order; routes to feedback or create-pr after implementation.

### breakdown
- **Responsibility:** Decomposes work into a scoped, ordered, confidence-rated task list for human review. LOW confidence tasks surface a gap that needs human direction before a task document can be written.
- **Does not:** write task documents, make implementation decisions, or proceed without approval.
- **Connects to:** outputs the approved task list and overview that write-task turns into implementation guides, one task at a time.

### write-task
- **Responsibility:** Produces the self-contained implementation guide an agent needs to execute one approved task.
- **Does not:** implement anything, produce more than one document per invocation, or save without a confirmed location.
- **Connects to:** reads the overview's codebase analysis as starting context; consumes one approved task from breakdown; output is verified by verify-task.

### verify-task
- **Responsibility:** Confirms each task document is executable by a cold agent with no context beyond the file and the codebase.
- **Does not:** modify, edit, or rewrite any task document.
- **Connects to:** reads documents produced by write-task alongside the overview; findings determine whether create-tracker can proceed.

### create-tracker
- **Responsibility:** Produces a lean status tracker from verified task documents so any agent or developer can orient and resume work cold.
- **Does not:** implement tasks, modify task documents, or proceed if dependencies cannot be resolved.
- **Connects to:** consumes verified documents from verify-task; each task in the tracker closes with create-pr.

### create-pr
- **Responsibility:** Produces a PR summary that proves an intention was met, framed as intention, outcome, value, and verification.
- **Does not:** push, create, or modify the PR without explicit instruction.
- **Connects to:** closes the loop on each task from create-tracker; follows implementation and human UAT.

### feedback
- **Responsibility:** Captures a UAT finding and appends a correction to the existing task document without touching existing content.
- **Does not:** modify or remove existing task document content, or write anything before the gap is confirmed by the human.
- **Connects to:** amends the task document produced by write-task; the correction is implemented before create-pr is invoked.
