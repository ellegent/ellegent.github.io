// Simple markdown blog loader for a GitHub Pages site.
// To add a post: drop a .md file in posts/ and add an entry to posts/index.json.

document.getElementById("year").textContent = new Date().getFullYear();

const listEl = document.getElementById("post-list");
const viewEl = document.getElementById("post-view");
const contentEl = document.getElementById("post-content");
const backBtn = document.getElementById("back-btn");

async function loadIndex() {
  try {
    const res = await fetch("posts/index.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    renderList(posts);
  } catch (err) {
    listEl.innerHTML =
      '<p class="empty">Could not load posts. Make sure <code>posts/index.json</code> exists.</p>';
    console.error(err);
  }
}

function renderList(posts) {
  if (!posts.length) {
    listEl.innerHTML = '<p class="empty">No posts yet. Check back soon.</p>';
    return;
  }
  // Newest first by date.
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  listEl.innerHTML = "";
  for (const post of posts) {
    const card = document.createElement("a");
    card.className = "post-card";
    card.href = `#${post.slug}`;
    card.innerHTML = `
      <h3>${escapeHtml(post.title)}</h3>
      <div class="meta">${formatDate(post.date)}</div>
      ${post.excerpt ? `<p class="excerpt">${escapeHtml(post.excerpt)}</p>` : ""}
    `;
    listEl.appendChild(card);
  }
}

async function showPost(slug) {
  try {
    const res = await fetch(`posts/${slug}.md`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    contentEl.innerHTML = marked.parse(md);
    listEl.hidden = true;
    viewEl.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    contentEl.innerHTML = "<p>Post not found.</p>";
    listEl.hidden = true;
    viewEl.hidden = false;
    console.error(err);
  }
}

function showList() {
  viewEl.hidden = true;
  listEl.hidden = false;
}

backBtn.addEventListener("click", () => {
  history.pushState("", document.title, window.location.pathname + "#blog");
  showList();
});

// Route on hash change (deep-linkable posts).
function route() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash && hash !== "blog" && hash !== "about" && hash !== "top") {
    showPost(hash);
  } else {
    showList();
  }
}

window.addEventListener("hashchange", route);

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

loadIndex().then(route);
