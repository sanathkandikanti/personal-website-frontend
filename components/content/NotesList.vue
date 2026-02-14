<script setup lang="ts">
// Define component props with TypeScript interface
interface Props {
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  path: 'notes'
})

// Compute the query path by prepending '/' to the path prop
const queryPath = computed(() => `/${props.path}`)
</script>

<template>
  <ContentQuery 
    :path="queryPath" 
    :sort="{ date: -1 }"
    v-slot="{ data }"
  >
    <div v-if="!data || data.length === 0" class="empty-state">
      <p>No notes found</p>
    </div>
    <div v-else class="notes-list">
      <div class="featured">
        <NoteCard :note="data[0]" :featured="true" />
      </div>
      <div class="notes-grid">
        <NoteCard 
          v-for="(note, index) in data.slice(1)" 
          :key="note._path || index" 
          :note="note" 
          :featured="false"
        />
      </div>
    </div>
  </ContentQuery>
</template>

<style scoped>
/* Main container styling */
.notes-list {
  padding: 0;
}

@media (min-width: 640px) {
  .notes-list {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media (min-width: 768px) {
  .notes-list {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Featured note section */
.featured {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .featured {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

/* Responsive grid layout for notes */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 3rem;
}

/* Tablet breakpoint (md) - 2 columns */
@media (min-width: 768px) {
  .notes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
}

/* Desktop breakpoint (lg) - 3 columns */
@media (min-width: 1024px) {
  .notes-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Empty state styling */
.empty-state {
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-600, #6b7280);
}

.empty-state p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .empty-state {
    color: var(--color-gray-400, #9ca3af);
  }
}
</style>
