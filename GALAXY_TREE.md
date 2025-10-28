# Green Galaxy Tree Documentation

## Overview
The Green Galaxy Tree is a skill tree feature where each node applies a certain buff or upgrade to game elements. Players spend Dark Energy (earned through particle sacrifices) to unlock nodes in the tree.

## Structure
The galaxy tree has been split into 4 main sections, each targeting a different part of the game:

### 1. Red Generators Section
**Color:** Red stars (Styles.STAR_RED)
**Focus:** Upgrades that improve red particle generators and their multipliers

**Current Upgrades:**
- `increaseRedGeneratorMultiplier` - Makes red generator multipliers 2x stronger (Cost: 1 Dark Energy)
  - Parent: unlockFirstGreenGenerator
  - Children: moreYellowKeys, increaseBoosterAccelerationPower, redGeneratorEfficiency, redGeneratorsBoostYellowUpgrades, redGeneratorsBoostYellowFusion
- `redGeneratorEfficiency` - Red generator booster upgrade is 1.1x stronger (Cost: 4 Dark Energy)
  - Parent: increaseRedGeneratorMultiplier
  - Children: redGeneratorsBoostAccelerators
- `redGeneratorsBoostAccelerators` - Red generator mastery empowers cheaper booster acceleration by 1.5x (Cost: 40 Dark Energy)
  - Parent: redGeneratorEfficiency
  - Children: none
- `strongerRedExtensionGalaxyTree` - Stronger red extension effect (Cost: 3 Dark Energy)
  - Parent: increaseRedGeneratorMultiplier (via cheaperBoosterAcceleration)
  - Children: cheaperRedGenerators
- `cheaperRedGenerators` - Red generator sub-multiplier upgrade is 1.5x stronger (Cost: 3 Dark Energy)
  - Parent: strongerRedExtensionGalaxyTree
  - Children: none

### 2. Red Accelerators Section
**Color:** Red stars (Styles.STAR_RED)
**Focus:** Upgrades that improve red accelerators and booster acceleration

**Current Upgrades:**
- `cheaperBoosterAcceleration` - Cheaper booster acceleration (Cost: varies)
  - Parent: unlockFirstGreenGenerator
  - Children: redAcceleratorStart, strongerRedExtensionGalaxyTree
- `redAcceleratorStart` - Halves all cost increase of red generators, unlocks red accelerators early (Cost: 1 Dark Energy)
  - Parent: cheaperBoosterAcceleration
  - Children: yellowFusionBoostRedAccelerators, redAcceleratorsBoostYellowUpgrades
- `increaseBoosterAccelerationPower` - Increases booster acceleration power (Cost: varies)
  - Parent: increaseRedGeneratorMultiplier
  - Children: redAcceleratorsBoostGenerators
- `redAcceleratorsBoostGenerators` - Red accelerator expertise enhances red generator multipliers by 1.4x (Cost: 35 Dark Energy)
  - Parent: increaseBoosterAccelerationPower
  - Children: none

### 3. Yellow Upgrades and Generators Section
**Color:** Orange/Yellow stars (Styles.STAR_ORANGE, Styles.STAR_YELLOW)
**Focus:** Upgrades that improve yellow particles, yellow power, and yellow keys

**Current Upgrades:**
- `strongerYellowPower` - Increases yellow power upgrade by 1.1x (Cost: 1 Dark Energy)
  - Parent: unlockFirstGreenGenerator
  - Children: strongerHydrogenGalaxyTree, betterYellowParticles, redGeneratorsBoostYellowUpgrades, redAcceleratorsBoostYellowUpgrades
- `betterYellowParticles` - Yellow generator buy-multipliers are 2.5x stronger (Cost: 3 Dark Energy)
  - Parent: strongerYellowPower
  - Children: none
- `moreYellowKeys` - Yellow key gain upgrade is 1.5x stronger (Cost: 2 Dark Energy)
  - Parent: strongerYellowPower
  - Children: strongerYellowGenerators, moreYellowKeysGain
- `strongerYellowGenerators` - Yellow generator multiplier upgrades are 2x stronger (Cost: 4 Dark Energy)
  - Parent: moreYellowKeys
  - Children: none
- `moreYellowKeysGain` - Yellow key gain is 1.75x higher (Cost: 5 Dark Energy)
  - Parent: moreYellowKeys
  - Children: yellowUpgradesBoostFusion
- `yellowUpgradesBoostFusion` - Yellow power mastery strengthens yellow fusion effect by 1.5x (Cost: 50 Dark Energy)
  - Parent: moreYellowKeysGain
  - Children: none

### 4. Yellow Fusion Section
**Color:** Orange stars (Styles.STAR_ORANGE)
**Focus:** Upgrades that improve yellow fusion mechanics and hydrogen generation

**Current Upgrades:**
- `fasterHydrogenGeneration` - Generate hydrogen 2.5x faster (Cost: 2 Dark Energy)
  - Parent: unlockFirstGreenGenerator
  - Children: strongerHydrogenGalaxyTree, improveYellowFusion, redGeneratorsBoostYellowFusion
- `strongerHydrogenGalaxyTree` - Stronger hydrogen effect (Cost: varies)
  - Parents: fasterHydrogenGeneration, strongerYellowPower
  - Children: yellowFusionBoostUpgrades
- `yellowFusionBoostUpgrades` - Hydrogen mastery amplifies yellow power by 1.6x (Cost: 45 Dark Energy)
  - Parent: strongerHydrogenGalaxyTree
  - Children: none
