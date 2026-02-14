---
inclusion: manual
---

# Alpine Theme Guide

**Version**: 1.0.0  
**Last Updated**: 2024-01-09  
**Alpine Theme Version**: 1.6.6  

## Table of Contents

1. [Theme Overview](#theme-overview)
   - Purpose and Features
   - Design Philosophy
   - Official Resources

2. [Architecture](#architecture)
   - Directory Structure
   - Theme Extends System
   - Component Hierarchy
   - Theme Layering
   - Nuxt Content Integration

3. [Components](#components)
   - Component Catalog
   - Hero Component
   - Gallery Component
   - ArticlesList Component
   - ContactForm Component
   - Navigation Components
   - Layout Components

4. [Content Structure](#content-structure)
   - Directory Organization
   - Frontmatter Fields
   - MDC Syntax
   - File Naming Conventions
   - Routing

5. [Layouts](#layouts)
   - Default Layout
   - Article Layout
   - Page Layout
   - Layout Selection

6. [Styling System](#styling-system)
   - Pinceau Overview
   - Design Tokens
   - Color Tokens
   - Spacing Tokens
   - Typography Tokens
   - Token Customization

7. [Configuration](#configuration)
   - app.config.ts Options
   - nuxt.config.ts Settings
   - Header Configuration
   - Footer Configuration
   - Social Links
   - Navigation Options

8. [Navigation System](#navigation-system)
   - Navigation Generation
   - Frontmatter Fields
   - File Structure Mapping
   - Navigation Customization

9. [Best Practices](#best-practices)
   - Content Organization
   - Component Usage
   - Extending vs Overriding
   - Performance Optimization

10. [Troubleshooting](#troubleshooting)
    - Routing Issues
    - Styling Issues
    - Component Issues
    - Deployment Issues

---

## Theme Overview

### Purpose and Features

Alpine is a minimalist blog theme powered by [Nuxt](https://nuxt.com). It's designed to be a flexible, content-driven solution that can start as a simple profile page and scale to a complete blog.

**Key Features:**

- **Scalable Content Structure**: Start from a profile page, scale to a complete blog
- **Markdown-First Content**: Write pages in Markdown with Vue component support via [MDC syntax](https://content.nuxtjs.org/guide/writing/mdc)
- **Rich Component Library**: Access to 30+ built-in components from [Nuxt Elements](https://elements.nuxt.space)
- **Nuxt Content Integration**: Powered by [Nuxt Content](https://content.nuxtjs.org) for file-based content management
- **Nuxt Studio Compatible**: Editable from [Nuxt Studio](https://nuxt.studio) for visual content editing
- **Open Source**: Fully open source and customizable

### Design Philosophy

Alpine follows a **minimalist design philosophy** focused on:

- **Content-First**: The theme prioritizes content readability and presentation
- **Simplicity**: Clean, uncluttered design that gets out of the way
- **Flexibility**: Easy to customize and extend for different use cases
- **Performance**: Built on Nuxt 3 for optimal performance and modern web standards
- **Developer Experience**: Minimal configuration required to get started

### Official Resources

- **Documentation**: [https://alpine.nuxt.space](https://alpine.nuxt.space)
- **GitHub Repository**: [https://github.com/nuxt-themes/alpine](https://github.com/nuxt-themes/alpine)
- **NPM Package**: [@nuxt-themes/alpine](https://npmjs.com/package/@nuxt-themes/alpine)
- **Online Demo**: [https://alpine.nuxt.space](https://alpine.nuxt.space)
- **Quick Start**: [Play on StackBlitz](https://stackblitz.com/github/nuxt-themes/alpine-starter)
- **Nuxt Studio**: [Open in Nuxt Studio](https://nuxt.studio/themes/alpine)

### Version Information

- **Current Version**: 1.6.6
- **License**: MIT
- **Package Manager**: pnpm 8.5.1 (recommended)

### Core Dependencies

Alpine is built on top of several key Nuxt ecosystem packages:

- **@nuxt/content** (^2.11.0): File-based CMS for content management
- **@nuxt-themes/elements** (^0.9.5): 30+ built-in components
- **@nuxt-themes/typography** (^0.11.0): Typography styling system
- **@nuxt-themes/tokens** (^1.9.1): Design token system (Pinceau)
- **@nuxthq/studio** (^0.14.1): Nuxt Studio integration
- **@vueuse/core** (^10.7.2): Vue composition utilities
- **Nuxt** (^3.9.3): The underlying framework

### Quick Start

To create a new Alpine project:

```bash
npx nuxi@latest init -t themes/alpine
```

This command initializes a new Nuxt project with the Alpine theme pre-configured and ready to use.

## Architecture

### Directory Structure

Alpine theme is organized into a clear, modular directory structure. When installed as a package at `node_modules/@nuxt-themes/alpine/`, it contains the following directories and files:

```
@nuxt-themes/alpine/
├── assets/              # Global styles and CSS
│   └── main.css        # Main stylesheet with base styles
├── components/          # Vue components
│   ├── content/        # Content-specific components (Hero, Gallery, etc.)
│   ├── data-entry/     # Form input components
│   └── *.vue           # Core layout and UI components
├── composables/         # Vue composables for shared logic
│   └── date.ts         # Date formatting utilities
├── layouts/             # Page layout templates
│   ├── default.vue     # Default layout for standard pages
│   ├── article.vue     # Layout optimized for blog articles
│   └── page.vue        # Simple page layout
├── types/               # TypeScript type definitions
│   └── contact.ts      # Contact form types
├── app.config.ts        # Default theme configuration
├── app.vue              # Root application component
├── nuxt.config.ts       # Nuxt configuration for the theme
├── nuxt.schema.ts       # Configuration schema for app.config
├── tokens.config.ts     # Pinceau design tokens
├── package.json         # Package metadata and dependencies
└── README.md            # Theme documentation
```

#### Key Directories Explained

**`assets/`**: Contains the main CSS file that provides base styles for the theme. This is automatically imported by the theme's nuxt.config.ts.

**`components/`**: Houses all Vue components, organized into subdirectories:
- `content/`: Components designed for use in markdown content (Hero, Gallery, ArticlesList, ContactForm)
- `data-entry/`: Form input components (Input)
- Root level: Core UI components (AppHeader, AppFooter, AppLayout, Button, ColorModeSwitch, etc.)

**`composables/`**: Contains reusable Vue composition functions. Currently includes date formatting utilities.

**`layouts/`**: Provides three layout templates that wrap page content:
- `default.vue`: Standard layout with header and footer
- `article.vue`: Optimized for blog posts with article metadata
- `page.vue`: Minimal layout for simple pages

**`types/`**: TypeScript type definitions for theme-specific functionality.

### Theme Extends System

Alpine uses Nuxt's powerful **theme extends system**, which allows it to layer functionality from multiple themes and modules. This is configured in the theme's `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: [
    '@nuxt-themes/typography',
    '@nuxt-themes/elements'
  ],
  // ... other configuration
})
```

#### How Extends Works

When you use Alpine in your project by adding it to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine'
})
```

Nuxt creates a **layered architecture** where:

1. **Base Layer**: Your project files (highest priority)
2. **Alpine Layer**: Alpine theme files
3. **Elements Layer**: @nuxt-themes/elements (30+ components)
4. **Typography Layer**: @nuxt-themes/typography (typography styles)

Each layer can override files from layers below it. This means:

- You can override any Alpine component by creating a file with the same path in your project
- Alpine overrides components from Elements and Typography
- Your project has the final say on all files

#### Integration with Nuxt

Alpine integrates seamlessly with Nuxt through several mechanisms:

**1. Component Auto-Import**: All components are globally registered and auto-imported:

```typescript
components: [
  { path: resolve('./components'), global: true },
  { path: resolve('./components/content'), global: true },
  { path: resolve('./components/data-entry'), global: true }
]
```

This means you can use any Alpine component in your markdown or Vue files without explicit imports.

**2. Module Integration**: Alpine automatically configures essential Nuxt modules:

```typescript
modules: [
  '@nuxt-themes/tokens',    // Pinceau design tokens
  '@nuxthq/studio',         // Nuxt Studio integration
  '@nuxt/content',          // Content management
]
```

**3. Content Configuration**: Alpine pre-configures Nuxt Content for optimal blog functionality:

```typescript
content: {
  documentDriven: true,           // Automatic page generation from content
  navigation: {
    fields: ['navTitle']          // Include navTitle in navigation queries
  },
  highlight: {                    // Syntax highlighting for code blocks
    theme: {
      default: 'github-light',
      dark: 'github-dark'
    }
  }
}
```

### Component Hierarchy

Alpine's components are organized in a clear hierarchy:

```
app.vue (Root)
└── AppLayout
    ├── AppLoadingBar
    ├── AppHeader
    │   ├── MainNav
    │   └── ColorModeSwitch
    ├── NuxtPage (Content Area)
    │   └── Layout (default/article/page)
    │       └── Page Content
    │           ├── Hero
    │           ├── Gallery
    │           ├── ArticlesList
    │           ├── ContactForm
    │           └── Other content components
    └── AppFooter
        └── SocialIcons
```

**Root Level**: `app.vue` is the root component that wraps everything in `AppLayout`.

**Layout Level**: `AppLayout` provides the overall page structure with header, content area, and footer.

**Page Level**: `NuxtPage` renders the appropriate layout (default, article, or page) based on frontmatter.

**Content Level**: Within layouts, content components like Hero, Gallery, and ArticlesList are used via MDC syntax in markdown files.

### Theme Layering

Alpine's layering system allows for flexible customization without modifying theme files:

#### Layer Priority (Highest to Lowest)

1. **User Project Files**: Files in your project's directories
2. **Alpine Theme**: Files from `@nuxt-themes/alpine`
3. **Elements Theme**: Files from `@nuxt-themes/elements`
4. **Typography Theme**: Files from `@nuxt-themes/typography`

#### Overriding Components

To customize an Alpine component, create a file with the same path in your project:

**Example**: Override the Hero component

```
your-project/
└── components/
    └── content/
        └── Hero.vue    # Your custom Hero component
```

Your `Hero.vue` will be used instead of Alpine's version, but you can still import and extend the original:

```vue
<script setup lang="ts">
import AlpineHero from '#alpine/components/content/Hero.vue'
// Extend or modify as needed
</script>
```

#### Extending Configuration

Alpine's `app.config.ts` provides defaults that you can override in your project's `app.config.ts`:

```typescript
// Your project's app.config.ts
export default defineAppConfig({
  alpine: {
    title: 'My Custom Title',
    description: 'My custom description',
    // Only specify what you want to override
  }
})
```

The configurations are **deeply merged**, so you only need to specify the values you want to change.

### Nuxt Content Integration

Alpine is tightly integrated with [Nuxt Content](https://content.nuxtjs.org), which provides:

**File-Based Content Management**: Write content in markdown files in the `content/` directory, and they automatically become pages.

**Document-Driven Mode**: Alpine enables `documentDriven: true`, which means:
- Content files automatically generate routes
- Frontmatter controls page metadata and layout
- Navigation is automatically generated from file structure

**MDC Syntax**: Alpine components can be used in markdown via MDC (Markdown Components) syntax:

```markdown
::hero
---
image: /image.jpg
---
#title
Welcome to My Site
#description
This is my awesome site
::
```

**Content Queries**: Components like `ArticlesList` use Nuxt Content's query API to fetch and display content:

```vue
<template>
  <ArticlesList path="/articles" />
</template>
```

This queries all content under `/content/articles/` and displays it in a list.

**Navigation API**: Alpine uses Nuxt Content's navigation API to generate menus and navigation structures automatically from your content directory structure.

## Components

### Component Catalog

Alpine provides 15 built-in components organized into four categories:

**Content Components** (5): Components designed for use in markdown content via MDC syntax
- Hero
- Gallery
- ArticlesList
- ArticlesListItem
- ContactForm

**Layout Components** (4): Core structural components that form the page layout
- AppLayout
- AppHeader
- AppFooter
- AppLoadingBar

**Navigation Components** (2): Components for site navigation
- MainNav
- SocialIcons

**UI Components** (3): Reusable interface elements
- Button
- ColorModeSwitch
- Input

**Utility Components** (1): Special-purpose components
- DocumentDrivenNotFound

---

### Content Components

#### Hero

**Purpose**: Display a prominent hero section with title, description, and optional image. Typically used at the top of landing pages or major sections.

**Location**: `components/content/Hero.vue`

**Props**:
- `image` (String, default: `null`): Path to the hero image
- `imageAlt` (String, default: `'Hero Image'`): Alt text for the image
- `imagePosition` (String, default: `'right'`): Position of the image, either `'left'` or `'right'`

**Slots**:
- `title` (unwraps `<p>` tags): Main heading content
- `description` (unwraps `<p>` tags): Descriptive text content

**Usage Example**:
```markdown
::hero
---
image: /images/hero-banner.jpg
imageAlt: Welcome banner
imagePosition: right
---
#title
Welcome to My Site
#description
A minimalist blog built with Alpine and Nuxt
::
```

**Notes**:
- The image uses a 16:9 aspect ratio by default
- On mobile, the layout stacks vertically
- On desktop (lg breakpoint), it displays in a two-column grid
- Use `imagePosition: left` to place the image on the left side

---

#### Gallery

**Purpose**: Display a responsive grid of images. Automatically adjusts columns based on screen size and number of images.

**Location**: `components/content/Gallery.vue`

**Props**:
- `images` (Array<string>, default: `[]`): Array of image paths to display

**Slots**: None

**Usage Example**:
```markdown
::gallery
---
images:
  - /images/photo1.jpg
  - /images/photo2.jpg
  - /images/photo3.jpg
  - /images/photo4.jpg
---
::
```

**Notes**:
- Images use a 16:9 aspect ratio with object-fit cover
- On mobile: 1 column
- On tablet (md breakpoint): 2 columns (or 1 if only 1 image)
- Includes vertical spacing (margin-y) of 16 units
- All images have rounded corners

---

#### ArticlesList

**Purpose**: Query and display a list of articles from a content directory. Shows the first article as featured (larger) and remaining articles in a grid.

**Location**: `components/content/ArticlesList.vue`

**Props**:
- `path` (String, default: `'articles'`): Path to the content directory to query (relative to `/content/`)

**Slots**: None

**Usage Example**:
```markdown
::articles-list{path="articles"}
::
```

Or in a Vue component:
```vue
<template>
  <ArticlesList path="blog" />
</template>
```

**Notes**:
- Automatically queries content using Nuxt Content's `queryContent()`
- Sorts articles by date in descending order (newest first)
- First article is displayed as "featured" with larger styling
- Remaining articles display in a responsive grid (1/2/3 columns)
- If no articles exist, shows a helpful message with link to documentation
- Requires articles to have `_path`, `title`, and `date` frontmatter fields

---

#### ArticlesListItem

**Purpose**: Display a single article card with cover image, title, description, date, and optional badges. Used internally by ArticlesList but can be used standalone.

**Location**: `components/content/ArticlesListItem.vue`

**Props**:
- `article` (Object, required): Article object with the following structure:
  - `_path` (String, required): Route path to the article
  - `title` (String, required): Article title
  - `date` (String, required): Publication date
  - `description` (String): Article description
  - `cover` (String): Path to cover image
  - `badges` (Array): Array of badge objects with `bg`, `color`, and `content` properties
- `featured` (Boolean, default: `false`): Whether to display as a featured article (larger styling)

**Slots**: None

**Usage Example**:
```vue
<template>
  <ArticlesListItem 
    :article="{
      _path: '/articles/my-post',
      title: 'My Blog Post',
      date: '2024-01-15',
      description: 'A great article about...',
      cover: '/images/cover.jpg'
    }"
    :featured="true"
  />
</template>
```

**Notes**:
- Automatically formats dates using the `formatDate()` composable
- Featured articles display larger with more description lines
- Badges overlay on the cover image (top-left corner)
- Cover images use 16:9 aspect ratio
- Integrates with Nuxt Studio for live editing (data-content-id attribute)

---

#### ContactForm

**Purpose**: Display a customizable contact form with Formspree integration for handling submissions.

**Location**: `components/content/ContactForm.vue`

**Props**:
- `submitButtonText` (String, default: `'Send message'`): Text for the submit button
- `fields` (Array<Field>, default: name, email, subject, message fields): Array of field definitions

**Field Object Structure**:
```typescript
{
  type: 'text' | 'email' | 'textarea'
  model: string          // Field identifier
  name: string           // Field label
  placeholder?: string   // Placeholder text
  required: boolean      // Whether field is required
  layout: 'default' | 'big'  // Field size
}
```

**Slots**: None

**Usage Example**:
```markdown
::contact-form
---
submitButtonText: Get in Touch
---
::
```

With custom fields:
```markdown
::contact-form
---
submitButtonText: Send Message
fields:
  - type: text
    model: name
    name: Your Name
    placeholder: John Doe
    required: true
    layout: default
  - type: email
    model: email
    name: Email Address
    required: true
    layout: default
  - type: textarea
    model: message
    name: Your Message
    required: true
    layout: big
---
::
```

**Notes**:
- Requires `FORMSPREE_URL` environment variable to be set
- Default fields: name, email, subject (optional), message
- Form submission handled via Formspree API
- Shows success/error messages after submission
- Displays warning in console if FORMSPREE_URL is not configured
- Form is disabled if FORMSPREE_URL is not set

---

### Layout Components

#### AppLayout

**Purpose**: Root layout component that wraps all pages with header, footer, and loading bar. Provides the overall page structure.

**Location**: `components/AppLayout.vue`

**Props**:
- `padded` (Boolean, default: `true`): Whether to add padding to the layout

**Slots**:
- `default`: Main content area

**Usage Example**:
```vue
<template>
  <AppLayout>
    <YourPageContent />
  </AppLayout>
</template>
```

**Notes**:
- Automatically includes AppLoadingBar, AppHeader, and AppFooter
- Wraps content in a Container component
- Sets up meta tags for Twitter cards
- Uses `useContentHead()` for automatic head management
- Header and footer visibility controlled by `alpine.header` and `alpine.footer` config
- Sets minimum width to extra-small breakpoint

---

#### AppHeader

**Purpose**: Site header with logo/title, navigation menu, and mobile hamburger menu.

**Location**: `components/AppHeader.vue`

**Props**: None (configured via `app.config.ts`)

**Slots**: None

**Usage Example**:
The header is automatically included in AppLayout. Configure via app.config.ts:

```typescript
export default defineAppConfig({
  alpine: {
    title: 'My Site',
    header: {
      position: 'left', // 'left' | 'center' | 'right'
      logo: {
        path: '/logo.svg',
        pathDark: '/logo-dark.svg',
        alt: 'My Site Logo'
      }
    }
  }
})
```

**Notes**:
- Displays logo (light/dark variants) or falls back to site title
- Includes MainNav component for navigation links
- Mobile menu (hamburger) appears below sm breakpoint
- Menu overlay has backdrop blur effect
- Header position affects logo and navigation alignment
- Mobile menu slides in with 3D transform animation

---

#### AppFooter

**Purpose**: Site footer with optional credits, navigation, message, social icons, and color mode switch.

**Location**: `components/AppFooter.vue`

**Props**: None (configured via `app.config.ts`)

**Slots**: None

**Usage Example**:
The footer is automatically included in AppLayout. Configure via app.config.ts:

```typescript
export default defineAppConfig({
  alpine: {
    footer: {
      alignment: 'center', // 'left' | 'center' | 'right'
      credits: {
        enabled: true,
        text: 'Built with Alpine',
        repository: 'https://github.com/nuxt-themes/alpine'
      },
      navigation: true,
      message: '© 2024 My Site. All rights reserved.'
    },
    socials: {
      twitter: 'myhandle',
      github: 'myusername'
    }
  }
})
```

**Notes**:
- Credits link to repository (if enabled)
- Navigation menu appears on sm+ breakpoints
- Social icons and color mode switch in bottom row
- Alignment affects all footer elements
- Minimum height of 36 units on md+ breakpoints

---

#### AppLoadingBar

**Purpose**: Display a progress bar at the top of the page during navigation and content loading.

**Location**: `components/AppLoadingBar.vue`

**Props**:
- `throttle` (Number, default: `200`): Delay in ms before showing the loading bar
- `duration` (Number, default: `2000`): Expected duration of loading in ms
- `height` (Number, default: `3`): Height of the loading bar in pixels

**Slots**: None

**Usage Example**:
```vue
<template>
  <AppLoadingBar :throttle="300" :duration="3000" :height="4" />
</template>
```

**Notes**:
- Automatically hooks into Nuxt's page and content loading events
- Uses a gradient background (green to blue)
- Fixed position at top of viewport
- Smooth width transition as loading progresses
- Automatically hides when loading completes
- Z-index of 999999 to appear above all content

---

### Navigation Components

#### MainNav

**Purpose**: Render the main navigation menu from Nuxt Content's navigation structure.

**Location**: `components/MainNav.vue`

**Props**: None (uses Nuxt Content navigation)

**Slots**: None

**Events**:
- `linkClick`: Emitted when a navigation link is clicked (used for closing mobile menu)

**Usage Example**:
```vue
<template>
  <MainNav @link-click="handleLinkClick" />
</template>
```

**Notes**:
- Automatically queries navigation from Nuxt Content
- Displays links from content files with `navigation: true` in frontmatter
- Active route highlighted with primary color
- Hover effect: animated underline
- Responsive: vertical on mobile, horizontal on sm+ breakpoints
- Used in both AppHeader and AppFooter

---

#### SocialIcons

**Purpose**: Display social media icons as links. Supports built-in social platforms and custom icons.

**Location**: `components/SocialIcons.vue`

**Props**:
- `socials` (Object, default: `{}`): Object mapping social platform names to usernames or custom icon objects

**Built-in Platforms**: twitter, facebook, instagram, youtube, github, medium

**Usage Example**:

Simple usage with built-in platforms:
```typescript
// In app.config.ts
export default defineAppConfig({
  alpine: {
    socials: {
      twitter: 'myhandle',
      github: 'myusername',
      youtube: 'mychannel'
    }
  }
})
```

Custom icons:
```typescript
export default defineAppConfig({
  alpine: {
    socials: {
      twitter: 'myhandle',
      custom: {
        href: 'https://example.com',
        icon: 'uil:link',
        label: 'My Custom Link',
        rel: 'me'
      }
    }
  }
})
```

**Notes**:
- Built-in platforms automatically generate URLs (e.g., `https://twitter.com/myhandle`)
- Uses Iconify icons via Nuxt Icon module
- All links open in new tab with `noopener noreferrer`
- Icons are 24x24 pixels
- Hover effect: changes to primary color
- Custom icons require `href`, `icon`, and `label` properties

---

### UI Components

#### Button

**Purpose**: Styled button component for forms and actions.

**Location**: `components/Button.vue`

**Props**:
- `type` (String, default: `'submit'`): Button type attribute (`'submit'`, `'button'`, `'reset'`)
- `disabled` (Boolean, default: `false`): Whether the button is disabled

**Slots**:
- `default`: Button content

**Usage Example**:
```vue
<template>
  <Button type="button" @click="handleClick">
    Click Me
  </Button>
  
  <Button type="submit" :disabled="isSubmitting">
    Submit Form
  </Button>
</template>
```

**Notes**:
- Dark background in light mode, light background in dark mode
- Responsive padding and font size (larger on md+ breakpoints)
- Rounded corners with medium radius
- Disabled state shows not-allowed cursor
- Medium font weight for readability

---

#### ColorModeSwitch

**Purpose**: Toggle button to switch between light, dark, and system color modes.

**Location**: `components/ColorModeSwitch.vue`

**Props**: None

**Slots**: None

**Usage Example**:
```vue
<template>
  <ColorModeSwitch />
</template>
```

**Notes**:
- Cycles through three modes: system → light → dark → system
- Shows appropriate icon for current mode:
  - Moon icon for dark mode
  - Sun icon for light mode
  - Desktop icon for system mode
- Uses Nuxt Color Mode module
- 24x24 pixel icon size
- Hover effect: changes to primary color
- Includes screen reader text for accessibility

---

#### Input

**Purpose**: Form input component supporting text, email, and textarea fields.

**Location**: `components/data-entry/Input.vue`

**Props**:
- `modelValue` (String, required): The input value (v-model)
- `field` (Field Object, required): Field configuration object

**Field Object Structure**:
```typescript
{
  name: string           // Field name/id (required)
  label: string          // Field label text
  type: 'text' | 'email' | 'textarea'
  placeholder?: string   // Placeholder text
}
```

**Slots**: None

**Events**:
- `update:modelValue`: Emitted when input value changes (for v-model)

**Usage Example**:
```vue
<template>
  <Input
    v-model="formData.email"
    :field="{
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com'
    }"
  />
</template>
```

**Notes**:
- Automatically renders `<input>` or `<textarea>` based on field type
- Label is clickable and associated with input via `for`/`id`
- Transparent background with border
- Focus state changes border color
- Textarea has fixed height and no resize
- Dark mode support with different border colors

---

### Utility Components

#### DocumentDrivenNotFound

**Purpose**: Display a 404 error page when a content page is not found.

**Location**: `components/DocumentDrivenNotFound.vue`

**Props**: None

**Slots**: None

**Usage Example**:
This component is automatically used by Nuxt Content when a page is not found. You don't need to use it directly.

**Notes**:
- Displays "This page could not be found" message
- Shows large "404" status code
- Includes link back to homepage with arrow icon
- Centered layout with minimum 50vh height
- Arrow icon animates on hover (positioned to the right)

---

### Component Usage Patterns

#### Using Components in Markdown (MDC Syntax)

Alpine components can be used in markdown files using MDC syntax:

**Basic component**:
```markdown
::component-name
::
```

**Component with props**:
```markdown
::component-name{prop="value" another-prop="value"}
::
```

**Component with YAML frontmatter props**:
```markdown
::component-name
---
prop: value
anotherProp: value
arrayProp:
  - item1
  - item2
---
::
```

**Component with slots**:
```markdown
::component-name
#slot-name
Slot content here
#another-slot
More content
::
```

**Component with both props and slots**:
```markdown
::hero
---
image: /hero.jpg
imagePosition: right
---
#title
Welcome to My Site
#description
This is the description
::
```

#### Using Components in Vue Files

All Alpine components are globally registered and can be used directly:

```vue
<template>
  <div>
    <Hero
      image="/hero.jpg"
      image-alt="Hero banner"
      image-position="right"
    >
      <template #title>
        Welcome to My Site
      </template>
      <template #description>
        This is the description
      </template>
    </Hero>
    
    <ArticlesList path="blog" />
    
    <Gallery :images="['/img1.jpg', '/img2.jpg']" />
  </div>
</template>
```

#### Overriding Components

To customize a component, create a file with the same path in your project:

```
your-project/
└── components/
    └── content/
        └── Hero.vue    # Your custom Hero component
```

You can extend the original component:

```vue
<script setup lang="ts">
// Import the original component
import OriginalHero from '#alpine/components/content/Hero.vue'

// Add your custom logic
const props = defineProps({
  // Your custom props
})
</script>

<template>
  <!-- Your custom template -->
</template>
```

## Content Structure

### Directory Organization

Alpine uses Nuxt Content's file-based content management system. Content files are stored in the `content/` directory at the root of your project. The directory structure directly maps to your site's URL structure.

**Standard Directory Structure**:

```
content/
├── 1.index.md              # Homepage (/)
├── 2.articles.md           # Articles listing page (/articles)
├── articles/               # Individual articles directory
│   ├── my-first-post.md   # Article (/articles/my-first-post)
│   └── another-post.md    # Article (/articles/another-post)
└── notes/                  # Custom content directory
    └── my-note.md         # Note page (/notes/my-note)
```

**Key Principles**:

- **File-Based Routing**: Each `.md` file automatically becomes a page at its corresponding URL path
- **Numbered Prefixes**: Files with numeric prefixes (e.g., `1.index.md`, `2.articles.md`) control navigation order
- **Nested Directories**: Subdirectories create nested URL paths (e.g., `articles/post.md` → `/articles/post`)
- **Index Files**: Files named `index.md` or with numeric prefix + `.index.md` represent the directory's index page

### Frontmatter Fields

Frontmatter is YAML metadata at the top of each markdown file, enclosed by `---` delimiters. Alpine and Nuxt Content support various frontmatter fields that control page behavior and metadata.

#### Standard Frontmatter Fields

**`title`** (String, required)
- The page or article title
- Used in `<title>` tag, navigation, and article listings
- Example: `title: My Blog Post`

**`description`** (String, recommended)
- Brief summary of the page content
- Used for SEO meta description and article listings
- Example: `description: A comprehensive guide to Alpine theme`

**`layout`** (String, default: `'default'`)
- Specifies which layout template to use
- Available values: `'default'`, `'article'`, `'page'`
- Example: `layout: article`

**`navigation`** (Object or Boolean, optional)
- Controls navigation menu appearance
- Set to `false` to hide from navigation
- Use object form to customize navigation title
- Example:
  ```yaml
  navigation:
    title: About
  ```
  or
  ```yaml
  navigation: false
  ```

**`date`** (String, required for articles)
- Publication date in `YYYY-MM-DD` format
- Used for sorting articles (newest first)
- Displayed in article listings
- Example: `date: 2024-01-15`

**`cover`** (String, optional)
- Path to cover image for articles
- Displayed in article listings with 16:9 aspect ratio
- Path relative to `public/` directory
- Example: `cover: /images/article-cover.jpg`

**`badges`** (Array, optional)
- Array of badge objects to display on article cards
- Each badge has `bg` (background color), `color` (text color), and `content` (text)
- Example:
  ```yaml
  badges:
    - bg: '#10b981'
      color: white
      content: Featured
    - bg: '#3b82f6'
      color: white
      content: Tutorial
  ```

**`image`** (String, optional)
- Open Graph image for social media sharing
- Path relative to `public/` directory
- Example: `image: /og-image.jpg`

**`_path`** (String, auto-generated)
- Automatically generated by Nuxt Content
- Represents the URL path to the page
- Do not set manually

**`_id`** (String, auto-generated)
- Automatically generated unique identifier
- Used internally by Nuxt Content
- Do not set manually

#### Complete Frontmatter Example

**Homepage** (`content/1.index.md`):
```yaml
---
title: Sanath Kandikanti - Software Engineer
description: Software engineer specializing in full-stack development
layout: default
navigation:
  title: About
---
```

**Articles Listing Page** (`content/2.articles.md`):
```yaml
---
title: Articles
description: Blog articles and writings
layout: default
---
```

**Individual Article** (`content/articles/my-post.md`):
```yaml
---
title: Getting Started with Alpine Theme
description: A comprehensive guide to building websites with Alpine
date: 2024-01-15
cover: /images/alpine-cover.jpg
badges:
  - bg: '#10b981'
    color: white
    content: Tutorial
---
```

### MDC Syntax

MDC (Markdown Components) is a syntax extension that allows you to use Vue components directly in markdown files. Alpine components can be embedded using the `::component-name` syntax.

#### Basic MDC Syntax

**Simple Component** (no props or slots):
```markdown
::component-name
::
```

**Component with Props** (inline syntax):
```markdown
::component-name{prop="value" another-prop="value"}
::
```

**Component with Props** (YAML frontmatter syntax):
```markdown
::component-name
---
prop: value
anotherProp: value
arrayProp:
  - item1
  - item2
---
::
```

**Component with Slots**:
```markdown
::component-name
#slot-name
Slot content here
#another-slot
More content
::
```

**Component with Props and Slots**:
```markdown
::component-name
---
image: /hero.jpg
imagePosition: right
---
#title
Welcome to My Site
#description
This is the description
::
```

#### MDC Examples with Alpine Components

**Hero Component**:
```markdown
::hero
---
image: /alpine-0.webp
imageAlt: Welcome banner
imagePosition: right
---
#title
Hi, I am Sanath.
#description
An engineer who speaks fluent computer.
::
```

**Gallery Component**:
```markdown
::gallery
---
images:
  - /alpine-0.webp
  - /alpine-1.webp
  - /alpine-2.webp
---
::
```

**ArticlesList Component**:
```markdown
::articles-list
::
```

Or with custom path:
```markdown
::articles-list{path="blog"}
::
```

**ContactForm Component**:
```markdown
::contact-form
---
submitButtonText: Get in Touch
---
::
```

#### MDC Slot Unwrapping

Some Alpine components automatically unwrap `<p>` tags from slot content. For example, the Hero component's `title` and `description` slots unwrap paragraph tags, so:

```markdown
::hero
#title
My Title
::
```

Renders as `<h1>My Title</h1>` instead of `<h1><p>My Title</p></h1>`.

### File Naming Conventions

Alpine uses specific file naming conventions that affect routing and navigation order.

#### Numbered Prefixes

Files can have numeric prefixes followed by a dot to control navigation order:

- `1.index.md` → Routes to `/` (homepage)
- `2.articles.md` → Routes to `/articles`
- `3.about.md` → Routes to `/about`

**How Numbered Prefixes Work**:
- The number determines the order in navigation menus (ascending)
- The number is **removed** from the URL path
- `1.index.md` becomes `/`, not `/1.index`
- `2.articles.md` becomes `/articles`, not `/2.articles`

**When to Use Numbered Prefixes**:
- Top-level navigation pages that should appear in a specific order
- Homepage (always use `1.index.md`)
- Main section pages (articles, about, contact, etc.)

**When NOT to Use Numbered Prefixes**:
- Individual articles in subdirectories (e.g., `content/articles/my-post.md`)
- Content that shouldn't appear in navigation
- Nested content pages

#### File Name to URL Mapping

**Basic Mapping**:
- `content/about.md` → `/about`
- `content/contact.md` → `/contact`
- `content/articles/first-post.md` → `/articles/first-post`

**Index Files**:
- `content/index.md` → `/`
- `content/1.index.md` → `/` (with navigation order)
- `content/articles/index.md` → `/articles`

**Nested Directories**:
- `content/blog/2024/my-post.md` → `/blog/2024/my-post`
- `content/docs/getting-started.md` → `/docs/getting-started`

**Special Characters**:
- Spaces in filenames become hyphens: `my post.md` → `/my-post`
- Underscores are preserved: `my_post.md` → `/my_post`
- File extensions are removed: `about.md` → `/about`

### Routing

Alpine uses Nuxt Content's **document-driven mode**, which means content files automatically generate routes without manual configuration.

#### Automatic Route Generation

When you create a content file, Nuxt Content automatically:
1. Generates a route at the corresponding URL path
2. Makes the content available via the `useContent()` composable
3. Includes the page in navigation queries (if `navigation` is not `false`)
4. Applies the specified layout from frontmatter

**Example**:
```
content/articles/my-post.md
  ↓
Route: /articles/my-post
Layout: default (or specified in frontmatter)
Navigation: Included (unless navigation: false)
```

#### Route Priority

When multiple files could match a route, Nuxt Content uses this priority:

1. **Exact file match**: `content/about.md` for `/about`
2. **Index file**: `content/about/index.md` for `/about`
3. **Numbered prefix**: `content/2.about.md` for `/about`

#### Dynamic Routes

While Alpine doesn't use dynamic routes by default, you can create them using Nuxt Content's query API:

```vue
<script setup>
const route = useRoute()
const { data: article } = await useAsyncData(
  route.path,
  () => queryContent(route.path).findOne()
)
</script>
```

#### Navigation Integration

Routes are automatically included in navigation queries based on:
- **File location**: Top-level files appear in main navigation
- **Navigation frontmatter**: Controls visibility and title
- **Numeric prefix**: Determines order in navigation

**Example Navigation Query**:
```vue
<script setup>
const { data: navigation } = await useAsyncData(
  'navigation',
  () => fetchContentNavigation()
)
</script>
```

This returns all content files with `navigation` not set to `false`, ordered by numeric prefix.

#### Content Queries

Alpine components like `ArticlesList` use Nuxt Content's query API to fetch content:

```javascript
// Fetch all articles, sorted by date
const articles = await queryContent('articles')
  .sort({ date: -1 })
  .find()

// Fetch a single article
const article = await queryContent('articles', 'my-post')
  .findOne()

// Fetch with filters
const featured = await queryContent('articles')
  .where({ featured: true })
  .find()
```

#### 404 Handling

When a route doesn't match any content file:
- Alpine displays the `DocumentDrivenNotFound` component
- Shows "This page could not be found" message
- Provides a link back to the homepage
- Returns a 404 HTTP status code

### Content File Examples

#### Complete Homepage Example

**File**: `content/1.index.md`

```markdown
---
title: John Doe - Software Engineer
description: Full-stack developer specializing in Vue.js and Node.js
layout: default
navigation:
  title: Home
---

::hero
---
image: /hero-image.jpg
imagePosition: right
---
#title
Hi, I'm John Doe
#description
A passionate software engineer building modern web applications
::

## About Me

I'm a full-stack developer with 5 years of experience building scalable web applications. I specialize in Vue.js, Nuxt, and Node.js.

::gallery
---
images:
  - /project1.jpg
  - /project2.jpg
  - /project3.jpg
---
::

## Get in Touch

Feel free to reach out at [john@example.com](mailto:john@example.com).
```

#### Complete Articles Listing Example

**File**: `content/2.articles.md`

```markdown
---
title: Articles
description: Technical articles and tutorials
layout: default
navigation:
  title: Blog
---

# Articles

Browse my latest articles and tutorials.

::articles-list
::
```

#### Complete Article Example

**File**: `content/articles/getting-started-with-nuxt.md`

```markdown
---
title: Getting Started with Nuxt 3
description: A beginner's guide to building applications with Nuxt 3
date: 2024-01-15
cover: /images/nuxt-cover.jpg
badges:
  - bg: '#00DC82'
    color: white
    content: Tutorial
  - bg: '#3b82f6'
    color: white
    content: Beginner
---

# Getting Started with Nuxt 3

Nuxt 3 is a powerful framework for building Vue.js applications with server-side rendering, static site generation, and more.

## Introduction

In this tutorial, we'll explore the basics of Nuxt 3 and build a simple application.

## Installation

First, create a new Nuxt 3 project:

\`\`\`bash
npx nuxi@latest init my-app
cd my-app
npm install
\`\`\`

## Project Structure

Nuxt 3 uses a convention-based directory structure:

- `pages/` - File-based routing
- `components/` - Vue components
- `composables/` - Composition API utilities
- `layouts/` - Page layouts

## Conclusion

Nuxt 3 provides a great developer experience with powerful features out of the box. Start building your next project with Nuxt today!
```

### Best Practices for Content

**File Organization**:
- Use numbered prefixes only for top-level navigation pages
- Group related content in subdirectories (e.g., `articles/`, `docs/`)
- Use descriptive, URL-friendly file names (lowercase, hyphens)

**Frontmatter**:
- Always include `title` and `description` for SEO
- Use `date` field for all articles to enable proper sorting
- Add `cover` images to make article listings more engaging
- Set `navigation: false` for pages that shouldn't appear in menus

**MDC Components**:
- Use Hero component on landing pages for visual impact
- Use Gallery component to showcase images in a grid
- Use ArticlesList component to automatically display article collections
- Keep MDC syntax clean and properly indented

**Content Writing**:
- Write in markdown for better readability and maintainability
- Use proper heading hierarchy (h1 → h2 → h3)
- Include code blocks with language specification for syntax highlighting
- Add alt text to images for accessibility

## Layouts

Alpine provides three layout templates that wrap page content and control how it's displayed. Layouts are specified in the frontmatter of content files and determine the page structure, styling, and available features.

### Overview

**Available Layouts:**
- **default**: Minimal layout for standard pages (homepage, about, etc.)
- **article**: Feature-rich layout optimized for blog articles with metadata and navigation
- **page**: Identical to default, provided as an alias for semantic clarity

**Layout Selection:**
Layouts are specified in content file frontmatter using the `layout` field:

```yaml
---
title: My Page
layout: default  # or 'article' or 'page'
---
```

If no layout is specified, Nuxt Content uses the `default` layout automatically.

**Layout Integration:**
All layouts are wrapped by the `AppLayout` component, which provides:
- AppLoadingBar (progress indicator)
- AppHeader (site header with navigation)
- AppFooter (site footer with links and social icons)
- Container wrapper for consistent spacing

### Default Layout

**Location**: `layouts/default.vue`

**Purpose**: Minimal layout for standard pages like homepage, about, contact, and listing pages. Provides a simple `<main>` wrapper without additional structure or styling.

**Structure**:
```vue
<template>
  <main>
    <slot />
  </main>
</template>
```

**Features**:
- Minimal markup - just a `<main>` semantic element
- No built-in styling or constraints
- Full flexibility for page content
- Wrapped by AppLayout (header, footer, loading bar)

**When to Use**:
- Homepage with custom hero sections
- About pages with flexible content
- Listing pages (articles index, portfolio)
- Landing pages with custom layouts
- Any page that needs maximum layout flexibility

**Example Content File**:
```markdown
---
title: About Me
description: Learn more about my background
layout: default
---

::hero
---
image: /hero.jpg
---
#title
Welcome to My Site
::

## About

This is my about page with flexible content structure.

::gallery
---
images:
  - /img1.jpg
  - /img2.jpg
---
::
```

**Notes**:
- Most common layout for non-article pages
- Allows full use of MDC components without constraints
- Content determines its own structure and spacing
- Ideal for pages with Hero, Gallery, or custom components

---

### Article Layout

**Location**: `layouts/article.vue`

**Purpose**: Feature-rich layout specifically designed for blog articles. Includes article metadata (title, date), back navigation, readable line width, and "back to top" functionality.

**Structure**:
```vue
<template>
  <article>
    <!-- Back navigation link -->
    <NuxtLink :to="parentPath" class="back">
      <Icon name="ph:arrow-left" />
      <span>Back</span>
    </NuxtLink>
    
    <!-- Article header with title and date -->
    <header>
      <h1 class="title">{{ page.title }}</h1>
      <time :datetime="page.date">{{ formatDate(page.date) }}</time>
    </header>

    <!-- Article content -->
    <div class="prose">
      <slot />
      <!-- Optional back to top link -->
    </div>
  </article>
</template>
```

**Features**:
- **Back Navigation**: Automatic "Back" link to parent path (e.g., /articles/my-post → /articles)
- **Article Header**: Displays title and formatted publication date
- **Readable Width**: Content constrained to `{alpine.readableLine}` token for optimal reading
- **Date Formatting**: Automatic date formatting using `formatDate()` composable
- **Back to Top**: Optional "Back to top" link (configured via `alpine.backToTop` in app.config)
- **Semantic HTML**: Uses `<article>` and `<time>` elements for proper semantics
- **Open Graph**: Automatically sets og:image meta tag if `cover` field exists in frontmatter
- **H1 Hiding**: Hides any `<h1>` in content since title is displayed in header

**Styling**:
- Maximum width for readability (typically 65-75 characters per line)
- Centered content with auto margins
- Responsive padding (smaller on mobile, larger on desktop)
- Large title font (5xl size, semibold weight)
- Secondary color for date timestamp
- Styled back link with border-bottom

**When to Use**:
- Blog articles and posts
- Tutorial content
- Long-form writing
- Any content with a publication date
- Content that benefits from constrained reading width

**Required Frontmatter Fields**:
```yaml
---
title: Article Title        # Required - displayed in header
date: 2024-01-15           # Required - displayed as timestamp
description: Brief summary  # Recommended for SEO
cover: /images/cover.jpg   # Optional - used for og:image
---
```

**Example Content File**:
```markdown
---
title: Getting Started with Alpine
description: A comprehensive guide to the Alpine theme
date: 2024-01-15
cover: /images/alpine-cover.jpg
layout: article
---

# Getting Started with Alpine

This is the article content. The h1 above will be hidden since the title is displayed in the header.

## Introduction

Article content continues here with optimal reading width...

## Conclusion

The article layout provides a great reading experience.
```

**Configuration Options**:

The article layout respects the `alpine.backToTop` configuration in `app.config.ts`:

```typescript
export default defineAppConfig({
  alpine: {
    backToTop: {
      text: 'Back to top',
      icon: 'material-symbols:arrow-upward'
    }
  }
})
```

Set `backToTop: false` to disable the feature entirely.

**Notes**:
- Back link automatically calculates parent path by removing last segment
- Date must be in `YYYY-MM-DD` format for proper parsing
- Content is wrapped in `.prose` class for typography styling
- First `<h1>` in content is hidden to avoid duplicate titles
- Smooth scroll behavior for "back to top" functionality
- Ideal for content that benefits from focused, distraction-free reading

---

### Page Layout

**Location**: `layouts/page.vue`

**Purpose**: Alias for the default layout. Provides identical functionality but with a semantically different name for clarity in content files.

**Structure**:
```vue
<template>
  <main>
    <slot />
  </main>
</template>
```

**Features**:
- Identical to default layout
- Same minimal markup and flexibility
- Wrapped by AppLayout (header, footer, loading bar)

**When to Use**:
- When you want semantic clarity that content is a "page" rather than default
- Functionally identical to default layout
- Use based on personal preference or team conventions

**Example Content File**:
```markdown
---
title: Contact
description: Get in touch
layout: page
---

# Contact

Use the form below to get in touch.

::contact-form
::
```

**Notes**:
- No functional difference from default layout
- Provided for semantic clarity in frontmatter
- Choose between `default` and `page` based on preference
- Both provide the same minimal, flexible structure

---

### Layout Selection Guide

**Decision Tree:**

```
Is this a blog article with a publication date?
├─ YES → Use 'article' layout
│         - Includes title, date, back navigation
│         - Optimized reading width
│         - Back to top functionality
│
└─ NO → Use 'default' or 'page' layout
          - Maximum flexibility
          - Full-width content control
          - Ideal for landing pages, about, listings
```

**Common Patterns:**

| Content Type | Recommended Layout | Reason |
|--------------|-------------------|---------|
| Homepage | `default` | Needs Hero, Gallery, flexible structure |
| About Page | `default` or `page` | Custom content structure |
| Articles Index | `default` | Uses ArticlesList component |
| Blog Article | `article` | Needs date, back nav, reading width |
| Tutorial | `article` | Long-form content benefits from constraints |
| Contact Page | `default` or `page` | Needs ContactForm component |
| Portfolio | `default` | Needs Gallery, custom layout |

**Frontmatter Examples:**

**Homepage** (`content/1.index.md`):
```yaml
---
title: John Doe - Developer
description: Full-stack developer and writer
layout: default
---
```

**Articles Listing** (`content/2.articles.md`):
```yaml
---
title: Articles
description: Blog posts and tutorials
layout: default
---
```

**Individual Article** (`content/articles/my-post.md`):
```yaml
---
title: My Blog Post
description: An interesting article
date: 2024-01-15
layout: article
---
```

---

### Layout Customization

**Overriding Layouts:**

To customize a layout, create a file with the same name in your project's `layouts/` directory:

```
your-project/
└── layouts/
    └── article.vue    # Your custom article layout
```

Your custom layout will be used instead of Alpine's version.

**Extending Layouts:**

You can import and extend the original Alpine layout:

```vue
<script setup lang="ts">
// Import original layout (if needed for reference)
// Note: You'll typically create a completely new layout
</script>

<template>
  <article class="custom-article">
    <!-- Your custom article layout structure -->
    <slot />
  </article>
</template>

<style scoped>
.custom-article {
  /* Your custom styles */
}
</style>
```

**Creating New Layouts:**

Add new layout files to your project's `layouts/` directory:

```
your-project/
└── layouts/
    ├── default.vue
    ├── article.vue
    ├── page.vue
    └── custom.vue    # Your new layout
```

Use in frontmatter:
```yaml
---
layout: custom
---
```

---

### Layout Integration with AppLayout

All layouts are automatically wrapped by the `AppLayout` component, which provides the overall page structure:

**AppLayout Structure:**
```vue
<Container class="app-layout">
  <AppLoadingBar />
  <AppHeader v-if="alpine.header" />
  <slot />  <!-- Your layout renders here -->
  <AppFooter v-if="alpine.footer" />
</Container>
```

**What AppLayout Provides:**
- **Container**: Responsive container with consistent spacing
- **AppLoadingBar**: Progress bar during page transitions
- **AppHeader**: Site header with logo, navigation, color mode switch
- **AppFooter**: Site footer with navigation, social icons, credits
- **Meta Tags**: Twitter card meta tags
- **Content Head**: Automatic head management from content frontmatter

**Controlling AppLayout Elements:**

Configure header and footer visibility in `app.config.ts`:

```typescript
export default defineAppConfig({
  alpine: {
    header: {
      position: 'left',
      logo: {
        path: '/logo.svg',
        alt: 'My Site'
      }
    },
    footer: {
      alignment: 'center',
      credits: {
        enabled: true
      }
    }
  }
})
```

Set to `false` to hide:
```typescript
export default defineAppConfig({
  alpine: {
    header: false,  // Hide header
    footer: false   // Hide footer
  }
})
```

---

### Best Practices for Layouts

**Layout Selection:**
- Use `article` layout for all blog posts and long-form content
- Use `default` layout for pages with custom structure (homepage, about, listings)
- Use `page` layout when you want semantic clarity (functionally same as default)
- Always specify layout explicitly in frontmatter for clarity

**Article Layout:**
- Always include `date` field in frontmatter for article layout
- Use `cover` field for social media sharing (og:image)
- Keep article content focused - the constrained width is intentional
- Don't use `<h1>` in article content - it's provided by the layout header

**Default/Page Layout:**
- Leverage MDC components (Hero, Gallery, ArticlesList) for rich content
- Structure content with proper heading hierarchy
- Use semantic HTML elements
- Consider responsive design - content is full-width

**Customization:**
- Override layouts in your project's `layouts/` directory
- Maintain semantic HTML structure when customizing
- Test responsive behavior on mobile and desktop
- Preserve accessibility features (semantic elements, ARIA labels)

**Performance:**
- Layouts are automatically code-split by Nuxt
- Keep layout components lightweight
- Avoid heavy computations in layout setup
- Use async data loading in pages, not layouts

## Styling System

Alpine uses **Pinceau**, a CSS-in-JS styling system with design tokens, to provide a flexible and customizable styling architecture. Pinceau allows you to define design tokens in TypeScript configuration files and reference them throughout your components using a special token syntax.

### Pinceau Overview

**What is Pinceau?**

Pinceau is a styling system that:
- **Defines design tokens** in TypeScript configuration files (`tokens.config.ts`)
- **Provides type-safe token references** using `{token.path}` syntax in CSS
- **Supports theme layering** where tokens can be overridden at different levels
- **Enables dark mode** with `initial` and `dark` variants for color tokens
- **Integrates with Nuxt Studio** for visual token editing

**Token Reference Syntax:**

Tokens are referenced in CSS using curly brace syntax:

```css
.my-component {
  color: {color.primary.500};
  padding: {space.4};
  font-size: {fontSize.lg};
  border-radius: {radii.md};
}
```

At build time, Pinceau resolves these token references to actual CSS values and generates CSS custom properties for dynamic tokens (like color mode variants).

**Token Layering:**

Alpine's token system is layered through the `extends` system:

1. **Base Tokens** (`@nuxt-themes/tokens`): Core design system with colors, spacing, typography, etc.
2. **Typography Tokens** (`@nuxt-themes/typography`): Typography-specific tokens and prose styling
3. **Elements Tokens** (`@nuxt-themes/elements`): Component-specific tokens for UI elements
4. **Alpine Tokens** (`@nuxt-themes/alpine`): Alpine-specific customizations
5. **Your Project Tokens** (`tokens.config.ts` in your project): Your custom overrides

Each layer can override tokens from layers below it, providing a flexible customization system.

---

### Design Tokens

Alpine inherits and customizes design tokens from multiple sources. Below is a comprehensive catalog of all available tokens organized by category.

#### Alpine-Specific Tokens

These tokens are defined directly in Alpine's `tokens.config.ts`:

**`alpine.body`** - Body element styling
- `backgroundColor.initial`: `{color.white}` - Light mode background
- `backgroundColor.dark`: `{color.black}` - Dark mode background
- `color.initial`: `{color.gray.800}` - Light mode text color
- `color.dark`: `{color.gray.200}` - Dark mode text color

**`alpine.backdrop`** - Backdrop/overlay styling (used in mobile menu)
- `backgroundColor.initial`: `#f4f4f5b3` - Light mode backdrop (gray with 70% opacity)
- `backgroundColor.dark`: `#18181bb3` - Dark mode backdrop (dark gray with 70% opacity)

**`alpine.readableLine`** - Maximum line width for readable content
- Value: `68ch` - Optimal reading width (used in article layout)

**`elements.container`** - Container sizing (Alpine override)
- `maxWidth`: `64rem` (1024px) - Maximum container width
- `padding.mobile`: `{space.6}` (1.5rem) - Mobile padding
- `padding.xs`: `{space.8}` (2rem) - Extra-small breakpoint padding
- `padding.sm`: `{space.12}` (3rem) - Small breakpoint padding
- `padding.md`: `{space.16}` (4rem) - Medium breakpoint padding

**`color.primary`** - Primary brand color (Alpine override)
- Alpine sets this to `{color.lightblue}` (cyan/light blue palette)
- Inherits all shades (50-900) from the lightblue color palette

**`prose.p`** - Paragraph styling (Alpine override)
- `fontSize`: `18px` - Larger paragraph text for better readability

---

### Color Tokens

Alpine inherits a comprehensive color system from `@nuxt-themes/tokens` with 20+ color palettes, each with 10 shades (50-900).

#### Base Colors

**`color.white`**: `#FFFFFF` - Pure white
**`color.black`**: `#0c0c0d` - Near-black (slightly lighter than pure black)

#### Gray Palette

**`color.gray`** - Neutral gray scale (most commonly used)
- `50`: `#fafafa` - Lightest gray
- `100`: `#f4f4f5`
- `200`: `#e4e4e7`
- `300`: `#D4d4d8`
- `400`: `#a1a1aa`
- `500`: `#71717A` - Mid gray
- `600`: `#52525B`
- `700`: `#3f3f46`
- `800`: `#27272A`
- `900`: `#18181B` - Darkest gray

#### Primary Color Palette

**`color.primary`** - Alpine's primary brand color (lightblue)
- `50`: `#d9f8ff` - Lightest cyan
- `100`: `#b3f1ff`
- `200`: `#8deaff`
- `300`: `#66e4ff`
- `400`: `#40ddff`
- `500`: `#1ad6ff` - Base primary color
- `600`: `#00b9e1`
- `700`: `#008aa9`
- `800`: `#005c70`
- `900`: `#002e38` - Darkest cyan

#### Additional Color Palettes

Alpine inherits these full color palettes (each with shades 50-900):

**Green Palette** (`color.green`): Vibrant green, base: `#00dc82`
**Yellow Palette** (`color.yellow`): Warm yellow, base: `#f5c828`
**Orange Palette** (`color.orange`): Bright orange, base: `#ff7a1a`
**Red Palette** (`color.red`): Vibrant red, base: `#ff281a`
**Pear Palette** (`color.pear`): Yellow-green, base: `#d0d32f`
**Teal Palette** (`color.teal`): Blue-green, base: `#1cd1c6`
**Lightblue Palette** (`color.lightblue`): Cyan, base: `#1ad6ff` (Alpine's primary)
**Blue Palette** (`color.blue`): Standard blue, base: `#1aadff`
**Indigoblue Palette** (`color.indigoblue`): Deep blue, base: `#1a62ff`
**Royalblue Palette** (`color.royalblue`): Purple-blue, base: `#4127e8`
**Purple Palette** (`color.purple`): Vibrant purple, base: `#811aff`
**Pink Palette** (`color.pink`): Bright pink, base: `#ff1ab2`
**Ruby Palette** (`color.ruby`): Pink-red, base: `#ff1a5e`

**Usage Example:**
```css
.my-component {
  background-color: {color.primary.500};
  color: {color.white};
  border-color: {color.gray.300};
}
```

---

### Spacing Tokens

Spacing tokens provide consistent spacing values throughout the theme.

#### Space Scale

**`space`** - Spacing scale based on rem units (1rem = 16px)

**Numeric Scale** (0-96):
- `0`: `0px`
- `1`: `0.25rem` (4px)
- `2`: `0.5rem` (8px)
- `3`: `0.75rem` (12px)
- `4`: `1rem` (16px)
- `5`: `1.25rem` (20px)
- `6`: `1.5rem` (24px)
- `7`: `1.75rem` (28px)
- `8`: `2rem` (32px)
- `9`: `2.25rem` (36px)
- `10`: `2.5rem` (40px)
- `11`: `2.75rem` (44px)
- `12`: `3rem` (48px)
- `14`: `3.5rem` (56px)
- `16`: `4rem` (64px)
- `20`: `5rem` (80px)
- `24`: `6rem` (96px)
- `28`: `7rem` (112px)
- `32`: `8rem` (128px)
- `36`: `9rem` (144px)
- `40`: `10rem` (160px)
- `44`: `11rem` (176px)
- `48`: `12rem` (192px)
- `52`: `13rem` (208px)
- `56`: `14rem` (224px)
- `60`: `15rem` (240px)
- `64`: `16rem` (256px)
- `72`: `18rem` (288px)
- `80`: `20rem` (320px)
- `96`: `24rem` (384px)

**Special Values**:
- `px`: `1px` - Single pixel
- `rem.125`: `0.125rem` (2px)
- `rem.375`: `0.375rem` (6px)
- `rem.625`: `0.625rem` (10px)
- `rem.875`: `0.875rem` (14px)

**Usage Example:**
```css
.my-component {
  padding: {space.4} {space.6};
  margin-bottom: {space.8};
  gap: {space.2};
}
```

#### Size Scale

**`size`** - Fixed size values for width/height

**Pixel Scale** (0-200):
- `0`, `2`, `4`, `6`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `104`, `200`

**Named Sizes** (xs-7xl):
- `xs`: `20rem` (320px)
- `sm`: `24rem` (384px)
- `md`: `28rem` (448px)
- `lg`: `32rem` (512px)
- `xl`: `36rem` (576px)
- `2xl`: `42rem` (672px)
- `3xl`: `48rem` (768px)
- `4xl`: `56rem` (896px)
- `5xl`: `64rem` (1024px)
- `6xl`: `72rem` (1152px)
- `7xl`: `80rem` (1280px)

**Special**:
- `full`: `100%`

**Usage Example:**
```css
.my-component {
  width: {size.full};
  max-width: {size.5xl};
  height: {size.64};
}
```

---

### Typography Tokens

Typography tokens control font families, sizes, weights, line heights, and letter spacing.

#### Font Families

**`font`** - Font family stacks
- `sans`: System sans-serif stack (default)
  - `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`
- `serif`: System serif stack
  - `ui-serif, Georgia, Cambria, Times New Roman, Times, serif`
- `mono`: System monospace stack (for code)
  - `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

**Typography-Specific Fonts** (`typography.font`):
- `display`: `{font.sans}` - For headings
- `body`: `{font.sans}` - For body text
- `code`: `{font.mono}` - For code blocks

#### Font Sizes

**`fontSize`** - Font size scale
- `xs`: `0.75rem` (12px)
- `sm`: `0.875rem` (14px)
- `base`: `1rem` (16px)
- `lg`: `1.125rem` (18px)
- `xl`: `1.25rem` (20px)
- `2xl`: `1.5rem` (24px)
- `3xl`: `1.875rem` (30px)
- `4xl`: `2.25rem` (36px)
- `5xl`: `3rem` (48px)
- `6xl`: `3.75rem` (60px)
- `7xl`: `4.5rem` (72px)
- `8xl`: `6rem` (96px)
- `9xl`: `8rem` (128px)

**Typography Font Sizes** (`typography.fontSize`):
- Same scale as above, used specifically for prose content

#### Font Weights

**`fontWeight`** - Font weight scale
- `thin`: `100`
- `extralight`: `200`
- `light`: `300`
- `normal`: `400`
- `medium`: `500`
- `semibold`: `600`
- `bold`: `700`
- `extrabold`: `800`
- `black`: `900`

#### Line Heights

**`lead`** - Line height scale
- `1` through `10`: Fixed rem values (`.025rem` to `2.5rem`)
- `none`: `1` - No extra line height
- `tight`: `1.25` - Tight line height (headings)
- `snug`: `1.375` - Snug line height
- `normal`: `1.5` - Normal line height (body text)
- `relaxed`: `1.625` - Relaxed line height
- `loose`: `2` - Loose line height

#### Letter Spacing

**`letterSpacing`** - Letter spacing scale
- `tighter`: `-0.05em`
- `tight`: `-0.025em` - Used for headings
- `normal`: `0em`
- `wide`: `0.025em`
- `wider`: `0.05em`
- `widest`: `0.1em`

#### Text Scale (Combined)

**`text`** - Combined font size + line height presets
- `xs`: `fontSize: {fontSize.xs}`, `lineHeight: {lead.4}`
- `sm`: `fontSize: {fontSize.sm}`, `lineHeight: {lead.5}`
- `base`: `fontSize: {fontSize.base}`, `lineHeight: {lead.6}`
- `lg`: `fontSize: {fontSize.lg}`, `lineHeight: {lead.7}`
- `xl`: `fontSize: {fontSize.xl}`, `lineHeight: {lead.7}`
- `2xl`: `fontSize: {fontSize.2xl}`, `lineHeight: {lead.8}`
- `3xl`: `fontSize: {fontSize.3xl}`, `lineHeight: {lead.9}`
- `4xl`: `fontSize: {fontSize.4xl}`, `lineHeight: {lead.10}`
- `5xl`: `fontSize: {fontSize.5xl}`, `lineHeight: {lead.none}`
- `6xl`: `fontSize: {fontSize.6xl}`, `lineHeight: {lead.none}`

**Usage Example:**
```css
.my-heading {
  font-family: {font.sans};
  font-size: {fontSize.4xl};
  font-weight: {fontWeight.bold};
  line-height: {lead.tight};
  letter-spacing: {letterSpacing.tight};
}

/* Or use combined text scale */
.my-text {
  @apply text(lg);
}
```

---

### Layout Tokens

Layout tokens control borders, shadows, radii, and other structural properties.

#### Border Radius

**`radii`** - Border radius scale
- `none`: `0px`
- `2xs`: `0.125rem` (2px)
- `xs`: `0.25rem` (4px)
- `sm`: `0.375rem` (6px)
- `md`: `0.5rem` (8px)
- `lg`: `0.75rem` (12px)
- `xl`: `1rem` (16px)
- `2xl`: `1.5rem` (24px)
- `3xl`: `1.75rem` (28px)
- `full`: `9999px` - Fully rounded (pills)

#### Border Width

**`borderWidth`** - Border width scale
- `noBorder`: `0`
- `sm`: `1px`
- `md`: `2px`
- `lg`: `3px`

#### Shadows

**`shadow`** - Box shadow scale
- `xs`: `0px 1px 2px 0px #000000`
- `sm`: `0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000`
- `md`: `0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000`
- `lg`: `0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000`
- `xl`: `0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000`
- `2xl`: `0px 25px 50px -12px {color.gray.900}`
- `none`: `0px 0px 0px 0px transparent`

#### Opacity

**`opacity`** - Opacity scale
- `noOpacity`: `0`
- `bright`: `0.1`
- `light`: `0.15`
- `soft`: `0.3`
- `medium`: `0.5`
- `high`: `0.8`
- `total`: `1`

#### Screen Sizes

**`width.screen`**: `100vw` - Full viewport width
**`height.screen`**: `100vh` - Full viewport height

**Usage Example:**
```css
.my-card {
  border-radius: {radii.lg};
  border-width: {borderWidth.sm};
  box-shadow: {shadow.md};
  opacity: {opacity.medium};
}
```

---

### Media Query Tokens

**`media`** - Responsive breakpoints and media queries

**Breakpoints**:
- `xs`: `(min-width: 475px)`
- `sm`: `(min-width: 640px)`
- `md`: `(min-width: 768px)`
- `lg`: `(min-width: 1024px)`
- `xl`: `(min-width: 1280px)`
- `2xl`: `(min-width: 1536px)`

**Special Media Queries**:
- `rm`: `(prefers-reduced-motion: reduce)` - Reduced motion preference
- `landscape`: `only screen and (orientation: landscape)`
- `portrait`: `only screen and (orientation: portrait)`

**Usage Example:**
```css
.my-component {
  padding: {space.4};
  
  @media {media.md} {
    padding: {space.8};
  }
  
  @media {media.lg} {
    padding: {space.12};
  }
}
```

---

### Prose Tokens

Prose tokens control the styling of markdown content rendered through Nuxt Content. These are defined in `@nuxt-themes/typography`.

#### Prose Elements

**`prose.p`** - Paragraphs
- `fontSize`: `18px` (Alpine override for better readability)
- `lineHeight`: `{typography.lead.normal}`
- `margin`: `{typography.verticalMargin.base} 0`

**`prose.h1`** - Heading 1
- `fontSize`: `{typography.fontSize.5xl}` (48px)
- `lineHeight`: `{typography.lead.tight}`
- `fontWeight`: `{typography.fontWeight.bold}`
- `letterSpacing`: `{typography.letterSpacing.tight}`
- `margin`: `0 0 2rem`

**`prose.h2`** - Heading 2
- `fontSize`: `{typography.fontSize.4xl}` (36px)
- `lineHeight`: `{typography.lead.tight}`
- `fontWeight`: `{typography.fontWeight.semibold}`
- `margin`: `3rem 0 2rem`

**`prose.h3`** - Heading 3
- `fontSize`: `{typography.fontSize.3xl}` (30px)
- `lineHeight`: `{typography.lead.snug}`
- `fontWeight`: `{typography.fontWeight.semibold}`
- `margin`: `3rem 0 2rem`

**`prose.h4`** through **`prose.h6`** - Smaller headings with decreasing font sizes

**`prose.a`** - Links
- `textDecoration`: `none`
- `color.hover`: `{typography.color.primary.500}` (light) / `{typography.color.primary.400}` (dark)
- `border.width`: `1px`
- `border.style`: `dashed` (static) / `solid` (hover)
- `fontWeight`: `{typography.fontWeight.medium}`

**`prose.code.inline`** - Inline code
- `fontSize`: `{typography.fontSize.sm}`
- `padding`: `0.2rem 0.375rem`
- `borderRadius`: `{radii.xs}`
- `backgroundColor`: `{typography.color.secondary.100}` (light) / `{typography.color.secondary.800}` (dark)

**`prose.code.block`** - Code blocks
- `fontSize`: `{typography.fontSize.sm}`
- `margin`: `{typography.verticalMargin.base} 0`
- `border.width`: `1px`
- `backgroundColor`: `{typography.color.secondary.100}` (light) / `{typography.color.secondary.900}` (dark)

**`prose.blockquote`** - Blockquotes
- `margin`: `{typography.verticalMargin.base} 0`
- `paddingInlineStart`: `24px`
- `border.width`: `4px`
- `border.color`: `{typography.color.secondary.200}` (light) / `{typography.color.secondary.700}` (dark)

**`prose.ul`** / **`prose.ol`** - Lists
- `listStyleType`: `disc` (ul) / `decimal` (ol)
- `margin`: `{typography.verticalMargin.base} 0`
- `paddingInlineStart`: `21px`

**`prose.table`** - Tables
- `fontSize`: `{typography.fontSize.sm}`
- `margin`: `{typography.verticalMargin.base} 0`

---

### Elements Tokens

Elements tokens are used by components from `@nuxt-themes/elements` and provide semantic styling for UI elements.

#### Container

**`elements.container`** - Main container sizing
- `maxWidth`: `64rem` (1024px) - Alpine override
- `padding.mobile`: `{space.6}` (24px)
- `padding.xs`: `{space.8}` (32px)
- `padding.sm`: `{space.12}` (48px)
- `padding.md`: `{space.16}` (64px)

#### Text Colors

**`elements.text.primary`** - Primary text color
- `color.static.initial`: `{color.gray.900}` (light mode)
- `color.static.dark`: `{color.gray.50}` (dark mode)

**`elements.text.secondary`** - Secondary text color
- `color.static.initial`: `{color.gray.500}` (light mode)
- `color.static.dark`: `{color.gray.400}` (dark mode)
- `color.hover.initial`: `{color.gray.700}` (light mode)
- `color.hover.dark`: `{color.gray.200}` (dark mode)

#### Borders

**`elements.border.primary`** - Primary border color
- `static.initial`: `{color.gray.100}` (light mode)
- `static.dark`: `{color.gray.900}` (dark mode)
- `hover.initial`: `{color.gray.200}` (light mode)
- `hover.dark`: `{color.gray.800}` (dark mode)

**`elements.border.secondary`** - Secondary border color
- `static.initial`: `{color.gray.200}` (light mode)
- `static.dark`: `{color.gray.800}` (dark mode)

#### Surfaces

**`elements.surface.background.base`** - Base surface background
- `initial`: `{color.gray.100}` (light mode)
- `dark`: `{color.gray.900}` (dark mode)

#### Backdrop

**`elements.backdrop`** - Backdrop/overlay styling
- `filter`: `saturate(200%) blur(20px)`
- `background.initial`: `#fffc` (white with 80% opacity)
- `background.dark`: `#0c0d0ccc` (black with 80% opacity)

#### State Colors

**`elements.state`** - Semantic state colors (primary, info, success, warning, danger)

Each state has three color properties (color, backgroundColor, borderColor) with primary and secondary variants for both light and dark modes.

**Example - Primary State**:
- `elements.state.primary.color.primary.initial`: `{color.primary.600}`
- `elements.state.primary.backgroundColor.primary.initial`: `{color.primary.50}`
- `elements.state.primary.borderColor.primary.initial`: `{color.primary.100}`

**Available States**: `primary`, `info`, `success`, `warning`, `danger`

---

### Token Customization

You can customize any token by creating a `tokens.config.ts` file in your project root.

#### Basic Customization

**Override specific tokens**:

```typescript
// tokens.config.ts
import { defineTheme } from 'pinceau'

export default defineTheme({
  // Override Alpine's primary color
  color: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Base red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  
  // Override Alpine-specific tokens
  alpine: {
    readableLine: '75ch', // Wider reading width
    body: {
      backgroundColor: {
        initial: '#fafafa',
        dark: '#0a0a0a'
      }
    }
  },
  
  // Override container sizing
  elements: {
    container: {
      maxWidth: '72rem', // Wider container
      padding: {
        mobile: '{space.4}',
        md: '{space.20}'
      }
    }
  }
})
```

#### Advanced Customization

**Add custom tokens**:

```typescript
// tokens.config.ts
import { defineTheme } from 'pinceau'

export default defineTheme({
  // Add custom color palette
  color: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    }
  },
  
  // Add custom spacing values
  space: {
    128: '32rem',
    144: '36rem'
  },
  
  // Add custom typography scale
  fontSize: {
    '10xl': '10rem'
  },
  
  // Add custom semantic tokens
  myApp: {
    header: {
      height: '80px',
      backgroundColor: {
        initial: '{color.white}',
        dark: '{color.gray.900}'
      }
    },
    sidebar: {
      width: '280px',
      backgroundColor: {
        initial: '{color.gray.50}',
        dark: '{color.gray.800}'
      }
    }
  }
})
```

#### Using Custom Tokens

Once defined, use your custom tokens in components:

```vue
<template>
  <div class="my-component">
    <h1>Hello World</h1>
  </div>
</template>

<style scoped>
.my-component {
  background-color: {color.brand.500};
  padding: {space.128};
  
  h1 {
    font-size: {fontSize.10xl};
    color: {color.white};
  }
}
</style>
```

#### Token Utilities

Pinceau provides utility functions for common CSS patterns:

**`my(value)`** - Margin top and bottom
```css
.element {
  @apply my({space.4});
  /* Generates: margin-top: 1rem; margin-bottom: 1rem; */
}
```

**`mx(value)`** - Margin left and right
```css
.element {
  @apply mx({space.6});
  /* Generates: margin-left: 1.5rem; margin-right: 1.5rem; */
}
```

**`py(value)`** - Padding top and bottom
```css
.element {
  @apply py({space.8});
  /* Generates: padding-top: 2rem; padding-bottom: 2rem; */
}
```

**`px(value)`** - Padding left and right
```css
.element {
  @apply px({space.4});
  /* Generates: padding-left: 1rem; padding-right: 1rem; */
}
```

**`truncate`** - Text truncation
```css
.element {
  @apply truncate;
  /* Generates: overflow: hidden; text-overflow: ellipsis; white-space: nowrap; */
}
```

**`lineClamp(lines)`** - Multi-line text truncation
```css
.element {
  @apply lineClamp(3);
  /* Generates: overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; */
}
```

**`text(size)`** - Combined font size and line height
```css
.element {
  @apply text(xl);
  /* Generates: font-size: 1.25rem; line-height: 1.75rem; */
}
```

---

### Best Practices for Styling

**Token Usage**:
- Always use tokens instead of hardcoded values for consistency
- Reference tokens using `{token.path}` syntax in CSS
- Use semantic tokens (like `{color.primary.500}`) instead of specific colors
- Leverage dark mode variants with `initial` and `dark` properties

**Customization Strategy**:
- Override tokens in `tokens.config.ts` rather than hardcoding values
- Create custom semantic tokens for app-specific values
- Use token layering to maintain consistency across themes
- Test customizations in both light and dark modes

**Component Styling**:
- Use scoped styles in Vue components
- Leverage Pinceau utilities for common patterns
- Keep component styles minimal and token-based
- Use prose tokens for markdown content styling

**Performance**:
- Pinceau generates optimized CSS at build time
- Token references are resolved to CSS custom properties
- Dark mode switching is instant (no re-render)
- Unused tokens are tree-shaken from the final bundle

**Debugging**:
- Use browser DevTools to inspect resolved token values
- Check generated CSS custom properties in `:root`
- Verify token references resolve correctly
- Test responsive behavior at different breakpoints

## Configuration

Alpine provides extensive configuration options through `app.config.ts` and `nuxt.config.ts`. The theme uses Nuxt's app config system for theme-specific settings and the standard Nuxt config for framework-level settings.

### Configuration Files Overview

**`app.config.ts`** (Your Project)
- Theme-specific configuration (title, description, header, footer, socials)
- Merged with Alpine's default `app.config.ts`
- Hot-reloaded during development
- Accessible via `useAppConfig()` composable

**`nuxt.config.ts`** (Your Project)
- Nuxt framework configuration
- Module configuration
- Build settings
- Runtime configuration (environment variables)

**`nuxt.schema.ts`** (Alpine Theme)
- Defines the structure and types for `app.config.ts`
- Provides TypeScript autocomplete
- Includes Nuxt Studio annotations

---

### app.config.ts Options

All Alpine configuration is nested under the `alpine` key in `app.config.ts`. Below is a complete reference of all available options.

#### Basic Configuration Example

```typescript
// app.config.ts
export default defineAppConfig({
  alpine: {
    title: 'My Site',
    description: 'My awesome website',
    // ... other options
  }
})
```

---

#### Site Metadata

**`alpine.title`**
- **Type**: `string`
- **Default**: `'Alpine'`
- **Description**: Website title, used as header default title and meta title
- **Usage**: Displayed in browser tab, header (if no logo), and meta tags

**`alpine.description`**
- **Type**: `string`
- **Default**: `'The minimalist blog theme'`
- **Description**: Website description, used for meta description
- **Usage**: SEO meta description tag

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    title: 'John Doe - Developer',
    description: 'Full-stack developer specializing in Vue.js and Node.js'
  }
})
```

---

#### Social Card Image

**`alpine.image`**
- **Type**: `object`
- **Description**: Cover image for social media sharing (Open Graph, Twitter Cards)

**Properties**:
- **`src`** (string, default: `'/social-card-preview.png'`): Path to the image file (relative to `public/`)
- **`alt`** (string, default: `'An image showcasing my project.'`): Alt text for the image
- **`width`** (number, default: `400`): Image width in pixels
- **`height`** (number, default: `300`): Image height in pixels

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    image: {
      src: '/og-image.jpg',
      alt: 'My Site - Full-stack development and tutorials',
      width: 1200,
      height: 630
    }
  }
})
```

**Notes**:
- Recommended size: 1200x630px for optimal social media display
- Image should be placed in the `public/` directory
- Used for `og:image` and `twitter:image` meta tags

---

#### Header Configuration

**`alpine.header`**
- **Type**: `object | false`
- **Description**: Header configuration including position and logo
- **Set to `false`**: Completely hide the header

**Properties**:

**`alpine.header.position`**
- **Type**: `'left' | 'center' | 'right'`
- **Default**: `'right'`
- **Description**: Header alignment (affects logo and navigation positioning)

**`alpine.header.logo`**
- **Type**: `object`
- **Description**: Logo configuration

**Logo Properties**:
- **`path`** (string, default: `'/logo.svg'`): Path to logo file (relative to `public/`)
- **`pathDark`** (string, default: `'/logo-dark.svg'`): Path to dark mode logo (leave empty to use same logo)
- **`alt`** (string, default: `'Alpine theme logo'`): Alt text for logo image

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    header: {
      position: 'left',
      logo: {
        path: '/my-logo.svg',
        pathDark: '/my-logo-dark.svg',
        alt: 'My Site Logo'
      }
    }
  }
})
```

**Hide Header**:
```typescript
export default defineAppConfig({
  alpine: {
    header: false  // Completely hide header
  }
})
```

**Disable Logo (Use Site Title)**:
```typescript
export default defineAppConfig({
  alpine: {
    header: {
      position: 'left'
      // Omit logo property to use site title instead
    }
  }
})
```

**Notes**:
- If no logo files exist, the site title is displayed instead
- To use the site title instead of a logo, simply omit the `logo` property
- Setting `logo: false` will cause a TypeScript error - omit the property instead
- Logo images should be placed in the `public/` directory
- Dark mode logo is optional (uses light logo if not specified)
- Header position affects both logo and navigation alignment

---

#### Footer Configuration

**`alpine.footer`**
- **Type**: `object | false`
- **Description**: Footer configuration including credits, navigation, and alignment
- **Set to `false`**: Completely hide the footer

**Properties**:

**`alpine.footer.credits`**
- **Type**: `object`
- **Description**: Footer credits section configuration

**Credits Properties**:
- **`enabled`** (boolean, default: `true`): Toggle credits visibility
- **`text`** (string, default: `'Alpine'`): Text to display in credits
- **`repository`** (string, default: `'https://www.github.com/nuxt-themes/alpine'`): GitHub repository link

**`alpine.footer.navigation`**
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Toggle navigation menu in footer

**`alpine.footer.alignment`**
- **Type**: `'left' | 'center' | 'right'`
- **Default**: `'center'`
- **Description**: Footer content alignment

**`alpine.footer.message`**
- **Type**: `string`
- **Default**: `'Follow me on'`
- **Description**: Message displayed above social icons (leave empty to disable)

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    footer: {
      credits: {
        enabled: true,
        text: 'Built with Alpine',
        repository: 'https://github.com/myusername/mysite'
      },
      navigation: true,
      alignment: 'center',
      message: 'Connect with me'
    }
  }
})
```

**Minimal Footer**:
```typescript
export default defineAppConfig({
  alpine: {
    footer: {
      credits: {
        enabled: false
      },
      navigation: false,
      message: ''
    }
  }
})
```

**Hide Footer**:
```typescript
export default defineAppConfig({
  alpine: {
    footer: false  // Completely hide footer
  }
})
```

---

#### Social Links

**`alpine.socials`**
- **Type**: `object`
- **Description**: Social media links displayed in footer

**Built-in Platforms**:
- **`twitter`** (string, default: `''`): Twitter/X handle (without @)
- **`instagram`** (string, default: `''`): Instagram handle (without @)
- **`github`** (string, default: `''`): GitHub username or org/repo path
- **`facebook`** (string, default: `''`): Facebook username
- **`medium`** (string, default: `''`): Medium handle (without @)
- **`youtube`** (string, default: `''`): YouTube channel handle (with or without @)

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    socials: {
      twitter: 'johndoe',
      github: 'johndoe',
      youtube: '@johndoechannel',
      instagram: 'johndoe',
      medium: 'johndoe',
      facebook: 'johndoe'
    }
  }
})
```

**Custom Social Links**:

You can add custom social links by adding properties with an object structure:

```typescript
export default defineAppConfig({
  alpine: {
    socials: {
      twitter: 'johndoe',
      github: 'johndoe',
      // Custom social link
      linkedin: {
        href: 'https://linkedin.com/in/johndoe',
        icon: 'mdi:linkedin',
        label: 'LinkedIn Profile',
        rel: 'me'
      },
      // Another custom link
      website: {
        href: 'https://example.com',
        icon: 'mdi:web',
        label: 'Personal Website'
      }
    }
  }
})
```

**Custom Link Properties**:
- **`href`** (string, required): Full URL to the social profile
- **`icon`** (string, required): Iconify icon name (e.g., `'mdi:linkedin'`)
- **`label`** (string, required): Accessible label for screen readers
- **`rel`** (string, optional): Link relationship attribute (e.g., `'me'` for rel-me)

**Notes**:
- Built-in platforms automatically generate URLs from handles
- Icons use Iconify via Nuxt Icon module
- All links open in new tabs with `noopener noreferrer`
- Empty strings hide that social icon

---

#### Contact Form

**`alpine.form`**
- **Type**: `object`
- **Description**: Contact form configuration

**Properties**:
- **`successMessage`** (string, default: `'Message sent. Thank you!'`): Message displayed after successful form submission

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    form: {
      successMessage: 'Thanks for reaching out! I\'ll get back to you soon.'
    }
  }
})
```

**Notes**:
- Contact form requires `FORMSPREE_URL` environment variable to be set
- See [Formspree Configuration](#formspree-configuration) for setup details

---

#### Back to Top Button

**`alpine.backToTop`**
- **Type**: `object | false`
- **Description**: Back to top button configuration (appears in article layout)
- **Set to `false`**: Disable back to top button

**Properties**:
- **`text`** (string, default: `'Back to top'`): Button text
- **`icon`** (string, default: `'material-symbols:arrow-upward'`): Iconify icon name

**Example**:
```typescript
export default defineAppConfig({
  alpine: {
    backToTop: {
      text: 'Scroll to top',
      icon: 'mdi:arrow-up'
    }
  }
})
```

**Disable Back to Top**:
```typescript
export default defineAppConfig({
  alpine: {
    backToTop: false
  }
})
```

**Notes**:
- Only appears in article layout
- Uses smooth scroll behavior
- Icon uses Iconify via Nuxt Icon module

---

### Complete app.config.ts Example

Here's a complete example with all options configured:

```typescript
// app.config.ts
export default defineAppConfig({
  alpine: {
    // Site metadata
    title: 'John Doe - Full-Stack Developer',
    description: 'Full-stack developer specializing in Vue.js, Nuxt, and Node.js. Sharing tutorials and insights.',
    
    // Social card image
    image: {
      src: '/og-image.jpg',
      alt: 'John Doe - Full-Stack Developer',
      width: 1200,
      height: 630
    },
    
    // Header configuration
    header: {
      position: 'left',
      logo: {
        path: '/logo.svg',
        pathDark: '/logo-dark.svg',
        alt: 'John Doe Logo'
      }
    },
    
    // Footer configuration
    footer: {
      credits: {
        enabled: true,
        text: 'Built with Alpine',
        repository: 'https://github.com/johndoe/mysite'
      },
      navigation: true,
      alignment: 'center',
      message: 'Connect with me'
    },
    
    // Social links
    socials: {
      twitter: 'johndoe',
      github: 'johndoe',
      youtube: '@johndoechannel',
      linkedin: {
        href: 'https://linkedin.com/in/johndoe',
        icon: 'mdi:linkedin',
        label: 'LinkedIn Profile',
        rel: 'me'
      }
    },
    
    // Contact form
    form: {
      successMessage: 'Thanks for reaching out! I\'ll get back to you soon.'
    },
    
    // Back to top button
    backToTop: {
      text: 'Back to top',
      icon: 'material-symbols:arrow-upward'
    }
  }
})
```

---

### nuxt.config.ts Integration

While most Alpine configuration happens in `app.config.ts`, some settings require `nuxt.config.ts` configuration.

#### Extending Alpine Theme

To use Alpine in your project, add it to the `extends` array:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine'
})
```

**Multiple Themes**:
```typescript
export default defineNuxtConfig({
  extends: [
    '@nuxt-themes/alpine',
    './my-custom-theme'
  ]
})
```

---

#### Runtime Configuration

**Environment Variables**:

Alpine uses runtime configuration for sensitive values like API keys.

**`FORMSPREE_URL`** - Contact form endpoint
- **Type**: `string`
- **Description**: Formspree form endpoint URL
- **Required for**: ContactForm component
- **Example**: `https://formspree.io/f/your-form-id`

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL
    }
  }
})
```

**Environment File** (`.env`):
```bash
FORMSPREE_URL=https://formspree.io/f/your-form-id
```

**Notes**:
- Runtime config values are replaced at runtime (not build time)
- Public runtime config is exposed to the client
- Environment variables are loaded automatically from `.env` file

---

#### Formspree Configuration

To enable the contact form:

1. **Create a Formspree account** at [formspree.io](https://formspree.io)
2. **Create a new form** and get your form endpoint URL
3. **Add the URL to your environment**:

```bash
# .env
FORMSPREE_URL=https://formspree.io/f/your-form-id
```

4. **Configure runtime config** (if not already done):

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL
    }
  }
})
```

5. **Use the ContactForm component** in your content:

```markdown
::contact-form
::
```

6. **Verify configuration**:

After setting up the environment variable, restart your dev server and verify the form is working:

```bash
# Restart dev server
npm run dev
```

Then check:
- Navigate to your contact page
- The form should be enabled (not showing a warning)
- Check browser console for any configuration warnings
- Try submitting the form to verify Formspree integration

**Notes**:
- Formspree free tier allows 50 submissions per month
- Form submissions are sent to your email
- Formspree handles spam protection
- If `FORMSPREE_URL` is not set, the form will be disabled

---

#### Content Configuration

Alpine pre-configures Nuxt Content with optimal settings. You can override these in your `nuxt.config.ts`:

**Default Content Configuration** (from Alpine):

```typescript
export default defineNuxtConfig({
  content: {
    documentDriven: true,           // Automatic page generation
    navigation: {
      fields: ['navTitle']          // Include navTitle in navigation
    },
    highlight: {                    // Syntax highlighting
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: [                    // Preloaded languages
        'json', 'js', 'ts', 'html', 'css', 'vue',
        'diff', 'shell', 'markdown', 'yaml', 'bash',
        'ini', 'c', 'cpp'
      ]
    }
  }
})
```

**Custom Content Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  content: {
    // Add more preloaded languages
    highlight: {
      preload: ['python', 'ruby', 'go', 'rust']
    },
    // Add custom navigation fields
    navigation: {
      fields: ['navTitle', 'icon', 'category']
    }
  }
})
```

**Available Content Options**:
- **`documentDriven`**: Enable automatic page generation from content files
- **`navigation.fields`**: Additional fields to include in navigation queries
- **`highlight.theme`**: Syntax highlighting theme (light and dark variants)
- **`highlight.preload`**: Languages to preload for syntax highlighting

---

#### Color Mode Configuration

Alpine uses Nuxt Color Mode for dark mode support. The default configuration is:

```typescript
export default defineNuxtConfig({
  colorMode: {
    classSuffix: ''  // No suffix for dark mode class
  }
})
```

**Custom Color Mode Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  colorMode: {
    preference: 'system',     // Default preference: 'system' | 'light' | 'dark'
    fallback: 'light',        // Fallback if system preference unavailable
    classSuffix: '',          // Class suffix (empty = 'dark', not 'dark-mode')
    storageKey: 'nuxt-color-mode'  // LocalStorage key
  }
})
```

---

#### Pinceau Configuration

Alpine uses Pinceau for design tokens. The default configuration is:

```typescript
export default defineNuxtConfig({
  pinceau: {
    studio: true  // Enable Nuxt Studio integration
  }
})
```

**Custom Pinceau Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  pinceau: {
    studio: true,
    debug: false,           // Enable debug mode
    preflight: true         // Include CSS reset
  }
})
```

---

#### Module Configuration

Alpine automatically includes these modules:
- `@nuxt-themes/tokens` - Design token system (Pinceau)
- `@nuxthq/studio` - Nuxt Studio integration
- `@nuxt/content` - Content management

**Adding Additional Modules**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  modules: [
    '@nuxtjs/sitemap',      // Add sitemap generation
    '@nuxtjs/robots',       // Add robots.txt
    'nuxt-simple-sitemap'   // Alternative sitemap
  ]
})
```

---

#### Build Configuration

**TypeScript Configuration**:

Alpine enables workspace TypeScript support:

```typescript
export default defineNuxtConfig({
  typescript: {
    includeWorkspace: true
  }
})
```

**Nitro Prerender Configuration**:

Alpine ignores Pinceau token files from prerendering:

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      ignore: [
        '/__pinceau_tokens_config.json',
        '/__pinceau_tokens_schema.json'
      ]
    }
  }
})
```

**Custom Prerender Routes**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml'],  // Additional routes
      ignore: ['/admin', '/api/*']           // Routes to skip
    }
  }
})
```

