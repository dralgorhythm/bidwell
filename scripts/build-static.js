#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const apiDir = path.join(__dirname, '../app/api')
const apiBackupDir = path.join(__dirname, '../api-backup')
const nextDir = path.join(__dirname, '../.next')

console.log('📦 Preparing for static export build...')

// Clean any existing Next.js cache first
if (fs.existsSync(nextDir)) {
  console.log('🧹 Cleaning Next.js cache...')
  fs.rmSync(nextDir, { recursive: true })
}

// Move API routes out of the way for static export
if (fs.existsSync(apiDir)) {
  console.log('🔄 Moving API routes for static export...')

  // Remove backup if it exists
  if (fs.existsSync(apiBackupDir)) {
    fs.rmSync(apiBackupDir, { recursive: true })
  }

  // Move API to backup
  fs.renameSync(apiDir, apiBackupDir)
}

try {
  console.log('🏗️  Building static export...')
  // Set environment variables for static export
  process.env.GITHUB_ACTIONS = 'true'
  process.env.NEXT_PUBLIC_STATIC_EXPORT = 'true'

  execSync('GITHUB_ACTIONS=true NEXT_PUBLIC_STATIC_EXPORT=true npx next build', {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_ACTIONS: 'true', NEXT_PUBLIC_STATIC_EXPORT: 'true' },
  })
  console.log('✅ Static export build completed successfully!')
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
} finally {
  // Restore API routes
  if (fs.existsSync(apiBackupDir)) {
    console.log('🔄 Restoring API routes...')

    // Remove current api dir if it exists
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true })
    }

    // Restore from backup
    fs.renameSync(apiBackupDir, apiDir)
    console.log('✅ API routes restored')
  }
}
