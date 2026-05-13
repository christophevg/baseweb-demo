# Bug Analysis: CollectionView Header Undefined

**Bug ID:** vue3-migration-collectionview-header
**Status:** Fixed
**Fixed Date:** 2025-05-05
**Severity:** High - Component fails to render
**Date:** 2025-05-05

## Summary

CollectionView component throws `TypeError: undefined is not an object (evaluating 'header.value')` when mounted in Vue 3.

## Symptoms

- Error occurs on component mount
- CollectionView demo page fails to render
- Console shows Vue 3 reactivity error trace

## Expected vs Actual Behavior

**Expected:** Component renders table with headers, no errors.

**Actual:** TypeError thrown, component fails to render properly.

## Root Cause Analysis

### 5 Whys

1. **Why is header undefined?** The `v-if` directive evaluates before `v-for` creates the variable.
2. **Why does v-if evaluate before v-for?** Vue 3 changed directive priority order.
3. **Why was this changed?** Vue 3 prioritizes `v-if` for better template optimization.
4. **Why did it work in Vue 2?** Vue 2 gave `v-for` higher priority.
5. **Why is this code pattern used?** Common pattern in Vue 2 to filter v-for items.

### Technical Details

Location: `src/baseweb/static/js/components/CollectionView.js` line 74

```javascript
// PROBLEMATIC CODE
<td v-for="(header, i) in headers" v-if="header.value != '' && header.value != undefined" ...>
```

Vue 3 Breaking Change: `v-if` has higher priority than `v-for` when on the same element.

## Proposed Fix

**Option 1: Use computed property to filter headers (Recommended)**
```javascript
// Add computed property
filtered_headers: function() {
  return this.headers.filter(function(header) {
    return header.value !== '' && header.value !== undefined;
  });
}

// Template
<td v-for="(header, i) in filtered_headers" ...>
```

**Option 2: Use template wrapper**
```javascript
<template v-for="(header, i) in headers" :key="header.value || header.key">
  <td v-if="header.value != '' && header.value != undefined" ...>
```

**Recommendation:** Option 1 is cleaner and more maintainable.

## Test Strategy

**Test Type:** Component integration test

**Test Case:**
1. Mount CollectionView with headers
2. Verify no errors thrown
3. Verify correct number of `<td>` elements rendered
4. Verify empty/undefined value headers are filtered out

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Regression in header rendering | Low | Visual verification |
| Performance impact | None | Computed property is efficient |

## Lessons Learned

- Vue 3 migration requires reviewing all `v-for` + `v-if` on same element
- Use computed properties or `<template>` wrapper for conditional iteration
- Vue 3 directive priority is different from Vue 2