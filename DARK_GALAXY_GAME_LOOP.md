# Dark Galaxy Game Loop Implementation

**Updated:** December 22, 2024  
**Phase:** `dark-galaxy-start`

## Game Loop Strategy

Based on user feedback, the dark galaxy phase follows this game loop:

### 1. Outside Dark Galaxy
- Gain red, yellow, and green particles through normal progression
- Accumulate dark matter
- Purchase galaxy tree upgrades with dark matter
- Build up resources for next dark galaxy run

### 2. Enter Dark Galaxy Challenge
- Automatically enters when green particles ≥ 1e2
- Cooldown of 10 minutes (600 seconds) between entries
- All multipliers are severely nerfed (^0.15 power)

### 3. Inside Dark Galaxy
- Rotate through different dark star chargers every 10 minutes
- Each charger builds charge and applies different nerfs
- Dark stars are gained incrementally based on resource heights
- Minimum stay: 30 minutes (1800 seconds)
- Minimum gain: 2 dark stars before exiting

### 4. Exit Dark Galaxy
- Exits automatically after meeting both conditions:
  - Been in dark galaxy for at least 30 minutes, AND
  - Gained at least 2 dark stars
- OR after 60 minutes regardless of dark star gain
- Awards accumulated dark stars upon exit

### 5. Repeat Cycle
- Returns to step 1 after 10-minute cooldown
- Each cycle uses different charger configurations
- Progressive gains as resources improve

## Dark Star Mechanics

### Dark Star Gain Formula
```
gain = (log10(log10(RP)) × log10(log10(RA)) × log10(log10(YP)) × log10(log10(YPow)) × log10(SK) - 1) / 5 - currentDarkStars
```

Where:
- RP = Red Particles
- RA = Red Accelerators  
- YP = Yellow Particles
- YPow = Yellow Power
- SK = Star Keys

### Dark Star Usage
- Dark stars boost particle multipliers (but nerfed to ^0.1 inside dark galaxy)
- Higher dark stars enable more galaxy tree upgrades
- Dark stars are persistent across cycles

## Starting Conditions

The `dark-galaxy-start` phase begins with:

**Dark Stars:** 0 (gained during runs)
**Particles:** 1e400 red/yellow (600 orders from 1e1000 goal)
**Resources:** Balanced for multiple dark galaxy cycles

## Charger Rotation Strategy

The balance tool rotates through chargers in priority order:
1. Combine Dark Charger (best overall)
2. Star Challenge Dark Charger
3. Yellow Fusion Dark Charger
4. Yellow Upgrade Dark Charger
5. Star Key Dark Charger
6. Yellow Generator Dark Charger
7. Red Accelerator Dark Charger
8. Red Generator Dark Charger

Each charger is active for 10 minutes before switching to the next.

## Expected Progression

### Cycle 1 (First Dark Galaxy Run)
- Duration: 30-60 minutes
- Dark Stars Gained: 2-5
- Charger Rotations: 3-6
- Tier Upgrades: 0-1

### Cycle 2-5 (Mid Progression)
- Duration: 30-60 minutes each
- Dark Stars Gained: 3-8 per cycle
- Charger Rotations: 3-6 per cycle
- Tier Upgrades: 1-2 per cycle

### Cycle 6+ (Late Progression)
- Duration: 30-60 minutes each
- Dark Stars Gained: 5-15 per cycle
- Charger Rotations: 3-6 per cycle
- Tier Upgrades: 2-4 per cycle

## Implementation Details

### Challenge Helper Service
- Tracks dark galaxy cycles
- Implements 30-minute minimum stay
- Enforces 2 dark star minimum gain
- Manages 10-minute cooldown between cycles
- Records exit events with dark star gains

### Dark Star Charger Helper
- Rotates chargers every 10 minutes during dark galaxy
- Tiers up chargers when max charge reached
- Deactivates chargers when exiting dark galaxy
- Reactivates on next dark galaxy entry

### Galaxy Tree Upgrade Helper
- Purchases upgrades during cooldown periods
- Focuses on dark matter and dark energy multipliers
- Prioritizes upgrades that boost particle generation

## Balance Considerations

### Cycle Duration (30 minutes minimum)
- Allows 3+ charger rotations per cycle
- Gives time for meaningful dark star accumulation
- Balances with 10-minute outside cooldown (3:1 ratio)

### Dark Star Threshold (2 minimum)
- Ensures each cycle is productive
- Prevents premature exits with minimal gains
- Scales naturally with progression

### Cooldown Period (10 minutes)
- Time to purchase galaxy tree upgrades
- Build up particles before re-entry
- Prevents rapid cycling without progression

## Testing Notes

When running the balance tool with `dark-galaxy-start`:
- First cycle may take longer (30-40 minutes)
- Mid cycles should average 40-50 minutes
- Later cycles may complete faster as dark stars accumulate
- Total simulation should show 10-20+ dark galaxy cycles
- Dark stars should accumulate to 50-200+ by end

The simulation properly demonstrates the intended game loop of cycling between dark galaxy runs and outside progression.
