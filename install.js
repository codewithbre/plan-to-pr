#!/usr/bin/env node
'use strict';

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS = ['workflow', 'breakdown', 'write-task', 'verify-task', 'create-tracker', 'create-pr', 'feedback'];
const AGENT = 'task-doc-verifier';
const SCRIPT_DIR = __dirname;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q + ' ', resolve));

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function copyFileWithReplacement(src, dest, from, to) {
  const content = fs.readFileSync(src, 'utf8').split(from).join(to);
  fs.writeFileSync(dest, content, 'utf8');
}

function checkConflicts(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return SKILLS.filter(s => fs.existsSync(path.join(dir, `${s}.${ext}`)));
}

async function main() {
  console.log('\nplan-to-pr install\n------------------\n');

  // Scope
  console.log('Install scope:');
  console.log('  1) Project-level (current directory)');
  console.log('  2) Global (home directory)');
  const scope = (await ask('Choose [1/2]:')).trim();
  console.log('');

  const base = scope === '2' ? os.homedir() : process.cwd();
  const claudeSkills = path.join(base, '.claude', 'commands');
  const claudeAgents = path.join(base, '.claude', 'agents');
  const cursorRules  = path.join(base, '.cursor',  'rules');

  if (scope !== '1' && scope !== '2') {
    console.error('Invalid choice. Exiting.');
    process.exit(1);
  }

  // Tool
  console.log('Install for:');
  console.log('  1) Claude Code');
  console.log('  2) Cursor');
  console.log('  3) Both');
  const tool = (await ask('Choose [1/2/3]:')).trim();
  console.log('');

  if (!['1', '2', '3'].includes(tool)) {
    console.error('Invalid choice. Exiting.');
    process.exit(1);
  }

  // Conflict detection
  let conflicts = [];
  if (tool === '1' || tool === '3') conflicts.push(...checkConflicts(claudeSkills, 'md'));
  if (tool === '2' || tool === '3') conflicts.push(...checkConflicts(cursorRules,  'mdc'));
  conflicts = [...new Set(conflicts)];

  let prefix = '';
  if (conflicts.length > 0) {
    console.log('These skill names already exist in the destination:');
    conflicts.forEach(c => console.log(`  ${c}`));
    console.log('');
    prefix = (await ask('Enter a prefix to avoid conflicts (e.g. p2p-), or press Enter to overwrite:')).trim();
    console.log('');
  }

  // Install Claude Code
  if (tool === '1' || tool === '3') {
    fs.mkdirSync(claudeSkills, { recursive: true });
    fs.mkdirSync(claudeAgents, { recursive: true });

    for (const skill of SKILLS) {
      const src  = path.join(SCRIPT_DIR, 'skills', `${skill}.md`);
      const dest = path.join(claudeSkills, `${prefix}${skill}.md`);
      if (prefix) {
        copyFileWithReplacement(src, dest, AGENT, `${prefix}${AGENT}`);
      } else {
        copyFile(src, dest);
      }
    }

    const agentSrc  = path.join(SCRIPT_DIR, 'agents', `${AGENT}.md`);
    const agentDest = path.join(claudeAgents, `${prefix}${AGENT}.md`);
    if (prefix) {
      copyFileWithReplacement(agentSrc, agentDest, `name: ${AGENT}`, `name: ${prefix}${AGENT}`);
    } else {
      copyFile(agentSrc, agentDest);
    }

    console.log(`Claude Code: installed to ${claudeSkills}`);
  }

  // Install Cursor
  if (tool === '2' || tool === '3') {
    fs.mkdirSync(cursorRules, { recursive: true });
    for (const skill of SKILLS) {
      const src  = path.join(SCRIPT_DIR, 'skills', `${skill}.md`);
      const dest = path.join(cursorRules, `${prefix}${skill}.mdc`);
      copyFile(src, dest);
    }
    console.log(`Cursor:      installed to ${cursorRules}`);
  }

  console.log('');
  if (prefix) {
    console.log(`Invoke as /${prefix}workflow, /${prefix}breakdown, etc.`);
  } else {
    console.log('Invoke as /workflow, /breakdown, etc.');
  }

  rl.close();
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