---

#### Experimental Features

Alpine disables inline SSR styles for better performance:

```typescript
export default defineNuxtConfig({
  experimental: {
    inlineSSRStyles: false
  }
})
```

---

### Configuration Best Practices

**App Config**:
- Use `app.config.ts` for theme-specific, non-sensitive configuration
- Keep configuration organized and well-commented
- Only specify values you want to override (defaults are merged)
- Use TypeScript for autocomplete and type checking

**Nuxt Config**:
- Use `nuxt.config.ts` for framework-level settings
- Store sensitive values in environment variables
- Use runtime config for values that change between environments
- Keep module configuration minimal and focused

**Environment Variables**:
- Store sensitive values (API keys, tokens) in `.env` file
- Never commit `.env` file to version control
- Add `.env` to `.gitignore`
- Document required environment variables in README

**Configuration Organization**:
- Keep `app.config.ts` focused on theme settings
- Use `nuxt.config.ts` for build and module configuration
- Create separate config files for complex module settings
- Use TypeScript for better developer experience

**Performance**:
- Minimize runtime config (increases bundle size)
- Use build-time configuration when possible
- Preload only necessary syntax highlighting languages
- Optimize images referenced in configuration

**Maintenance**:
- Document custom configuration in README
- Keep configuration DRY (Don't Repeat Yourself)
- Use constants for repeated values
- Version control all configuration files (except `.env`)

---

### Configuration Troubleshooting

**Issue**: Configuration changes not reflected

**Solution**:
- Restart dev server after changing `nuxt.config.ts`
- `app.config.ts` is hot-reloaded (no restart needed)
- Clear `.nuxt` directory: `rm -rf .nuxt`
- Check for TypeScript errors in config files

**Issue**: Logo not displaying

**Solution**:
- Verify logo file exists in `public/` directory
- Check file path is correct (relative to `public/`)
- Ensure file extension matches (`.svg`, `.png`, etc.)
- Check browser console for 404 errors

**Issue**: Contact form not working

**Solution**:
- Verify `FORMSPREE_URL` is set in `.env`
- Check runtime config in `nuxt.config.ts`
- Restart dev server after adding environment variable
- Check browser console for errors

**Issue**: Social icons not appearing

**Solution**:
- Verify social handles are not empty strings
- Check icon names are valid Iconify icons
- For custom icons, ensure all required properties are set
- Check `alpine.footer.message` is not empty (hides social section)

**Issue**: Dark mode not working

**Solution**:
- Verify Color Mode module is installed
- Check `colorMode` configuration in `nuxt.config.ts`
- Clear browser localStorage
- Check for CSS conflicts with dark mode classes

**Issue**: TypeScript errors in config

**Solution**:
- Ensure `@nuxt-themes/alpine` is installed
- Run `npm install` or `pnpm install`
- Check for typos in configuration keys
- Verify types are imported correctly

## Navigation System

Alpine uses Nuxt Content's automatic navigation generation to create menus from your content directory structure. The navigation system is powered by the `useContent()` composable in document-driven mode and requires minimal configuration.

### Navigation Generation

**How It Works:**

Alpine's navigation is automatically generated from the `content/` directory structure. When document-driven mode is enabled (which Alpine does by default), Nuxt Content:

1. **Scans the content directory** and creates a navigation tree based on file structure
2. **Extracts metadata** from frontmatter (title, navigation fields, etc.)
3. **Generates navigation objects** with `_path`, `title`, and custom fields
4. **Makes navigation available** via the `useContent()` composable

**Navigation Configuration** (from Alpine's `nuxt.config.ts`):

```typescript
export default defineNuxtConfig({
  content: {
    documentDriven: true,           // Enable automatic navigation
    navigation: {
      fields: ['navTitle']          // Include navTitle in navigation queries
    }
  }
})
```

**Key Points:**
- Navigation is generated at build time and cached
- File structure determines navigation hierarchy
- Frontmatter controls navigation appearance and behavior
- Numeric prefixes control navigation order

---

### Frontmatter Fields

Several frontmatter fields control how pages appear in navigation:

#### `navigation` (Object or Boolean)

Controls whether a page appears in navigation and customizes its display.

**Hide from Navigation:**
```yaml
---
title: Hidden Page
navigation: false
---
```

**Custom Navigation Title:**
```yaml
---
title: About Me - Full Biography
navigation:
  title: About
---
```

**Custom Navigation Properties:**
```yaml
---
title: Home
navigation:
  title: Home
  icon: '🏡'
---
```

**Notes:**
- Set `navigation: false` to exclude a page from navigation
- Use `navigation.title` to display a different title in menus than the page title
- Custom properties (like `icon`) are available in navigation queries but not used by Alpine's default components

#### `title` (String, Required)

The page title, used as the default navigation label if `navigation.title` is not specified.

```yaml
---
title: Articles
---
```

**Navigation Behavior:**
- If `navigation.title` is set, it's used in navigation
- Otherwise, `title` is used as the navigation label
- `title` is always used for page `<title>` tag and meta tags

#### `navTitle` (String, Optional)

Alternative field for navigation title. Alpine includes this field in navigation queries via the `navigation.fields` configuration.

```yaml
---
title: My Very Long Page Title That's Too Long for Navigation
navTitle: Short Title
---
```

**Notes:**
- `navTitle` is included in navigation queries but not automatically used by Alpine's MainNav component
- You can access it in custom navigation components
- Prefer using `navigation.title` for consistency with Nuxt Content conventions

---

### File Structure Mapping

The `content/` directory structure directly maps to navigation hierarchy.

#### Basic Structure

```
content/
├── 1.index.md              # Homepage (/)
├── 2.articles.md           # Articles page (/articles)
├── 3.about.md              # About page (/about)
└── articles/               # Articles directory
    ├── post-1.md          # Individual article (not in main nav)
    └── post-2.md          # Individual article (not in main nav)
```

**Navigation Output:**
```javascript
[
  { _path: '/', title: 'Home' },
  { _path: '/articles', title: 'Articles' },
  { _path: '/about', title: 'About' }
]
```

**Key Points:**
- Top-level files appear in main navigation
- Nested files (like individual articles) don't appear in main navigation by default
- Numeric prefixes control order but are removed from URLs

#### Numbered Prefixes

Files with numeric prefixes (e.g., `1.index.md`, `2.articles.md`) control navigation order:

```
content/
├── 1.index.md              # First in navigation
├── 2.articles.md           # Second in navigation
├── 3.projects.md           # Third in navigation
└── 4.contact.md            # Fourth in navigation
```

**Navigation Order:**
1. Home (from `1.index.md`)
2. Articles (from `2.articles.md`)
3. Projects (from `3.projects.md`)
4. Contact (from `4.contact.md`)

**Notes:**
- Numbers determine sort order (ascending)
- Numbers are removed from URLs (`1.index.md` → `/`, not `/1.index`)
- Files without numbers appear after numbered files (alphabetically)
- Use gaps (1, 2, 5, 10) to allow easy reordering later

#### Directory Navigation

Directories can be included in navigation using `_dir.yml` files:

```
content/
├── docs/
│   ├── _dir.yml           # Directory metadata
│   ├── getting-started.md
│   └── advanced.md
└── 1.index.md
```

**`_dir.yml` Example:**
```yaml
title: Documentation
navigation:
  title: Docs
  icon: '📚'
```

**Notes:**
- `_dir.yml` controls how the directory appears in navigation
- Set `navigation: false` in `_dir.yml` to hide the entire directory
- Directory navigation is not used by Alpine's default MainNav (only top-level pages)

#### Excluding Content

**Exclude with Frontmatter:**
```yaml
---
title: Draft Article
navigation: false
---
```

**Exclude with Underscore Prefix:**
```
content/
├── _hidden-directory/      # Excluded from navigation
│   └── page.md
├── _draft.md               # Excluded from navigation
└── 1.index.md
```

**Notes:**
- Files/directories starting with `_` are excluded from navigation
- `navigation: false` in frontmatter also excludes pages
- Both methods exclude from navigation but pages are still accessible via direct URL

---

### Navigation Customization

#### Using Navigation in Components

Alpine's `MainNav` component uses the `useContent()` composable to access navigation:

```vue
<script setup lang="ts">
const { navigation } = useContent()
</script>

<template>
  <nav>
    <ul>
      <li v-for="link of navigation" :key="link._path">
        <NuxtLink :to="link._path">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
```

**Available Properties:**
- `link._path`: Route path (e.g., `/`, `/articles`)
- `link.title`: Page title or navigation title
- `link.navigation`: Custom navigation properties from frontmatter

#### Custom Navigation Component

Create a custom navigation component with additional features:

```vue
<script setup lang="ts">
const { navigation } = useContent()
</script>

<template>
  <nav>
    <ul>
      <li v-for="link of navigation" :key="link._path">
        <NuxtLink :to="link._path">
          <span v-if="link.navigation?.icon">{{ link.navigation.icon }}</span>
          {{ link.navigation?.title || link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
```

**Frontmatter for Custom Navigation:**
```yaml
---
title: Home
navigation:
  title: Home
  icon: '🏠'
---
```

#### Filtering Navigation

To create navigation for a specific section, use `fetchContentNavigation()` with a query:

```vue
<script setup lang="ts">
const { data: docsNav } = await useAsyncData('docs-navigation', () => 
  fetchContentNavigation(queryContent('docs'))
)
</script>

<template>
  <nav>
    <ul>
      <li v-for="link of docsNav" :key="link._path">
        <NuxtLink :to="link._path">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
```

**Notes:**
- `fetchContentNavigation()` returns a tree structure (nested directories)
- `useContent().navigation` returns a flat list of top-level pages
- Use `fetchContentNavigation()` for complex, hierarchical navigation

#### Adding Custom Fields

To include custom frontmatter fields in navigation, configure `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  content: {
    navigation: {
      fields: ['author', 'category', 'icon']
    }
  }
})
```

**Frontmatter:**
```yaml
---
title: My Article
author: John Doe
category: Tutorial
icon: '📝'
---
```

**Access in Component:**
```vue
<script setup lang="ts">
const { navigation } = useContent()
</script>

<template>
  <nav>
    <ul>
      <li v-for="link of navigation" :key="link._path">
        <NuxtLink :to="link._path">
          <span v-if="link.icon">{{ link.icon }}</span>
          {{ link.title }}
          <span v-if="link.author">(by {{ link.author }})</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
```

---

### Navigation Best Practices

**File Organization:**
- Use numbered prefixes (1, 2, 3) for top-level navigation pages
- Keep navigation simple - limit to 5-7 main items
- Use descriptive file names that reflect navigation labels
- Group related content in subdirectories

**Frontmatter:**
- Always include `title` field (required for navigation)
- Use `navigation.title` for shorter navigation labels
- Set `navigation: false` for pages that shouldn't appear in menus
- Keep navigation titles concise (1-2 words when possible)

**Navigation Structure:**
- Top-level files appear in main navigation
- Nested files (articles, docs) don't clutter main navigation
- Use `ArticlesList` component to display nested content
- Consider separate navigation for documentation sections

**Performance:**
- Navigation is generated at build time (no runtime cost)
- `useContent()` provides cached navigation data
- Avoid complex navigation queries in components
- Use `fetchContentNavigation()` sparingly (only when needed)

**Accessibility:**
- Navigation titles should be descriptive
- Use semantic HTML (`<nav>`, `<ul>`, `<li>`)
- Ensure keyboard navigation works
- Test with screen readers

**Maintenance:**
- Document navigation structure in README
- Use consistent naming conventions
- Review navigation when adding new pages
- Test navigation on mobile and desktop

---

### Navigation Troubleshooting

**Issue**: Page not appearing in navigation

**Solutions:**
- Check that `navigation: false` is not set in frontmatter
- Verify file is in top-level `content/` directory (not nested)
- Ensure file doesn't start with underscore (`_`)
- Check that `title` field exists in frontmatter
- Restart dev server to regenerate navigation

**Issue**: Navigation order is wrong

**Solutions:**
- Add numeric prefixes to control order (`1.index.md`, `2.articles.md`)
- Ensure numbers are sequential
- Check for files without prefixes (they appear last, alphabetically)
- Clear `.nuxt` directory and restart: `rm -rf .nuxt`

**Issue**: Custom navigation fields not available

**Solutions:**
- Add fields to `content.navigation.fields` in `nuxt.config.ts`
- Restart dev server after config changes
- Check field names match exactly (case-sensitive)
- Verify frontmatter YAML syntax is correct

**Issue**: Navigation title not displaying correctly

**Solutions:**
- Check `navigation.title` in frontmatter
- Verify `title` field exists (fallback)
- Ensure YAML syntax is correct (proper indentation)
- Check for typos in field names

**Issue**: Navigation not updating after content changes

**Solutions:**
- Restart dev server (navigation is cached)
- Clear `.nuxt` directory: `rm -rf .nuxt`
- Check for build errors in console
- Verify content files are in `content/` directory

**Issue**: Nested pages appearing in main navigation

**Solutions:**
- This is expected behavior - only top-level files appear in main nav
- Use `ArticlesList` component to display nested content
- Set `navigation: false` if you don't want them accessible
- Create a custom navigation component for hierarchical display

## Best Practices

This section provides recommended patterns, conventions, and guidelines for developing with the Alpine theme. Following these practices will help you create maintainable, performant, and consistent Alpine-based websites.

### Content Organization

#### Directory Structure Best Practices

**Use Numbered Prefixes for Top-Level Navigation**:
```
content/
├── 1.index.md              # ✅ Homepage - first in navigation
├── 2.articles.md           # ✅ Articles - second in navigation
├── 3.about.md              # ✅ About - third in navigation
└── 4.contact.md            # ✅ Contact - fourth in navigation
```

**Don't use numbered prefixes for nested content**:
```
content/
├── 1.index.md
├── 2.articles.md
└── articles/
    ├── my-post.md          # ✅ No number prefix
    ├── another-post.md     # ✅ No number prefix
    └── 1.featured.md       # ❌ Avoid - numbers not needed here
```

**Group Related Content in Subdirectories**:
```
content/
├── 1.index.md
├── 2.articles.md
├── articles/               # ✅ Blog posts grouped together
│   ├── 2024-01-post.md
│   └── 2024-02-post.md
├── 3.projects.md
└── projects/               # ✅ Projects grouped together
    ├── project-alpha.md
    └── project-beta.md
```

**Use Descriptive, URL-Friendly File Names**:
```
✅ Good:
- getting-started-with-nuxt.md
- vue-composition-api-guide.md
- deploy-to-vercel.md

❌ Avoid:
- Post 1.md (spaces, not descriptive)
- my_article.md (underscores less common)
- article123.md (not descriptive)
```

#### Frontmatter Best Practices

**Always Include Required Fields**:
```yaml
---
title: My Article                    # ✅ Required - used everywhere
description: A brief summary         # ✅ Recommended - for SEO
date: 2024-01-15                    # ✅ Required for articles
layout: article                      # ✅ Explicit is better than implicit
---
```

**Use Consistent Date Format**:
```yaml
---
date: 2024-01-15                    # ✅ ISO format (YYYY-MM-DD)
date: January 15, 2024              # ❌ Avoid - not sortable
date: 01/15/2024                    # ❌ Avoid - ambiguous
---
```

**Optimize Navigation Titles**:
```yaml
---
title: About Me - My Complete Professional Biography and Background
navigation:
  title: About                       # ✅ Short, clear navigation label
---
```

**Hide Pages from Navigation When Appropriate**:
```yaml
---
title: Draft Article
navigation: false                    # ✅ Hide drafts, thank-you pages, etc.
---
```

**Use Cover Images for Articles**:
```yaml
---
title: My Article
date: 2024-01-15
cover: /images/article-cover.jpg    # ✅ Improves social sharing and listings
---
```

#### Content Writing Best Practices

**Use Proper Heading Hierarchy**:
```markdown
# Main Title (h1)                    # ✅ One h1 per page

## Section (h2)                      # ✅ Major sections

### Subsection (h3)                  # ✅ Subsections within sections

#### Detail (h4)                     # ✅ Further detail

## Another Section (h2)              # ✅ Back to h2 for new major section
```

**Don't skip heading levels**:
```markdown
# Main Title

### Subsection                       # ❌ Skipped h2
```

**Include Alt Text for Images**:
```markdown
![User dashboard screenshot](./dashboard.png)  # ✅ Descriptive alt text
![](./image.png)                               # ❌ Missing alt text
```

**Use Code Blocks with Language Specification**:
````markdown
```typescript                        # ✅ Syntax highlighting enabled
export default defineAppConfig({
  alpine: { title: 'My Site' }
})
```

```                                  # ❌ No syntax highlighting
export default defineAppConfig({
  alpine: { title: 'My Site' }
})
```
````

**Keep Content Focused and Scannable**:
- Use short paragraphs (3-5 sentences)
- Use bullet points for lists
- Use bold for emphasis (sparingly)
- Break up long content with headings
- Use code blocks for technical content

---

### Component Usage

#### MDC Syntax Best Practices

**Use YAML Frontmatter for Complex Props**:
```markdown
::hero
---
image: /hero-banner.jpg
imageAlt: Welcome to my site
imagePosition: right
---
#title
Welcome to My Site
#description
Building modern web applications
::
```

**Use Inline Syntax for Simple Props**:
```markdown
::articles-list{path="blog"}
::

::gallery{images="['/img1.jpg', '/img2.jpg']"}
::
```

**Proper Slot Syntax**:
```markdown
::hero
#title                               # ✅ Slot name on its own line
Welcome to My Site
#description                         # ✅ Another slot
This is the description
::
```

**Don't mix content and slots incorrectly**:
```markdown
::hero
Some random content here             # ❌ Content without slot name
#title
Welcome
::
```

#### Component Selection Guidelines

**Use Hero for Landing Sections**:
```markdown
✅ Good use cases:
- Homepage hero section
- Major section introductions
- About page header
- Landing page above the fold

❌ Avoid:
- Multiple heroes on one page
- Heroes in the middle of article content
- Heroes for every section (overuse)
```

**Use Gallery for Image Collections**:
```markdown
✅ Good use cases:
- Portfolio showcases
- Project screenshots
- Photo galleries
- Visual case studies

❌ Avoid:
- Single images (use markdown ![])
- Images that need captions (use markdown)
- Images within article flow (use markdown)
```

**Use ArticlesList for Content Collections**:
```markdown
✅ Good use cases:
- Blog listing pages
- Article index pages
- Content category pages

❌ Avoid:
- Homepage (unless it's a blog-focused site)
- Inside article content
- For non-article content (use custom queries)
```

**Use ContactForm Appropriately**:
```markdown
✅ Good use cases:
- Dedicated contact page
- Footer contact section
- Inquiry forms

❌ Avoid:
- Multiple forms on one page
- Forms without FORMSPREE_URL configured
- Forms in article content
```

#### Component Dos and Don'ts

**DO: Keep Component Usage Semantic**
```markdown
✅ Use components for their intended purpose
✅ Use Hero for hero sections, not for every heading
✅ Use Gallery for image grids, not for single images
✅ Use ArticlesList for article collections, not for custom content
```

**DON'T: Overuse Components**
```markdown
❌ Don't wrap every paragraph in a component
❌ Don't use Hero multiple times on one page
❌ Don't use components when markdown is sufficient
❌ Don't nest components unnecessarily
```

**DO: Provide All Required Props**
```markdown
✅ Check component documentation for required props
✅ Provide meaningful alt text for images
✅ Use appropriate prop types (strings, arrays, objects)
```

**DON'T: Ignore Component Constraints**
```markdown
❌ Don't pass invalid prop types
❌ Don't omit required props
❌ Don't use undefined slots
```

---

### Extending vs Overriding Components

#### When to Extend

**Extend when you want to**:
- Add new functionality while keeping original behavior
- Wrap the original component with additional features
- Reuse the original component's logic
- Maintain compatibility with theme updates

**Example - Extending Hero**:
```vue
<script setup lang="ts">
import AlpineHero from '#alpine/components/content/Hero.vue'

// Add custom props
const props = defineProps({
  ...AlpineHero.props,
  badge: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="enhanced-hero">
    <span v-if="badge" class="badge">{{ badge }}</span>
    <AlpineHero v-bind="$props">
      <template #title><slot name="title" /></template>
      <template #description><slot name="description" /></template>
    </AlpineHero>
  </div>
</template>
```

#### When to Override

**Override when you want to**:
- Completely replace component behavior
- Implement a different design
- Remove functionality you don't need
- Create a fundamentally different component

**Example - Overriding Hero**:
```vue
<script setup lang="ts">
// Completely new implementation
const props = defineProps({
  title: String,
  subtitle: String,
  backgroundVideo: String
})
</script>

<template>
  <section class="custom-hero">
    <video v-if="backgroundVideo" :src="backgroundVideo" autoplay loop muted />
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </section>
</template>

<style scoped>
.custom-hero {
  /* Completely custom styling */
}
</style>
```

#### Override Location

**To override a component**, create a file with the same path in your project:

```
your-project/
└── components/
    └── content/
        └── Hero.vue              # Overrides Alpine's Hero
```

**To extend a component**, create a new component with a different name:

```
your-project/
└── components/
    └── content/
        ├── EnhancedHero.vue      # New component that extends Hero
        └── CustomHero.vue        # Another custom variant
```

#### Best Practices for Customization

**DO: Start with Extending**
```
✅ Try extending first before overriding
✅ Reuse Alpine's components when possible
✅ Keep customizations minimal and focused
✅ Document why you're extending/overriding
```

**DON'T: Override Without Reason**
```
❌ Don't override just to change styling (use tokens instead)
❌ Don't override if extending would work
❌ Don't override core layout components without careful consideration
❌ Don't forget to maintain accessibility when overriding
```

**DO: Maintain Consistency**
```
✅ Keep the same prop names when extending
✅ Maintain the same slot structure when possible
✅ Follow Alpine's naming conventions
✅ Use Alpine's design tokens in custom components
```

**DON'T: Break Conventions**
```
❌ Don't change prop types arbitrarily
❌ Don't remove required props
❌ Don't ignore Alpine's styling system
❌ Don't break MDC syntax compatibility
```

---

### Performance Considerations

#### Content Optimization

**Optimize Images**:
```yaml
---
cover: /images/article-cover.jpg     # ✅ Optimized, web-ready image
cover: /images/raw-photo-5mb.jpg     # ❌ Large, unoptimized image
---
```

**Best practices for images**:
- Use WebP format when possible (with fallbacks)
- Compress images before adding to `public/`
- Use appropriate dimensions (don't serve 4K images for thumbnails)
- Consider using an image CDN for large sites
- Use lazy loading for images below the fold

**Limit Gallery Images**:
```markdown
::gallery
---
images:
  - /img1.jpg
  - /img2.jpg
  - /img3.jpg
  - /img4.jpg                        # ✅ Reasonable number (4-8 images)
---
::

::gallery
---
images:
  - /img1.jpg
  - /img2.jpg
  # ... 50 more images                # ❌ Too many images at once
---
::
```

**Optimize Content Queries**:
```vue
<!-- ✅ Query only what you need -->
<ArticlesList path="articles" />

<!-- ❌ Don't query entire content tree unnecessarily -->
<script setup>
const { data } = await useAsyncData('all-content', () => 
  queryContent('/').find()           // Queries everything
)
</script>
```

#### Build Performance

**Preload Only Necessary Languages**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    highlight: {
      preload: ['typescript', 'vue', 'bash']  // ✅ Only languages you use
      // Don't preload 20+ languages if you only use 3
    }
  }
})
```

**Optimize Syntax Highlighting**:
```markdown
```typescript                        # ✅ Specify language for highlighting
export default defineAppConfig({})
```

