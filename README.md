# cometa.rcrd.space ☄️

## Description

Challenge from [Cometa](https://cometa.notion.site/48h-React-Frontend-Challenge-faaa3f5ff28a408799f374b6279793d8). The aim is to show the student's payment orders in a clear and orderly manner. With the final objective that the tutor can easily pay his monthly payments.

## Planning

You can see the planning here: [Cometa Challenge - Milestone 1](https://rqbazan.notion.site/Milestone-1-6d8bbd653b934d66ae029ac9377a4a8c)

## Deploys

- **Web**: https://cometa.rcrd.space
- **UI**: https://cometa.rcrd.space/storybook

## Architecture

- **Framework**: [Next.js](https://nextjs.org)
- **Component Driven**: [Storybook](https://storybook.js.org)
- **Styling**: [MaterialUI](https://mui.com/)
- **Deployment**: [Vercel](https://vercel.com)

## Structure

```
├── 📁 public: Folder to serve static files
├── 📁 src: Contains all the code source
|  ├── 📁 entities: Classes to represent domain
|  ├── 📁 formatters: Classes to transform data
|  ├── 📁 hooks: Shared custom hooks
|  ├── 📁 lib: Connectors to external libraries
|  ├── 📁 pages: Next.js pages
|  |  ├── 📁 api: Next.js handlers
|  |  └── 📁 [pathname]
|  |     ├── 📁 components: Page components
|  |     ├── 📁 hooks: Page hooks
|  |     └── 📄 index.page.tsx: Next.js page
|  ├── 📁 provider: App provider shared with Storybook
|  ├── 📁 ui
|  |  ├── 📁 components: Shared components
|  |  ├── 📁 helpers: UI specific helpers functions
|  |  ├── 📁 layouts: Layout components
|  |  └── 📁 theme: MUI theme
|  ├── 📁 utils: Cross-app utilities similar to lodash
|  └── 📄 env.ts: Single entry point for all env vars
```

> Other folders and files are required for tools configuration

## Running

### Requirements

- Node.js `>=14.x`
- Yarn `^1.x`

> You can use [nvm-sh](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)

### Prepare

```bash
git clone https://github.com/rqbazan/cometa-challenge.git
cd cometa-challenge
cp .env.example .env.local
yarn
```

### Development

- To run the Next App

```bash
yarn dev

```

- To run the Storybook App

```bash
yarn storybook

```

## License

MIT © [Ricardo Q. Bazan](https://rcrd.space)
