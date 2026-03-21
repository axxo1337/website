# Website

## What is this?

This is my personal portfolio website. I've always wanted a sort of portfolio website, but I've never had the time to make one. It lists most of my work along with additional content. For example, it lists some of my YouTube videos, and when you click on one, it redirects you to another page which embeds said video, summarizes it, includes sources and additional resources.

## Resources

### Tools used

- [Next.js](https://nextjs.org/) (React framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Radix UI](https://www.radix-ui.com/) (Accessible UI primitives)
- [MDX](https://mdxjs.com/) (Content authoring)
- [KaTeX](https://katex.org/) (Math rendering)
- [Bun](https://bun.sh/) (Package manager)
- [Vercel](https://vercel.com/) (Deployment)

### Build guide

In order to build the project you must have [Bun](https://bun.sh/) installed. That's it. Run `bun install` followed by `bun run build` and you should end up with a production build in the `.next/` directory. There is a git hook script that automatically updates the "Updated At" dates throughout the project based on the files you're committing.