```                                  # ❌ No language = no optimization
export default defineAppConfig({})
```
````

**Use Static Generation**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']       # ✅ Prerender static routes
    }
  }
})
```

#### Runtime Performance

**Minimize Component Nesting**:
```markdown
✅ Good:
::hero
#title
Welcome
::

❌ Avoid unnecessary nesting:
::container
  ::wrapper
    ::hero
    #title
    Welcome
    ::
  ::
::
```

**Use Lazy Loading for Heavy Components**:
```vue
<script setup>
// ✅ Lazy load heavy components
const LazyGallery = defineAsyncComponent(() => 
  import('~/components/content/Gallery.vue')
)
</script>
```

**Avoid Excessive Navigation Items**:
```
content/
├── 1.index.md
├── 2.articles.md
├── 3.about.md
├── 4.projects.md
├── 5.contact.md                     # ✅ 5-7 items is good
├── 6.services.md
├── 7.testimonials.md
├── 8.faq.md                         # ⚠️ Getting crowded
├── 9.team.md                        # ❌ Too many top-level items
└── 10.careers.md                    # ❌ Consider grouping
```

#### Token Performance

**Use Tokens Instead of Hardcoded Values**:
```vue
<style scoped>
.my-component {
  color: {color.primary.500};        # ✅ Uses token (optimized)
  padding: {space.4};                # ✅ Uses token
}

