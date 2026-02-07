import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

/**
 * Check if a file exists
 */
export function fileExists(path: string): boolean {
  return existsSync(path)
}

/**
 * Read file content as string
 */
export function readFileContent(path: string): string {
  return readFileSync(path, 'utf-8')
}

/**
 * Read and parse JSON file
 */
export function readJsonFile(path: string): any {
  const content = readFileContent(path)
  return JSON.parse(content)
}

/**
 * Get all files in a directory (non-recursive)
 */
export function getFilesInDirectory(dirPath: string): string[] {
  if (!existsSync(dirPath)) {
    return []
  }
  
  return readdirSync(dirPath).filter(file => {
    const fullPath = join(dirPath, file)
    return statSync(fullPath).isFile()
  })
}

/**
 * Get all files in a directory recursively
 */
export function getFilesRecursive(dirPath: string): string[] {
  if (!existsSync(dirPath)) {
    return []
  }
  
  const files: string[] = []
  
  function traverse(currentPath: string) {
    const items = readdirSync(currentPath)
    
    for (const item of items) {
      const fullPath = join(currentPath, item)
      const stat = statSync(fullPath)
      
      if (stat.isFile()) {
        files.push(fullPath)
      } else if (stat.isDirectory()) {
        traverse(fullPath)
      }
    }
  }
  
  traverse(dirPath)
  return files
}

/**
 * Check if a file has a specific extension
 */
export function hasExtension(filePath: string, ext: string): boolean {
  return extname(filePath) === ext
}

/**
 * Extract frontmatter from markdown file
 */
export function extractFrontmatter(content: string): Record<string, any> | null {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return null
  }
  
  const frontmatterText = match[1]
  const frontmatter: Record<string, any> = {}
  
  // Simple YAML parser for basic key-value pairs
  const lines = frontmatterText.split('\n')
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim()
      frontmatter[key] = value
    }
  }
  
  return frontmatter
}

/**
 * Check if filename has numeric prefix (e.g., "1.index.md")
 */
export function hasNumericPrefix(filename: string): boolean {
  const numericPrefixRegex = /^\d+\./
  return numericPrefixRegex.test(filename)
}

/**
 * Get the parent directory name of a file path
 */
export function getParentDirName(filePath: string): string {
  const parts = filePath.split('/')
  return parts[parts.length - 2] || ''
}

/**
 * Search for import statements in file content
 */
export function findImports(content: string, packageName: string): boolean {
  const importRegex = new RegExp(`import\\s+.*?from\\s+['"]${packageName}['"]`, 'g')
  const requireRegex = new RegExp(`require\\s*\\(['"]${packageName}['"]\\)`, 'g')
  
  return importRegex.test(content) || requireRegex.test(content)
}

/**
 * Get all TypeScript/JavaScript source files (excluding node_modules)
 */
export function getSourceFiles(rootPath: string): string[] {
  const files = getFilesRecursive(rootPath)
  
  return files.filter(file => {
    // Exclude node_modules, .nuxt, .output, etc.
    if (file.includes('node_modules') || 
        file.includes('.nuxt') || 
        file.includes('.output') ||
        file.includes('.git')) {
      return false
    }
    
    // Include only .ts, .js, .vue files
    const ext = extname(file)
    return ['.ts', '.js', '.vue'].includes(ext)
  })
}
