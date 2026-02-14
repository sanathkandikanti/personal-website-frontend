export default defineAppConfig({
  alpine: {
    // Site metadata
    title: 'Sanath Kandikanti',
    description: 'Sanath Kandikanti\'s personal website',
    
    // Header configuration
    header: {
      position: 'right',
      logo: false
    },
    
    // Navigation configuration
    navigation: [
      { title: 'About', to: '/' },
      { title: 'Articles', to: '/articles' },
      { title: 'Notes', to: '/notes' }
    ],
    
    // Footer configuration
    footer: {
      credits: {
        enabled: true,
        text: 'Sanath Kandikanti',
        repository: 'https://github.com/sanathkandikanti'
      }
    },
    
    // Social links (can be customized as needed)
    socials: {
      github: 'sanathkandikanti',
      instagram: 'sanathkandikanti',
      twitter: 'sanathkandikant',
      linkedin: {
        href: 'https://www.linkedin.com/in/sanathkandikanti',
        icon: 'uil:linkedin',
        label: 'LinkedIn'
      }
    } as any
  }
})