.my-other-component {
  color: #1ad6ff;                    # ❌ Hardcoded (not optimized)
  padding: 1rem;                     # ❌ Hardcoded
}
</style>
```

**Benefits of using tokens**:
- Tokens are resolved at build time (no runtime cost)
- Tokens generate CSS custom properties for dynamic values
- Tokens enable theme-wide consistency
- Tokens are optimized and tree-shaken

#### Monitoring Performance

**Check Build Output**:
```bash
npm run build                        # Check bundle sizes
npm run analyze                      # Analyze bundle composition
```

**Monitor Lighthouse Scores**:
- Aim for 90+ performance score
- Check Core Web Vitals (LCP, FID, CLS)
- Test on mobile and desktop
- Test with slow network conditions

**Profile in Development**:
- Use Vue DevTools to profile components
- Check for unnecessary re-renders
- Monitor network requests
- Check for memory leaks

---

### Configuration Best Practices

**Keep Configuration Organized**:
```typescript
// app.config.ts
export default defineAppConfig({
  alpine: {
    // Site metadata
    title: 'My Site',
    description: 'My awesome site',
    
    // Header configuration
    header: {
      position: 'left',
      logo: { /* ... */ }
    },
    
    // Footer configuration
    footer: { /* ... */ },
    
    // Social links
    socials: { /* ... */ }
  }
})
```

**Use Environment Variables for Sensitive Data**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL  # ✅ From .env file
    }
  }
})

// ❌ Don't hardcode sensitive data
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      FORMSPREE_URL: 'https://formspree.io/f/abc123'  # ❌ Exposed in code
    }
  }
})
```

