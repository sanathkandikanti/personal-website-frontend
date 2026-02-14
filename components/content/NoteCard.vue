<script setup lang="ts">
// Define note type based on Nuxt Content structure
interface Note {
  _path: string
  _id?: string
  title: string
  date?: string
  description?: string
  [key: string]: any
}

// Define component props
interface Props {
  note: Note
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false
})

// Date formatting utility
const formatDate = (dateString: string | null | undefined): string => {
  // Handle empty/null dates gracefully
  if (!dateString) return ''
  
  // Parse and validate date
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  
  // Format date as "Month Day, Year"
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <NuxtLink 
    :to="note._path"
    class="note-card"
    :class="{ 'note-card--featured': featured }"
  >
    <article class="note-card__content">
      <h2 class="note-card__title">
        {{ note.title || 'Untitled' }}
      </h2>

      <time v-if="note.date" class="note-card__date">
        {{ formatDate(note.date) }}
      </time>

      <p v-if="note.description" class="note-card__description">
        {{ note.description }}
      </p>
    </article>
  </NuxtLink>
</template>

<style scoped>
/* Card container with border, padding, and rounded corners */
.note-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-gray-200, #e5e7eb);
  border-radius: 0.75rem;
  padding: 1.5rem;
  background-color: var(--color-white, #ffffff);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

/* Dark mode card styling */
@media (prefers-color-scheme: dark) {
  .note-card {
    border-color: var(--color-gray-700, #374151);
    background-color: var(--color-gray-800, #1f2937);
  }
}

/* Hover effects for interactive feedback */
.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: var(--color-primary-300, #93c5fd);
}

@media (prefers-color-scheme: dark) {
  .note-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    border-color: var(--color-primary-600, #2563eb);
  }
}

/* Featured cards are larger with more padding */
.note-card--featured {
  padding: 2rem;
}

@media (min-width: 768px) {
  .note-card--featured {
    padding: 2.5rem;
  }
}

.note-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

/* Responsive font sizes for title */
.note-card__title {
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 600;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-gray-900, #111827);
}

@media (min-width: 640px) {
  .note-card__title {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}

@media (prefers-color-scheme: dark) {
  .note-card__title {
    color: var(--color-gray-100, #f3f4f6);
  }
}

.note-card:hover .note-card__title {
  color: var(--color-primary-500, #3b82f6);
}

@media (prefers-color-scheme: dark) {
  .note-card:hover .note-card__title {
    color: var(--color-primary-400, #60a5fa);
  }
}

/* Featured card title is larger */
.note-card--featured .note-card__title {
  font-size: 1.75rem;
  line-height: 2.25rem;
  -webkit-line-clamp: 3;
}

@media (min-width: 640px) {
  .note-card--featured .note-card__title {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

@media (min-width: 768px) {
  .note-card--featured .note-card__title {
    font-size: 2.25rem;
    line-height: 2.75rem;
  }
}

/* Date styling with responsive font size */
.note-card__date {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--color-gray-500, #6b7280);
  display: block;
}

@media (min-width: 640px) {
  .note-card__date {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

@media (prefers-color-scheme: dark) {
  .note-card__date {
    color: var(--color-gray-400, #9ca3af);
  }
}

/* Description with responsive font size */
.note-card__description {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-gray-700, #374151);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 640px) {
  .note-card__description {
    font-size: 1rem;
    line-height: 1.5;
  }
}

@media (prefers-color-scheme: dark) {
  .note-card__description {
    color: var(--color-gray-300, #d1d5db);
  }
}

/* Featured card description is larger */
.note-card--featured .note-card__description {
  -webkit-line-clamp: 4;
  font-size: 1rem;
  line-height: 1.625rem;
}

@media (min-width: 640px) {
  .note-card--featured .note-card__description {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
}
</style>
