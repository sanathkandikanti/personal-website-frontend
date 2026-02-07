# Sanath Kandikanti - Personal Website

This is a personal website built with [Nuxt 3](https://nuxt.com/) and the [Alpine theme](https://github.com/nuxt-themes/alpine).

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Generate static site for deployment:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

## Content Structure

The website uses a content-driven architecture with the following pages:

- **About** (`/`) - Home page with information about Sanath Kandikanti
- **Articles** (`/articles`) - Blog articles and writings
- **Contact** (`/contact`) - Contact information
- **Images** (`/images`) - Photo gallery

All content is stored in markdown files in the `/content` directory with numeric prefixes to control navigation order.

## Configuration

Site configuration is managed through:

- `app.config.ts` - Alpine theme configuration (navigation, header, footer, social links)
- `nuxt.config.ts` - Nuxt configuration extending the Alpine theme

## Deployment

This site is configured for deployment on AWS Amplify. The build command is `npm run generate` and the output directory is `.output/public`.

## Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Alpine Theme Documentation](https://github.com/nuxt-themes/alpine)
- [Nuxt Content Documentation](https://content.nuxt.com/)