**Document Custom Configuration**:
```typescript
// app.config.ts
export default defineAppConfig({
  alpine: {
    // Custom: Enable newsletter signup in footer
    newsletter: {
      enabled: true,
      endpoint: '/api/subscribe'
    }
  }
})
```

**Version Control Configuration**:
```bash
# ✅ Commit these files
git add app.config.ts
git add nuxt.config.ts
git add tokens.config.ts

# ❌ Never commit this file
# .env should be in .gitignore
git add .env                         # ❌ Don't do this
```

---

### Maintenance Best Practices

**Keep Dependencies Updated**:
```bash
# Check for updates
npm outdated

# Update Alpine theme
npm update @nuxt-themes/alpine

# Update Nuxt and related packages
npm update nuxt @nuxt/content
```

**Test After Updates**:
- Run `npm run dev` and check for errors
- Test all pages and components
- Check for styling regressions
- Verify build succeeds: `npm run build`

**Document Customizations**:
```markdown
# README.md

## Customizations

- Overridden Hero component to add video background
- Custom tokens for brand colors in tokens.config.ts
- Extended ArticlesList to add filtering by category
```

**Use Version Control Effectively**:
```bash
# Commit related changes together
git add components/content/Hero.vue
git add app.config.ts
git commit -m "feat: add video background to Hero component"

# Use descriptive commit messages
git commit -m "fix: correct navigation order on mobile"
git commit -m "docs: update README with deployment instructions"
```

