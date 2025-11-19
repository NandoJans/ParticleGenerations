# Dev Phase Selector

## Overview

The Dev Phase Selector is a development tool that allows developers to quickly jump to different phases of the game for testing purposes. This tool helps developers test specific game features without having to play through the entire game progression.

## Access

Navigate to the Dev Phase page by visiting:
```
#/dev/phase
```

## Features

### Available Phases

The Dev Phase Selector provides 7 pre-configured game phases:

1. **Start** - Beginning of the game with Red phase only
   - 10 red particles
   - 1 first red generator unlocked

2. **Early Red** - Red phase with multiple generators
   - 1e100 red particles
   - First 3 red generators unlocked with some levels
   - Basic red generator extensions

3. **Late Red** - Ready to prestige to Yellow
   - 1e1000 red particles
   - All 5 red generators unlocked with 20 levels each
   - Red accelerators unlocked
   - Multiple red upgrades purchased

4. **Early Yellow** - Yellow phase just unlocked
   - 1e3 yellow particles
   - 1 yellow prestige
   - First yellow generator unlocked
   - Basic yellow upgrades available

5. **Mid Yellow** - Yellow phase with fusion mechanics
   - 5e28 yellow particles
   - 1e4 yellow prestiges
   - 1e6 yellow keys
   - Hydrogen and fusion generators unlocked
   - Multiple yellow generators with levels

6. **Late Yellow** - Ready to prestige to Green
   - 1e1000 yellow particles
   - 1e6 yellow prestiges
   - All 5 yellow generators unlocked
   - Star keys available
   - Many yellow upgrades purchased

7. **Early Green** - Green phase just unlocked
   - 1e3 green particles
   - 1 green prestige
   - First green generator unlocked
   - Dark matter and dark energy introduced

## How to Use

1. Navigate to `#/dev/phase` in your browser
2. Select a phase from the dropdown menu
3. Review the phase description to understand what will be set up
4. Click the "Load Phase" button
5. Confirm the warning dialog (this will reset your current progress)
6. The game state will be reset and configured for the selected phase

## Technical Details

### Service: DevPhaseService

Located at: `src/app/services/dev/dev-phase.service.ts`

The service provides:
- `getPhases()`: Returns all available phase configurations
- `loadPhase(phaseId: string)`: Loads a specific phase by ID

Each phase configuration includes:
- `id`: Unique identifier
- `name`: Display name
- `description`: Brief description of the phase
- `setup()`: Function that configures the game state

### Component: DevPhaseComponent

Located at: `src/app/dev/dev-phase/dev-phase.component.ts`

The component provides a user interface for:
- Viewing available phases
- Selecting a phase
- Loading the selected phase with confirmation

## Implementation Details

When a phase is loaded:
1. All game elements are reset using `fullReset()`
2. Holdings are set to phase-specific values
3. Generators are unlocked and purchased to specific levels
4. Upgrades are unlocked and purchased as needed
5. The game state is saved

This ensures a consistent starting point for testing specific game features.

## Warning

⚠️ **Important**: Loading a phase will completely reset your current game progress! This tool is intended for development and testing purposes only.
