import { describe, it, expect } from 'vitest'
import { fileExists } from '../helpers/file-utils'

/**
 * Basic setup tests to verify testing infrastructure is working
 */
describe('Testing Infrastructure Setup', () => {
  it('should have vitest.config.ts', () => {
    expect(fileExists('vitest.config.ts')).toBe(true)
  })

  it('should have package.json', () => {
    expect(fileExists('package.json')).toBe(true)
  })

  it('should have tests directory structure', () => {
    expect(fileExists('tests/unit')).toBe(true)
    expect(fileExists('tests/property')).toBe(true)
    expect(fileExists('tests/helpers')).toBe(true)
  })
})

/**
 * Verify fast-check is available for property-based testing
 */
describe('Property-Based Testing Setup', () => {
  it('should be able to import fast-check', async () => {
    const fc = await import('fast-check')
    expect(fc).toBeDefined()
    expect(fc.assert).toBeDefined()
    expect(fc.property).toBeDefined()
  })
})
