<script setup lang="ts">
// Define component props with TypeScript interface
interface Props {
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  path: 'meditations'
})

// Compute the query path by prepending '/' to the path prop
const queryPath = computed(() => `/${props.path}`)

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
  <ContentQuery 
    :path="queryPath" 
    :where="{ _path: { $ne: '/meditations' } }"
    :sort="{ date: -1 }"
    v-slot="{ data }"
  >
    <div v-if="!data || data.length === 0">
      <p>No meditations found</p>
    </div>
    <div v-else>
      <article 
        v-for="(meditation, index) in data" 
        :key="meditation._path || index"
      >
        <h1 class="headline">{{ meditation.title || 'Untitled' }}</h1>
        
        <ContentRenderer :value="meditation" />
        
        <time v-if="meditation.date">
          {{ formatDate(meditation.date) }}
        </time>
      </article>
    </div>
  </ContentQuery>
</template>

<style scoped lang="ts">
css({
  article: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '{space.8}',
    
    '.headline': {
      fontSize: '{fontSize.2xl}',
      marginBottom: '{space.2}',
      fontWeight: '{fontWeight.semibold}',
      lineHeight: '{lead.tight}',
    },
    
    time: {
      fontSize: '{fontSize.sm}',
      color: '{color.gray.500}',
      marginTop: '{space.4}',
      '@dark': {
        color: '{color.gray.500}',
      }
    }
  }
})
</style>
