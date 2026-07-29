# Personal homepage + blog

A simple, no-build static site for GitHub Pages. Plain HTML/CSS/JS with a
lightweight markdown blog.

## Files

```
index.html        # homepage: intro + blog section
styles.css        # styling (dark theme, single accent color)
app.js            # loads the post list and renders markdown posts
posts/
  index.json      # list of posts (title, date, excerpt, slug)
  *.md            # one markdown file per post
```

## Publishing to GitHub Pages

1. Create a repo named `yourusername.github.io` (replace with your GitHub username).
2. Put these files in the root of that repo and push to the `main` branch.
3. In the repo, go to **Settings → Pages** and confirm the source is
   `main` / root. (For a `username.github.io` repo it's usually on by default.)
4. Visit `https://yourusername.github.io` in a minute or two.

To host it under an existing repo instead (e.g. `github.io/blog`), put the files
in a `/docs` folder and set Pages source to `main` / `/docs`.

## Personalize

- **Intro:** edit the `#about` section in `index.html` (name, tagline, links).
- **Avatar:** the circle shows initials from `.avatar`; swap in an `<img>` if you
  prefer a photo.
- **Links:** update the GitHub / LinkedIn / email URLs in `index.html`.

## Add a blog post

1. Create `posts/my-post-slug.md` with your content (plain markdown).
2. Add an entry to `posts/index.json`:

   ```json
   {
     "slug": "my-post-slug",
     "title": "My Post Title",
     "date": "2026-07-23",
     "excerpt": "One-line summary shown on the list."
   }
   ```

3. Commit and push. The post appears automatically, newest first, and is
   deep-linkable at `yourusername.github.io/#my-post-slug`.

## Local preview

GitHub Pages serves these files statically, but the blog uses `fetch()`, which
browsers block on `file://`. Run a local server instead:

```bash
cd github-io-site
python3 -m http.server 8000
# open http://localhost:8000
```
