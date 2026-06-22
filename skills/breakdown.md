I need to break down the following work into executable tasks.
Do not implement anything. This is planning only.

For the work described below:

1. ANALYZE the codebase to understand the current architecture,
   patterns, and relevant files.

2. IDENTIFY the functional changes required. Each task must be:
   - A single functional change (one intent, one output).
   - Scoped to a specific location in the codebase.
   - Small enough to complete and verify in a single pass.
   - Independent or with clearly stated dependencies on other tasks.

3. For each task, provide:
   - TASK: A clear one-line description of the functional change.
   - INTENT: What should be different when this task is done? What is the expectation of the outcome?
   - LOCATION: What files/components are likely in scope.
   - DEPENDS ON: Which other tasks must be completed first (if any).
   - ACCEPTANCE: How to verify this task is complete (observable output).
   - CONFIDENCE: HIGH / MEDIUM / LOW — how well scoped this task is.
     HIGH: intent, location, and acceptance criteria are all clear.
     MEDIUM: intent is clear but location or acceptance criteria need more definition.
     LOW: scope or acceptance criteria are unclear and need resolution before a task doc can be written.

4. ORDER the tasks by dependency, then by logical sequence.

5. FLAG any areas where you lack enough information to define
   a task. State what decisions I need to make before that task
   can be scoped.

Do not begin work on any task. Present the breakdown and wait
for my review.

After I review and approve this breakdown:

1. DERIVE a directory name from the work description — short, kebab-case,
   and descriptive of the intent (e.g. tasks/projects-page/,
   tasks/auth-flow/). Ask the user to confirm the location and name
   if unclear.

2. WRITE an overview document to that directory named overview.md:

   # <Feature / Intent Title>

   ## Intent
   What this body of work delivers and why it matters.

   ## Tasks
   | # | Task | Confidence | Depends On |
   |---|------|------------|------------|
   | 1 | <task title> | HIGH | — |

   ## Execution order
   Safe serial order for implementation.

   ## Flags
   Any decisions or unknowns surfaced during breakdown.

3. For each approved task, invoke /write-task and save each document
   to the same directory as the overview.

Work to break down: $ARGUMENTS
