# GroupThat — groupthatapp.com

The GroupThat website, hosted on Netlify. Netlify publishes these files
automatically whenever a change is pushed here.

## Pages

| File                         | What it is                          |
|------------------------------|-------------------------------------|
| `index.html`                 | Homepage (Stop Chasing People)      |
| `pricing.html`               | Pricing (Free vs. Premium comparison) |
| `faq.html`                   | FAQ                                 |
| `contact.html`                | Contact Us (info@groupthatapp.com)  |
| `blog/index.html`            | Blog landing page (lists all posts) |
| `blog/welcome.html`          | Intro post — GroupThat as a recurring meetup organizer (use as a template) |
| `blog/vs-group-chat.html`    | Organizer-first vs. chat-first |
| `blog/whos-in-whos-out.html` | Live headcounts, guests, and mute-until-next-meetup |
| `assets/`                    | Background videos + posters and the social-share (Open Graph) image |
| `assets/screens/`            | App screenshots, 600×1300 (iPhone proportions), shown inside CSS iPhone frames on the homepage |
| `assets/motion.css` / `motion.js` | Shared polish loaded by every page: sticky frosted nav and scroll-in animations |

Each page carries its own styles; the only shared files are `assets/motion.css` and
`assets/motion.js`, which every page links in its `<head>`. The pages link to each
other by filename.

To make anything fade in as it scrolls into view, add `data-reveal` to it
(`data-reveal="zoom"` or `"fade"` for variations). New app screenshots should be
cropped to 600×1300 so they fill the iPhone frame exactly.

## How to publish a change
1. A change is made to a file above (Claude Code can do this for you).
2. It's committed and pushed to GitHub.
3. Netlify auto-publishes the update, usually within a minute.

## How to add a blog post
1. **Duplicate** `blog/welcome.html` and rename it, e.g. `blog/how-to-split-a-trip.html`.
   Use lowercase words separated by hyphens — this becomes the URL.
2. **Edit** the new file: change the `<title>`, the meta description, the tag,
   date, read time, the `<h1>`, and everything inside `.article-body`.
3. **Link it** from `blog/index.html`: copy one `<a class="post-card"> … </a>`
   block near the top of the post list and point its `href` at your new file.
   Newest posts go at the top.
4. Commit and push — Netlify publishes it within a minute.

No build step and no dependencies: blog posts are plain HTML files that reuse
the site's fonts, colors, nav, and footer, just like the other pages.
