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

## How the skills are designed

Each skill has a single stated responsibility. It does exactly that and
nothing else. Every skill opens by declaring what it does and, just as
importantly, what it will not do. This negative framing is intentional.
It constrains the agent to its role and prevents scope from bleeding
between steps.

The skills are interconnected. Each one's output is the next one's input.
/breakdown produces the task list that /write-task documents. /write-task
produces the documents that /verify-task checks. /verify-task produces the
report that informs /create-tracker. /create-pr closes the loop that
/breakdown opened. /feedback re-enters the cycle when UAT reveals a gap.

The planning skills (/breakdown and /write-task) include a confidence
rating in their output. This gives the human a signal on how well the
work is scoped before deciding to proceed. A low confidence rating is not
a failure. It is useful information. It surfaces where the thinking needs
to go deeper before implementation begins.

## Installation

### Claude Code

```bash
# project-level (applies to this repo only)
cp -r skills/ your-project/.claude/commands/

# global (applies to all projects)
cp -r skills/ ~/.claude/commands/
```

Skills are available as slash commands in Claude Code once installed.

### Cursor

Cursor expects `.mdc` files, so rename them on copy:

```bash
# project-level
mkdir -p your-project/.cursor/rules
for f in skills/*.md; do
  cp "$f" "your-project/.cursor/rules/$(basename ${f%.md}.mdc)"
done

# global
mkdir -p ~/.cursor/rules
for f in skills/*.md; do
  cp "$f" ~/.cursor/rules/$(basename ${f%.md}.mdc)
done
```

Once installed, attach rules manually in Cursor's composer or set them as
agent-requested so the AI pulls them in when relevant.

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