**Backup Before Major Changes**:
```bash
# Create a branch before major refactoring
git checkout -b refactor-components

# Make changes, test thoroughly
# Merge back when stable
git checkout main
git merge refactor-components
```

---

### Accessibility Best Practices

**Provide Alt Text**:
```yaml
---
cover: /images/article.jpg
# ✅ Describe the image content
---

::hero
---
image: /hero.jpg
imageAlt: Team collaborating in modern office space  # ✅ Descriptive
---
::
```

**Use Semantic HTML**:
```vue
<template>
  <article>                          # ✅ Semantic element
    <h1>{{ title }}</h1>
    <time :datetime="date">{{ formattedDate }}</time>
    <p>{{ content }}</p>
  </article>
</template>
```

**Maintain Heading Hierarchy**:
```markdown
# Page Title (h1)                    # ✅ One h1 per page
## Section (h2)                      # ✅ Logical hierarchy
### Subsection (h3)
## Another Section (h2)
```

**Ensure Keyboard Navigation**:
- Test navigation with Tab key
- Ensure all interactive elements are focusable
- Provide visible focus indicators
- Don't disable outline without replacement

**Test with Screen Readers**:
- Test with NVDA (Windows) or VoiceOver (Mac)
- Ensure content is announced correctly
- Check that navigation is logical
- Verify form labels are associated correctly

