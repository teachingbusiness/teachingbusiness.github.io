# Teaching Business — Hub Site

**Repo:** `teachingbusiness/teachingbusiness.github.io`  
**Stack:** Angular 21 + Angular Material 21 + @angular/ssr (`outputMode: static`) + SCSS  
**Deploy:** GitHub Pages via `.github/workflows/deploy.yml` — push to `main` triggers build; static output at `dist/tbio/browser/`

## Key Files

- `angular.json` — build config; `outputMode: static` is the SSG flag
- `src/app/layout/shell/` — Material sidenav shell (signal-based mobile breakpoint)
- `src/app/pages/{home,projects,blog,about}/` — lazy-loaded page components
- `src/app/app.routes.ts` — route definitions (Shell wraps all child routes)
- `src/styles.scss` — global Material theme (`mat.theme()` mixin)
- `public/.nojekyll` — prevents GitHub Pages from running Jekyll

## Build & Serve

```bash
npm run build   # SSG build → dist/tbio/browser/
ng serve        # dev server with HMR
```

## Angular Conventions

- Use signal APIs (`signal()`, `computed()`, `toSignal()`) — not RxJS observables in templates
- Do not use async pipe in event bindings — use signals instead
- Components are standalone (no NgModule)
- Inject with `inject()` function, not constructor injection
- SCSS for all styles; Material CSS variables (`--mat-sys-*`) for theming

---

## Agent Execution Protocol

This project uses GitHub Issues + Project #5 ("Teaching Business") as a work-dispatch and persistent memory system. Follow this protocol when picking up issues.

### Picking Up Work

1. Read the assigned issue body fully, then read the parent epic/story body.
2. Confirm the issue is still available: `gh issue view <N> --repo teachingbusiness/teachingbusiness.github.io`
3. Claim the issue — set status and label:
   ```bash
   gh issue edit <N> --repo teachingbusiness/teachingbusiness.github.io \
     --add-label "agent-active" --remove-label "agent-ready"
   # Then update Status to "In progress" in Project #5 via the web UI or API
   ```
4. Post a start comment:
   ```
   **Agent starting work**
   Branch: feat/<slug>
   Plan: <1–2 sentence summary of approach>
   ```

### Implementation

- Branch per story: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`
- Commit referencing the issue: `git commit -m "type(scope): description\n\nImplements #N"`
- Open PR: `gh pr create --title "..." --body "Closes #N"`

### Progress Comments

Post at discrete checkpoints (especially for longer tasks) so work survives context compaction:

```
**Progress update**
Completed:
- [x] Step one done
- [x] Step two done
Remaining:
- [ ] Step three
No blockers.
```

### Blocked

Stop immediately. Do not proceed with assumptions.

```bash
gh issue edit <N> --repo teachingbusiness/teachingbusiness.github.io \
  --add-label "blocked" --remove-label "agent-active"
```

Post comment:
```
**Blocked — human input needed**
Issue: <exact description>
What I tried: <what was attempted>
What is needed: <specific decision or information>
Ready to resume when: <condition>
```

### Completing Work

PR merge auto-closes the issue via `Closes #N`. Post a completion comment:

```
**Work complete**
PR merged: #<pr-number>
Acceptance criteria verified:
- [x] ...
```

### Parallel Safety

Only pick up issues with `agent-ready` label. An issue is claimed the moment the start comment is posted and status changes to `In progress`. No two agents should touch the same issue.

---

## Issue Hierarchy

```
Epic  [type: epic]
└── Story  [type: story]   ← Claude executes at this level
    └── Task  [type: task] ← atomic step; parallelizable across agents
```

Labels use three orthogonal axes: `type:`, `domain:`, and state tags (`agent-ready`, `agent-active`, `blocked`, `needs: *`).

Project views: **Agent Queue** (dispatch surface) → **Sprint Board** (daily work) → **Epic Roadmap** (strategic).
