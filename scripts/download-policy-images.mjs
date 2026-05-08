import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const inputPath = path.join(rootDir, 'scripts', 'policy-images-input.json')
const outDir = path.join(rootDir, 'public', 'policies')
const outMapPath = path.join(rootDir, 'src', 'data', 'policyImages.js')

const CONTENT_TYPE_EXT = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extFromUrl(url) {
  try {
    const pathname = new URL(url).pathname
    const ext = path.extname(pathname).toLowerCase()
    if (ext && ext.length <= 6) return ext
  } catch {
    // ignore
  }
  return null
}

async function ensurePlaceholder() {
  const placeholderPath = path.join(outDir, 'placeholder.svg')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520" fill="none"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f2937"/><stop offset="1" stop-color="#111827"/></linearGradient></defs><rect width="800" height="520" fill="url(#g)"/><rect x="220" y="145" width="360" height="230" rx="18" fill="#374151"/><circle cx="320" cy="230" r="35" fill="#6b7280"/><rect x="375" y="285" width="145" height="20" rx="10" fill="#6b7280"/></svg>`
  await fs.writeFile(placeholderPath, svg, 'utf8')
}

async function downloadOne(entry, index) {
  const safeBase = `${String(index + 1).padStart(3, '0')}-${slugify(entry.name)}`
  const res = await fetch(entry.image, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const type = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()
  const ext = CONTENT_TYPE_EXT[type] || extFromUrl(entry.image) || '.jpg'
  const outName = `${safeBase}${ext}`
  const outPath = path.join(outDir, outName)
  const arr = new Uint8Array(await res.arrayBuffer())
  await fs.writeFile(outPath, arr)
  return `/policies/${outName}`
}

function renderPolicyImageMap(entries) {
  const payload = JSON.stringify(entries, null, 2)
  return `const policyImages = ${payload}

function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const byExactName = new Map(policyImages.map((entry) => [entry.name, entry.image]))
const byNormalizedName = new Map(policyImages.map((entry) => [normalizeTitle(entry.name), entry.image]))

export function getPolicyImageByName(name) {
  return byExactName.get(name) ?? byNormalizedName.get(normalizeTitle(name)) ?? null
}
`
}

async function run() {
  await fs.mkdir(outDir, { recursive: true })
  await ensurePlaceholder()
  const inputRaw = await fs.readFile(inputPath, 'utf8')
  const input = JSON.parse(inputRaw)

  const outEntries = []
  for (let i = 0; i < input.length; i += 1) {
    const item = input[i]
    try {
      const local = await downloadOne(item, i)
      outEntries.push({ name: item.name, image: local })
      process.stdout.write(`Downloaded ${i + 1}/${input.length}: ${item.name}\n`)
    } catch (err) {
      outEntries.push({ name: item.name, image: '/policies/placeholder.svg' })
      process.stdout.write(`Fallback ${i + 1}/${input.length}: ${item.name} (${err.message})\n`)
    }
  }

  await fs.writeFile(outMapPath, renderPolicyImageMap(outEntries), 'utf8')
  process.stdout.write(`\nSaved map: ${outMapPath}\n`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