---

### Deployment Best Practices

**Test Locally Before Deploying**:
```bash
# Build and preview locally
npm run build
npm run preview

# Check for build errors
# Test all routes
# Verify assets load correctly
```

**Use Environment-Specific Configuration**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  }
})
```

**Optimize for Production**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml']
    },
    compressPublicAssets: true
  }
})
```

**Monitor After Deployment**:
- Check that all pages load correctly
- Verify images and assets are accessible
- Test forms and interactive features
- Check console for errors
- Monitor performance metrics

---

### Summary of Key Best Practices

**Content**:
- Use numbered prefixes for top-level navigation only
- Always include title, description, and date for articles
- Use descriptive, URL-friendly file names
- Keep content organized in subdirectories

**Components**:
- Use components for their intended purpose
- Don't overuse components when markdown suffices
- Provide all required props and meaningful alt text
- Follow MDC syntax conventions

**Customization**:
- Try extending before overriding
- Use design tokens instead of hardcoded values
- Maintain consistency with Alpine conventions
- Document all customizations

**Performance**:
- Optimize images before adding to project
- Limit gallery images to reasonable numbers
- Use lazy loading for heavy components
- Monitor build output and Lighthouse scores

**Maintenance**:
- Keep dependencies updated
- Test after updates
- Use version control effectively
- Document customizations in README

Following these best practices will help you build maintainable, performant, and accessible websites with the Alpine theme.

## Troubleshooting

This section provides solutions to common issues you may encounter when working with the Alpine theme. Issues are organized by category for easy reference.

### Routing Issues

#### Issue: Page Not Found (404) After Deployment

**Symptoms:**
- Pages work locally but return 404 errors in production
- Static assets load but content pages don't
- Homepage works but nested routes fail

**Root Cause:**
This typically occurs when the hosting platform doesn't properly handle client-side routing or when prerendering is not configured correctly.

**Solutions:**

**For Static Hosting (Netlify, Vercel, GitHub Pages):**

1. **Enable prerendering for all routes:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
```

2. **Add redirect rules for SPA fallback:**

For Netlify, create `public/_redirects`:
```
/*    /index.html   200
```

For Vercel, create `vercel.json`:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**For AWS Amplify:**

1. **Configure rewrites in amplify.yml:**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run generate
  artifacts:
    baseDirectory: .output/public
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
customHeaders:
  - pattern: '**/*'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
```

2. **Add rewrite rules in Amplify Console:**
- Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
- Target: `/index.html`
- Type: `200 (Rewrite)`

**Related Resources:**
- [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
- [GitHub Issue: 404 on Amplify](https://github.com/nuxt-themes/alpine/issues/123)

---

#### Issue: Content Files Not Generating Routes

**Symptoms:**
- Content files exist in `content/` directory
- Files don't appear in navigation
- Direct URL access returns 404

**Root Cause:**
- Document-driven mode not enabled
- Content files have incorrect frontmatter
- File naming issues

**Solutions:**

1. **Verify document-driven mode is enabled:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  content: {
    documentDriven: true  // Must be true
  }
})
```

2. **Check frontmatter syntax:**

```yaml
---
title: My Page          # ✅ Required
description: Summary    # ✅ Recommended
layout: default         # ✅ Specify layout
---
```

3. **Verify file naming:**
- Files must have `.md` extension
- Avoid special characters in filenames
- Use hyphens instead of spaces: `my-page.md` not `my page.md`

4. **Check for underscore prefix:**
- Files starting with `_` are excluded from routing
- Rename `_draft.md` to `draft.md` or remove underscore

5. **Restart dev server:**
```bash
rm -rf .nuxt
npm run dev
```

