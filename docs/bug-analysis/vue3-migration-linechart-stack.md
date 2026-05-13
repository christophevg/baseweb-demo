# Bug Analysis: LineChart Maximum Call Stack Exceeded

**Bug ID:** vue3-migration-linechart-stack
**Status:** Fixed
**Fixed Date:** 2025-05-05
**Severity:** High - Component crashes browser
**Date:** 2025-05-05

## Summary

LineChart component throws `RangeError: Maximum call stack size exceeded` when data is updated in Vue 3.

## Symptoms

- Error occurs when clicking "add a data point" button
- Browser freezes or crashes
- Console shows stack overflow in Vue reactivity system

## Expected vs Actual Behavior

**Expected:** Chart updates smoothly with new data point.

**Actual:** Infinite loop causes stack overflow.

## Root Cause Analysis

### 5 Whys

1. **Why stack overflow?** Infinite loop in Vue reactivity + Chart.js update cycle.
2. **Why infinite loop?** Deep watcher triggers on Chart.js internal modifications.
3. **Why does Chart.js modify data?** Chart.js internally mutates data for animations/updates.
4. **Why does mutation trigger watcher?** Vue 3 uses Proxy for reactive objects.
5. **Why is reactive proxy passed to Chart.js?** Direct assignment without cloning.

### Technical Details

Location: `src/baseweb/static/js/components/LineChart.js` lines 68-95

```javascript
// PROBLEMATIC CODE
watch: {
  chartData: {
    deep: true,  // Deep watch triggers on internal Chart.js mutations
    handler: function(newData) {
      this.updateChart();
    }
  }
},
methods: {
  updateChart: function() {
    if (this.chart) {
      this.chart.data = this.chartData;  // Assigns reactive proxy
      this.chart.options = this.merged_options;
      this.chart.update();  // Chart.js mutates data, triggers watcher
    }
  }
}
```

**The Cycle:**
1. Parent updates `values` array
2. Computed `chartdata` updates
3. Deep watcher on `chartData` fires
4. `updateChart()` called
5. Chart.js mutates `chart.data` internally
6. Mutation detected on reactive proxy
7. Deep watcher fires again
8. → goto step 4 (infinite loop)

## Proposed Fix

**Option 1: Clone data before passing to Chart.js (Recommended)**
```javascript
createChart: function() {
  var ctx = this.$refs.canvas.getContext('2d');
  // Clone data to break reactivity chain
  this.chart = new Chart(ctx, {
    type: 'line',
    data: JSON.parse(JSON.stringify(this.chartData)),
    options: this.merged_options
  });
},
updateChart: function() {
  if (this.chart) {
    // Clone data to prevent Chart.js mutations from triggering reactivity
    this.chart.data = JSON.parse(JSON.stringify(this.chartData));
    this.chart.options = this.merged_options;
    this.chart.update();
  }
}
```

**Option 2: Use shallow watch**
```javascript
watch: {
  chartData: {
    deep: false,  // Only watch reference changes
    handler: function(newData) {
      this.updateChart();
    }
  }
}
```

**Option 3: Debounce updates**
```javascript
// Add debounce to prevent rapid re-triggers
watch: {
  chartData: {
    deep: true,
    handler: _.debounce(function(newData) {
      this.updateChart();
    }, 100)
  }
}
```

**Recommendation:** Option 1 (clone data) is most reliable and prevents all mutation-based triggers.

## Test Strategy

**Test Type:** Component integration test

**Test Case:**
1. Mount LineChart with initial data
2. Trigger data update (shift + push)
3. Verify no stack overflow
4. Verify chart updates correctly
5. Repeat update 10 times to verify stability

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Performance overhead from cloning | Low | Data is small, JSON.parse/stringify is fast |
| Chart not updating | Low | Verify with visual test |
| Memory leaks | None | Chart.js handles its own cleanup |

## Lessons Learned

- Vue 3's Proxy-based reactivity requires breaking the chain when passing data to third-party libraries
- Deep watchers on objects passed to external libraries can cause infinite loops
- Always clone reactive data before passing to non-Vue libraries that mutate internally
- Chart.js, D3.js, and similar libraries require data cloning in Vue 3