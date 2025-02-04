const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// [ALGOGRIND] This is neccessary, becuase by default this monorepo depends on the package.json exports configuration to load packages.
// However, we do not want to rebuild the whole blocksuite monorepo when building the algogrind monorepo, we want to use the already built and published version.
// The correct "exports" configuration can be found in the publishConfig.exports field of the package.json.
// -> copy the correct configuration to the exports field -> publish the package

// List of package.json paths to process
const PACKAGE_PATHS = [
  'packages/affine/all/package.json',
  'packages/affine/block-embed/package.json',
  'packages/affine/block-list/package.json',
  'packages/affine/block-paragraph/package.json',
  'packages/affine/block-surface/package.json',
  'packages/affine/components/package.json',
  'packages/affine/data-view/package.json',
  'packages/affine/model/package.json',
  'packages/affine/shared/package.json',
  'packages/affine/widget-scroll-anchoring/package.json',
  'packages/blocks/package.json',
  'packages/framework/block-std/package.json',
  'packages/framework/global/package.json',
  'packages/framework/inline/package.json',
  'packages/framework/store/package.json',
  'packages/framework/sync/package.json',
  'packages/presets/package.json',
];

const VITE_CONFIG_PATH = 'packages/playground/vite.config.ts';

function updateViteConfig() {
  const fullPath = path.join(process.cwd(), VITE_CONFIG_PATH);

  try {
    // Read vite.config.ts
    let content = readFileSync(fullPath, 'utf-8');

    // Replace @blocksuite with @algogrind in the chunkGroups object
    content = content.replace(
      /([@']blocksuite\/[^'"\s,\]]+)/g,
      (match: string) => match.replace('@blocksuite', '@algogrind')
    );

    // Write back to vite.config.ts
    writeFileSync(fullPath, content);

    console.log('✅ Updated package names in vite.config.ts');

    // Stage the changes
    execSync(`git add ${VITE_CONFIG_PATH}`);

    return true;
  } catch (error) {
    console.error('❌ Error processing vite.config.ts:', error);
    process.exit(1);
  }
}

function updateExports() {
  let hasChanges = false;

  PACKAGE_PATHS.forEach(packagePath => {
    const fullPath = path.join(process.cwd(), packagePath);

    try {
      // Read package.json
      const packageJson = JSON.parse(readFileSync(fullPath, 'utf-8'));

      // Check if publishConfig.exports exists
      if (packageJson.publishConfig?.exports) {
        // Update exports field with publishConfig.exports
        packageJson.exports = packageJson.publishConfig.exports;

        // Write back to package.json with proper formatting
        writeFileSync(fullPath, JSON.stringify(packageJson, null, 2) + '\n');

        console.log(`✅ Updated exports for ${packagePath}`);
        hasChanges = true;
      } else {
        console.log(`⚠️ No publishConfig.exports found in ${packagePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${packagePath}:`, error);
      process.exit(1);
    }
  });

  // Also update the vite config
  const viteConfigChanged = updateViteConfig();
  hasChanges = hasChanges || viteConfigChanged;

  if (hasChanges) {
    try {
      // Stage and commit changes
      execSync('git add .');
      execSync(
        'git commit -m "chore: fix export configuration and package names before publish"'
      );
      console.log('✅ Changes committed successfully');
    } catch (error) {
      console.error('❌ Error committing changes:', error);
      process.exit(1);
    }
  } else {
    console.log('ℹ️ No changes were needed');
  }
}

updateExports();