**Related Resources:**
- [Nuxt Content Documentation](https://content.nuxtjs.org/guide/writing/content-directory)

---

#### Issue: Navigation Order Incorrect

**Symptoms:**
- Pages appear in wrong order in navigation
- New pages appear at unexpected positions

**Root Cause:**
- Missing or incorrect numeric prefixes
- Alphabetical sorting when no prefixes used

**Solutions:**

1. **Add numeric prefixes to control order:**

```
content/
├── 1.index.md          # First
├── 2.articles.md       # Second
├── 3.about.md          # Third
└── 4.contact.md        # Fourth
```

2. **Use gaps for easier reordering:**

```
content/
├── 10.index.md         # Allows inserting 5.new-page.md later
├── 20.articles.md
├── 30.about.md
└── 40.contact.md
```

3. **Clear cache and restart:**
```bash
rm -rf .nuxt
npm run dev
```

**Related Resources:**
- See [Navigation System](#navigation-system) section above

---

#### Issue: Dynamic Routes Not Working

**Symptoms:**
- Article detail pages return 404
- Routes like `/articles/my-post` don't work

**Root Cause:**
- Incorrect directory structure
- Missing index files

**Solutions:**

1. **Verify directory structure:**

```
content/
├── 2.articles.md           # Listing page at /articles
└── articles/               # Individual articles
    ├── post-1.md          # Available at /articles/post-1
    └── post-2.md          # Available at /articles/post-2
```

2. **Ensure listing page exists:**
- Create `content/2.articles.md` for the `/articles` route
- Use `ArticlesList` component to display articles

3. **Check article frontmatter:**

```yaml
---
title: My Article
date: 2024-01-15
layout: article         # Use article layout for posts
---
```

---

### Styling Issues

#### Issue: Custom Styles Not Applied

**Symptoms:**
- CSS changes in components don't appear
- Token customizations not working
- Styles work locally but not in production

**Root Cause:**
- Scoped styles not properly configured
- Token syntax errors
- Build cache issues

**Solutions:**

1. **Verify scoped styles syntax:**

```vue
<style scoped>
.my-component {
  color: {color.primary.500};    /* ✅ Correct token syntax */
  padding: {space.4};
}
</style>
```

2. **Check token customization location:**

```typescript
// tokens.config.ts (in project root)
import { defineTheme } from 'pinceau'

export default defineTheme({
  color: {
    primary: {
      500: '#ff0000'  // Custom primary color
    }
  }
})
```

3. **Clear build cache:**
```bash
rm -rf .nuxt
rm -rf .output
npm run dev
```

4. **Verify Pinceau is installed:**
```bash
npm list @nuxt-themes/tokens
```

**Related Resources:**
- See [Styling System](#styling-system) section above
- [Pinceau Documentation](https://pinceau.dev)

---

#### Issue: Dark Mode Not Working

**Symptoms:**
- Color mode toggle doesn't switch themes
- Dark mode styles not applied
- Theme preference not persisted

**Root Cause:**
- Color mode module not configured
- Token variants not defined
- Browser localStorage issues

**Solutions:**

1. **Verify color mode configuration:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  }
})
```

2. **Check token dark variants:**

```typescript
// tokens.config.ts
export default defineTheme({
  myComponent: {
    backgroundColor: {
      initial: '{color.white}',    // Light mode
      dark: '{color.gray.900}'     // Dark mode
    }
  }
})
```

3. **Clear browser storage:**
- Open DevTools → Application → Local Storage
- Delete `nuxt-color-mode` key
- Refresh page

4. **Test color mode toggle:**
```vue
<template>
  <ColorModeSwitch />
</template>
```

**Related Resources:**
- [Nuxt Color Mode Documentation](https://color-mode.nuxtjs.org)

---

#### Issue: Styles Conflict with Custom Components

**Symptoms:**
- Custom component styles override theme styles
- Inconsistent styling across pages
- Specificity issues

**Root Cause:**
- CSS specificity conflicts
- Not using design tokens
- Global styles interfering

**Solutions:**

1. **Use scoped styles:**

```vue
<style scoped>
/* Styles only apply to this component */
.my-component {
  color: {color.primary.500};
}
</style>
```

2. **Use design tokens for consistency:**

```vue
<style scoped>
.my-component {
  /* ✅ Use tokens */
  padding: {space.4};
  color: {color.primary.500};
  
  /* ❌ Avoid hardcoded values */
  /* padding: 1rem; */
  /* color: #1ad6ff; */
}
</style>
```

3. **Increase specificity when needed:**

```vue
<style scoped>
.my-component.my-component {  /* Double class for higher specificity */
  color: {color.primary.500};
}
</style>
```

4. **Use deep selectors for child components:**

```vue
<style scoped>
.my-component :deep(.child-class) {
  color: {color.primary.500};
}
</style>
```

---

#### Issue: Responsive Styles Not Working

**Symptoms:**
- Mobile layout broken
- Breakpoints not triggering
- Styles same on all screen sizes

**Root Cause:**
- Incorrect media query syntax
- Missing viewport meta tag
- Token media queries not used

**Solutions:**

1. **Use token media queries:**

```vue
<style scoped>
.my-component {
  padding: {space.4};
  
  @media {media.md} {
    padding: {space.8};
  }
  
  @media {media.lg} {
    padding: {space.12};
  }
}
</style>
```

2. **Verify viewport meta tag (should be automatic):**

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

3. **Test at different breakpoints:**
- xs: 475px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

**Related Resources:**
- See [Media Query Tokens](#media-query-tokens) section above

---

### Component Issues

#### Issue: Hero Component Image Not Displaying

**Symptoms:**
- Hero component renders but image is missing
- Broken image icon appears
- Image path seems correct

**Root Cause:**
- Incorrect image path
- Image not in `public/` directory
- Image file doesn't exist

**Solutions:**

1. **Verify image location:**
```
public/
└── images/
    └── hero-banner.jpg    # ✅ Correct location
```

2. **Use correct path in frontmatter:**

```markdown
::hero
---
image: /images/hero-banner.jpg    # ✅ Path relative to public/
imageAlt: Welcome banner
---
#title
Welcome
::
```

3. **Check file extension matches:**
- If file is `hero-banner.png`, use `.png` in path
- Extensions are case-sensitive on some systems

4. **Verify image exists:**
```bash
ls -la public/images/hero-banner.jpg
```

5. **Check browser console for 404 errors:**
- Open DevTools → Console
- Look for failed image requests

**Related Resources:**
- See [Hero Component](#hero) section above

---

#### Issue: ArticlesList Shows No Articles

**Symptoms:**
- ArticlesList component renders but shows no articles
- "No articles found" message appears
- Articles exist in content directory

**Root Cause:**
- Incorrect path specified
- Articles missing required frontmatter
- Articles in wrong directory

**Solutions:**

1. **Verify directory structure:**

```
content/
├── 2.articles.md           # Listing page
└── articles/               # Articles directory
    ├── post-1.md          # ✅ Article files here
    └── post-2.md
```

2. **Check ArticlesList path:**

```markdown
::articles-list{path="articles"}
::
```

Or in Vue:
```vue
<ArticlesList path="articles" />
```

3. **Verify article frontmatter:**

```yaml
---
title: My Article          # ✅ Required
date: 2024-01-15          # ✅ Required for sorting
description: Summary       # ✅ Recommended
---
```

4. **Check for navigation: false:**

```yaml
---
title: My Article
navigation: false          # ⚠️ This hides from navigation but article should still appear in ArticlesList
---
```

5. **Restart dev server:**
```bash
rm -rf .nuxt
npm run dev
```

**Related Resources:**
- See [ArticlesList Component](#articleslist) section above

---

#### Issue: ContactForm Not Submitting

**Symptoms:**
- Form renders but submit doesn't work
- No success/error message appears
- Console shows errors

**Root Cause:**
- FORMSPREE_URL not configured
- Environment variable not loaded
- Formspree endpoint incorrect

**Solutions:**

1. **Create Formspree account and form:**
- Go to [formspree.io](https://formspree.io)
- Create a new form
- Copy the form endpoint URL

2. **Add to environment file:**

```bash
# .env
FORMSPREE_URL=https://formspree.io/f/your-form-id
```

3. **Configure runtime config:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL
    }
  }
})
```

4. **Restart dev server:**
```bash
npm run dev
```

5. **Verify environment variable is loaded:**
```bash
echo $FORMSPREE_URL
```

6. **Check browser console for errors:**
- Open DevTools → Console
- Look for network errors or CORS issues

**Related Resources:**
- See [ContactForm Component](#contactform) section above
- See [Formspree Configuration](#formspree-configuration) section above

---

#### Issue: Gallery Images Not Loading

**Symptoms:**
- Gallery component renders but images don't load
- Broken image icons appear
- Some images load, others don't

**Root Cause:**
- Incorrect image paths
- Images not in public directory
- Array syntax error in frontmatter

**Solutions:**

1. **Verify image paths:**

```markdown
::gallery
---
images:
  - /images/photo1.jpg    # ✅ Correct - relative to public/
  - /images/photo2.jpg
  - /images/photo3.jpg
---
::
```

2. **Check YAML array syntax:**

```yaml
# ✅ Correct
images:
  - /images/photo1.jpg
  - /images/photo2.jpg

# ❌ Incorrect
images: [/images/photo1.jpg, /images/photo2.jpg]  # May not parse correctly
```

3. **Verify all images exist:**
```bash
ls -la public/images/
```

4. **Check file extensions:**
- Ensure extensions match actual files
- Extensions are case-sensitive on some systems

**Related Resources:**
- See [Gallery Component](#gallery) section above

---

#### Issue: Custom Component Not Found

**Symptoms:**
- Error: "Component not found"
- Custom component doesn't render
- Works in Vue files but not in markdown

**Root Cause:**
- Component not in correct directory
- Component not globally registered
- Incorrect component name in MDC

**Solutions:**

1. **Verify component location:**

```
components/
└── content/
    └── MyCustomComponent.vue    # ✅ Auto-registered globally
```

2. **Check component name in MDC:**

```markdown
::my-custom-component
::
```

Component name is kebab-case version of filename:
- `MyCustomComponent.vue` → `::my-custom-component`
- `CustomHero.vue` → `::custom-hero`

3. **Ensure component is in components directory:**

```
components/
├── content/              # ✅ For content components
│   └── MyComponent.vue
├── MyComponent.vue       # ✅ Also works
└── nested/
    └── MyComponent.vue   # ✅ Also works
```

4. **Restart dev server:**
```bash
rm -rf .nuxt
npm run dev
```

**Related Resources:**
- [Nuxt Components Documentation](https://nuxt.com/docs/guide/directory-structure/components)

---

### Deployment Issues

#### Issue: Build Fails in Production

**Symptoms:**
- `npm run build` fails
- Build succeeds locally but fails in CI/CD
- Type errors or module not found errors

**Root Cause:**
- Missing dependencies
- Environment-specific issues
- TypeScript errors
- Node version mismatch

**Solutions:**

1. **Verify all dependencies are installed:**

```bash
npm ci  # Clean install from package-lock.json
```

2. **Check Node version:**

```bash
node --version  # Should be 18.x or higher
```

Set Node version in CI/CD:
```yaml
# .github/workflows/deploy.yml
- uses: actions/setup-node@v3
  with:
    node-version: '18'
```

3. **Fix TypeScript errors:**

```bash
npm run typecheck  # Check for type errors
```

4. **Check for missing environment variables:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL || ''  // Provide fallback
    }
  }
})
```

5. **Clear all caches:**

```bash
rm -rf node_modules
rm -rf .nuxt
rm -rf .output
rm package-lock.json
npm install
npm run build
```

6. **Check build logs for specific errors:**
- Look for module resolution errors
- Check for missing peer dependencies
- Verify all imports are correct

**Related Resources:**
- [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)

---

#### Issue: Static Assets Not Loading After Deployment

**Symptoms:**
- Images return 404 in production
- CSS/JS files not found
- Assets work locally but not in production

**Root Cause:**
- Incorrect base URL configuration
- Assets not copied to output directory
- CDN/hosting configuration issues

**Solutions:**

1. **Verify build output includes assets:**

```bash
npm run build
ls -la .output/public/
```

Should see:
```
.output/public/
├── _nuxt/           # Built assets
├── images/          # Your images
└── index.html
```

2. **Check hosting configuration:**

For Netlify:
```toml
# netlify.toml
[build]
  publish = ".output/public"
```

For Vercel:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public"
}
```

For AWS Amplify:
```yaml
# amplify.yml
frontend:
  artifacts:
    baseDirectory: .output/public
```

3. **Verify asset paths are correct:**

```markdown
![Image](/images/photo.jpg)    # ✅ Absolute path from public/
![Image](./images/photo.jpg)   # ❌ Relative path may not work
```

4. **Check CDN configuration:**
- Ensure CDN is serving from correct directory
- Verify cache headers are set correctly
- Clear CDN cache if needed

**Related Resources:**
- See [Deployment Best Practices](#deployment-best-practices) section above

---

#### Issue: Environment Variables Not Working in Production

**Symptoms:**
- Features work locally but not in production
- Contact form doesn't work in production
- Console shows "undefined" for environment variables

**Root Cause:**
- Environment variables not set in hosting platform
- Runtime config not properly configured
- Using wrong environment variable syntax

**Solutions:**

1. **Set environment variables in hosting platform:**

**Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add `FORMSPREE_URL` with your value

**Vercel:**
- Go to Project Settings → Environment Variables
- Add `FORMSPREE_URL` with your value

**AWS Amplify:**
- Go to App Settings → Environment Variables
- Add `FORMSPREE_URL` with your value

2. **Verify runtime config:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL
    }
  }
})
```

3. **Access in components:**

```vue
<script setup>
const config = useRuntimeConfig()
const formspreeUrl = config.public.FORMSPREE_URL
</script>
```

4. **Redeploy after setting variables:**
- Trigger a new deployment after adding environment variables
- Variables are only available after rebuild

**Related Resources:**
- See [Runtime Configuration](#runtime-configuration) section above

---

#### Issue: Slow Build Times

**Symptoms:**
- Build takes several minutes
- CI/CD pipeline times out
- Local builds are slow

**Root Cause:**
- Too many syntax highlighting languages preloaded
- Large number of content files
- Unoptimized images
- No build caching

**Solutions:**

1. **Limit preloaded syntax highlighting languages:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    highlight: {
      preload: ['typescript', 'vue', 'bash']  // Only what you use
    }
  }
})
```

2. **Enable build caching in CI/CD:**

```yaml
# .github/workflows/deploy.yml
- uses: actions/cache@v3
  with:
    path: |
      node_modules
      .nuxt
    key: ${{ runner.os }}-nuxt-${{ hashFiles('**/package-lock.json') }}
```

3. **Optimize images before adding:**
- Compress images using tools like ImageOptim or TinyPNG
- Use appropriate dimensions (don't use 4K images for thumbnails)
- Consider using WebP format

4. **Use incremental builds if available:**
- Some hosting platforms support incremental builds
- Check your platform's documentation

5. **Profile build to find bottlenecks:**

```bash
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

**Related Resources:**
- [Nuxt Performance Documentation](https://nuxt.com/docs/guide/concepts/performance)

---

#### Issue: Prerendering Fails

**Symptoms:**
- Build succeeds but prerendering fails
- Some routes not prerendered
- Error: "Cannot prerender route"

**Root Cause:**
- Dynamic routes not discoverable
- Content query errors
- Missing content files

**Solutions:**

1. **Enable link crawling:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
```

2. **Explicitly list routes to prerender:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: [
        '/',
        '/articles',
        '/about',
        '/contact'
      ]
    }
  }
})
```

3. **Check for content query errors:**
- Review build logs for query errors
- Verify all content files have required frontmatter
- Check for malformed YAML

4. **Ignore problematic routes:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      ignore: ['/admin', '/api/*']
    }
  }
})
```

**Related Resources:**
- [Nuxt Prerendering Documentation](https://nuxt.com/docs/getting-started/prerendering)

---

### General Troubleshooting Tips

#### Clear All Caches

When in doubt, clear all caches:

```bash
# Remove build artifacts
rm -rf .nuxt
rm -rf .output

# Remove node modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Clear browser cache
# Open DevTools → Network → Disable cache (while DevTools open)
```

#### Check Console for Errors

Always check browser console and terminal for errors:

1. **Browser Console:**
   - Open DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed requests

2. **Terminal:**
   - Look for build errors
   - Check for deprecation warnings
   - Review stack traces

#### Verify File Paths

Common path issues:

```markdown
# ✅ Correct - absolute path from public/
![Image](/images/photo.jpg)
::hero{image="/images/hero.jpg"}

# ❌ Incorrect - relative paths may not work
![Image](./images/photo.jpg)
![Image](../images/photo.jpg)
```

#### Test in Isolation

To isolate issues:

1. **Create minimal reproduction:**
   - Start with a fresh Alpine project
   - Add only the problematic feature
   - Test if issue persists

2. **Test in different environments:**
   - Test locally
   - Test in production build locally (`npm run build && npm run preview`)
   - Test in staging environment
   - Test in production

#### Check Alpine Version

Ensure you're using a compatible version:

```bash
npm list @nuxt-themes/alpine
```

Update to latest:

```bash
npm update @nuxt-themes/alpine
```

#### Review Recent Changes

If something broke recently:

1. **Check git history:**
```bash
git log --oneline -10
git diff HEAD~1
```

2. **Revert recent changes:**
```bash
git revert HEAD
```

3. **Bisect to find breaking commit:**
```bash
git bisect start
git bisect bad HEAD
git bisect good <last-known-good-commit>
```

---

### Getting Help

If you're still stuck after trying these solutions:

1. **Check Official Documentation:**
   - [Alpine Theme Docs](https://alpine.nuxt.space)
   - [Nuxt Documentation](https://nuxt.com/docs)
   - [Nuxt Content Docs](https://content.nuxtjs.org)

2. **Search GitHub Issues:**
   - [Alpine Theme Issues](https://github.com/nuxt-themes/alpine/issues)
   - [Nuxt Issues](https://github.com/nuxt/nuxt/issues)
   - [Nuxt Content Issues](https://github.com/nuxt/content/issues)

3. **Ask the Community:**
   - [Nuxt Discord](https://discord.com/invite/nuxt)
   - [GitHub Discussions](https://github.com/nuxt-themes/alpine/discussions)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/nuxt.js)

4. **Create a Minimal Reproduction:**
   - Use [StackBlitz](https://stackblitz.com/github/nuxt-themes/alpine-starter)
   - Isolate the issue
   - Share the reproduction when asking for help

---

**Note**: This is a living document that will be updated as the Alpine theme evolves. For the most current information, always refer to the [official Alpine documentation](https://alpine.nuxt.space).