- `improveYellowFusion` - Yellow fusion effect is 1.25x stronger (Cost: 3 Dark Energy)
  - Parent: fasterHydrogenGeneration
  - Children: yellowFusionBoostRedAccelerators
- `yellowFusionBoostRedAccelerators` - Yellow fusion boosts red accelerators (Cost: varies)
  - Parents: improveYellowFusion, redAcceleratorStart
  - Children: none

### 5. Mix-Upgrades (Cross-Section Synergies)
**Color:** Orange/Yellow stars (Styles.STAR_ORANGE, Styles.STAR_YELLOW)
**Focus:** Upgrades that bridge different sections, requiring BOTH parents

**Current Upgrades:**
- `redGeneratorsBoostYellowUpgrades` - Red generator efficiency boosts yellow power upgrade by 1.5x (Cost: 15 Dark Energy)
  - Parents: increaseRedGeneratorMultiplier, strongerYellowPower (requires BOTH)
  - Children: none
- `redGeneratorsBoostYellowFusion` - Red generators amplify hydrogen generation by 1.4x (Cost: 20 Dark Energy)
  - Parents: increaseRedGeneratorMultiplier, fasterHydrogenGeneration (requires BOTH)
  - Children: none
- `redAcceleratorsBoostYellowUpgrades` - Red accelerators enhance yellow key gain by 1.3x (Cost: 12 Dark Energy)
  - Parents: redAcceleratorStart, strongerYellowPower (requires BOTH)
  - Children: none

### Root Node
- `unlockFirstGreenGenerator` - The starting node that unlocks the galaxy tree
  - Parent: none (always available after green prestige)
  - Children: increaseRedGeneratorMultiplier, cheaperBoosterAcceleration, fasterHydrogenGeneration, strongerYellowPower

## Node Properties
Each galaxy tree upgrade extends `GalaxyTreeUpgrade` and has:
- `displayName`: User-friendly name shown in UI
- `saveName`: Internal save identifier
- `name`: Internal name/type identifier
- `cost`/`baseCost`: Dark Energy cost to purchase
- `buffer`/`baseBuffer`: Multiplier/effect strength (if applicable)
- `style`: Visual style (color) - uses `Styles` enum
- `worldX`/`worldY`: Position coordinates in the tree visualization
- `getParents()`: Returns array of parent nodes (must buy one parent to unlock)
- `getChildren()`: Returns array of child nodes (unlocked after buying this node)
- `getDescription()`: Returns user-facing description of the upgrade
- `action()`: Executed when upgrade is applied (modifies game state)

## Creating New Upgrades

### 1. Create the upgrade class file
Location: `src/app/classes/features/upgrades/[name]-galaxy-tree-upgrade.ts`

Example template:
```typescript
import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class MyNewGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "my-new-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      // Add child nodes here
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.someParentNode,
    ];
  }

  getDescription(): string {
    return "Description of what this upgrade does";
  }

  action(): undefined {
    if (this.hasBought()) {
      // Apply upgrade effect here
    }
    return;
  }

  style: Styles = Styles.STAR_RED; // Choose appropriate color
  displayName: string = "My New Upgrade";

  override buffer = new Num(2, 0); // If applicable
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);
}
```

### 2. Add to UpgradeRecord
Add the upgrade instance and import in `src/app/classes/records/upgrades/upgrade-record.ts`:
- Import the class at the top
- Create static instance
- Add to `galaxyTreeUpgradeList` array
- The upgrade is automatically included via spread operator in main list

### 3. Update parent/child relationships
Update the `getChildren()` method of parent nodes to include your new upgrade.

### 4. Set position in tree
Add positioning in `green-galaxy-tree.component.ts` in the `setPositions()` method:
```typescript
UpgradeRecord.myNewUpgrade.setPos(x, y);
```

### 5. Create test file
Create `[name]-galaxy-tree-upgrade.spec.ts` following the pattern of existing tests.

## Section Guidelines

### Red Generators Section
- Use `Styles.STAR_RED`
- Focus on: generator multipliers, generator costs, generator scaling, generator count
- Typical effects: modify `GeneratorRecord.redGenerators`, `MultiplierRecord.redParticleGenerators`

### Red Accelerators Section  
- Use `Styles.STAR_RED`
- Focus on: accelerator generation, accelerator effects, booster acceleration
- Typical effects: modify accelerator-related multipliers, unlock requirements

### Yellow Upgrades/Generators Section
- Use `Styles.STAR_ORANGE` or `Styles.STAR_YELLOW`
- Focus on: yellow particles, yellow keys, yellow power, yellow generators
- Typical effects: modify yellow particle gain, yellow key multipliers, yellow power strength

### Yellow Fusion Section
- Use `Styles.STAR_ORANGE`
- Focus on: hydrogen generation, fusion effects, fusion goals
- Typical effects: modify `HoldingRecord.yellowFusion`, hydrogen multipliers

## Cost Guidelines
- Entry-level nodes: 1-2 Dark Energy
- Mid-tier nodes: 3-5 Dark Energy
- Advanced nodes: 6-10+ Dark Energy
- Consider tree depth and power level when setting costs

## Multiplier Guidelines
- Small boosts: 1.1x - 1.5x
- Medium boosts: 2x - 3x
- Large boosts: 5x - 10x
- Consider balance with existing upgrades
