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

function updateExports() {
  let hasChanges = false;

  PACKAGE_PATHS.forEach(packagePath => {
    const fullPath = path.join(process.cwd(), packagePath);

    try {
      // Read package.json
      const packageJson = JSON.parse(readFileSync(fullPath, 'utf-8'));

      let madeChanges = false;

      // Check if publishConfig.exports exists
      if (packageJson.publishConfig?.exports) {
        // Update exports field with publishConfig.exports
        packageJson.exports = packageJson.publishConfig.exports;
        madeChanges = true;
      } else {
        console.log(`⚠️ No publishConfig.exports found in ${packagePath}`);
      }

      // Add main field if it doesn't exist
      if (!packageJson.main) {
        packageJson.main = './dist/index.js';
        madeChanges = true;
        console.log(`✅ Added main field to ${packagePath}`);
      }

      if (madeChanges) {
        // Write back to package.json with proper formatting
        writeFileSync(fullPath, JSON.stringify(packageJson, null, 2) + '\n');
        console.log(`✅ Updated ${packagePath}`);
        hasChanges = true;
      }
    } catch (error) {
      console.error(`❌ Error processing ${packagePath}:`, error);
      process.exit(1);
    }
  });

  if (hasChanges) {
    try {
      // Stage and commit changes
      execSync('git add .');
      execSync(
        'git commit -m "chore: fix export configuration and add main field before publish"'
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
