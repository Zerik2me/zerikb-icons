import path from 'path'
import { readdir, rm, mkdir, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises'
import { transform } from '@svgr/core';
import template from './template.cjs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const svgrConfig = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx' ],
  typescript: true,
  exportType: 'named',
  ref: true,
  svgProps: {
    width: "{size}",
    height: "{size}",
    color: "{color}",
  },
  template: template,
  icon: true,
  jsxRuntime: 'automatic',
  replaceAttrValues: {
    "#000": "currentColor",
    "#1E1E1E": "currentColor"
  },
  svgoConfig: {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      { name: 'removeAttrs', params: { attrs: 'class' } }
    ]
  }
}

async function main() {
  const cPath = path.join(__dirname, '..', 'svg')
  const lucideDir = path.join(__dirname, '..', 'node_modules', 'lucide-static', 'icons')

  const fileNames = await readdir(cPath)
  const svg = fileNames.filter(f => f.endsWith('.svg'))
  const names = svg.map(n => path.parse(n).name).sort()

  const outDir = path.join(__dirname, '..', 'src', 'icons')

  const content = (await readFile(path.join(__dirname,'..', 'lucide-icons.txt'), 'utf-8')).split('\n').map(line => line.trim()).filter(line => line!=="")

  const sources = new Map()

  for(const n of content){
    sources.set(n, path.join(lucideDir, `${n}.svg`))
  }

  for(const n of names){
    if (sources.has(n)){
      console.log(`"${n}" exists in Lucide, using yours`)
    }
    sources.set(n, path.join(cPath, `${n}.svg`))
  }
  

  await rm(outDir, {recursive: true, force: true})
  await mkdir(outDir, {recursive: true})

  const exportLines = []
  
  const seen = new Map()

  for (const [n, filePath] of [...sources].sort(([a], [b]) => a.localeCompare(b))) {
    const componentNames = toComponentName(n)

    if (seen.has(componentNames)){
      console.log(`Both filenames will be ${componentNames}`)
      process.exitCode = 1
      continue
    }

    seen.set(componentNames, n)
    try {
      const svgText = await readFile(filePath, 'utf-8')

      const problems = [...validateName(n), ...validateSvg(svgText)]
      
      if (problems.length > 0) {
        console.log(`${n}.svg has problems:`)
        for (const p of problems) {
          console.log("  - " + p)
        }
        process.exitCode = 1
        continue
      }
  
      const transformed = await transform(svgText, { ...svgrConfig, namedExport: componentNames }, { componentName: componentNames })
      
      await writeFile(path.join(outDir, `${n}.tsx`), transformed)
      exportLines.push(`export { ${componentNames} } from "./icons/${n}";`)
    } catch (err) {
      console.log(err)
      process.exitCode = 1
    }
  }
  await writeFile(path.join(__dirname, '..', 'src', 'index.ts'), exportLines.join('\n') + `\nexport type { IconProps } from "./types";\n` )
}

function toComponentName(fileName) {

  return fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + "Icon"
  
}


function validateName(name) {
  const problems = []
  const regex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

  if (!regex.test(name)){
  problems.push("name must be lowercase kebab-case and start with a letter (e.g. arrow-left, box-3d)")
  }
  
	return problems
}

function validateSvg(svgText) {
  const problems = []
  const tags = [["<filter", "remove the blur or shadow effect in Figma"], ["<clipPath", "Turn off clip content in Figma"], ["<defs", "remove effects or gradients"]]

  for (const tag of tags) {
    if (svgText.includes(tag[0])) {
      problems.push(`found: ${tag[0]}: ${tag[1]} `)
    }
  }
  return problems
}

main()