# Arabella's Weddings & Events website

The site is a Next.js app in `nextjs/`.

## Local preview (localhost:3000)

- At the start of every chat, open http://localhost:3000 in the browser pane. Use `preview_start` with the `website` configuration from `.claude/launch.json`. If port 3000 is already taken, check whether it's this site's dev server (usually started in a terminal). If so, don't start a second copy; `navigate` the browser pane to http://localhost:3000 instead.
- After any change to the site, reload the preview and show the page that changed.
- `npm` is not on PATH in Claude's shell. Node lives at `C:\Program Files\nodejs`, so call `node.exe` or `npm.cmd` by that full path.
