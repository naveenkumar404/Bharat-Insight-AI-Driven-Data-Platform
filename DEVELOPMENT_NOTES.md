# Development Notes

Personal notes and decisions made during development.

## Day 1 - Initial Setup

### Tech Stack Decisions
- Chose Next.js 14 for its App Router and built-in optimizations
- TypeScript was a must for type safety and better DX
- Tailwind CSS because I can prototype faster with utility classes
- Framer Motion for animations - it's my go-to for smooth transitions

### Architecture Thoughts
I decided to separate concerns early:
- `lib/` for business logic and services
- `components/` for UI components
- `store/` for global state
- `app/` for routes and pages

This makes the codebase easier to navigate and test.

## Virtualization Challenge

The 100K rows requirement was interesting. Initially thought about:
1. Pagination - but that breaks the "see all data" requirement
2. Infinite scroll - better but still loads everything eventually
3. Virtual scrolling - perfect! Only renders what's visible

Went with TanStack Virtual because:
- Lightweight
- Works great with React
- Easy to implement
- Handles dynamic heights if needed

The key insight: we only need ~30 DOM nodes for 100K rows!

## AI Integration Approach

For the Gemini integration, I wanted to make it context-aware:
- Pass current filters to the AI
- Include record counts
- Show department context

The streaming was tricky at first, but I figured out:
```typescript
for await (const part of streamResult.stream) {
  const text = part.text();
  onChunk(text); // Update UI incrementally
}
```

This gives that nice "typing" effect.

## Multi-Tenancy Design

I kept it simple with Zustand:
- One store for org/role state
- Another for data/filters
- Both update instantly without page refresh

The trick was making sure data reloads when department changes:
```typescript
useEffect(() => {
  loadData();
}, [department]);
```

## Performance Optimizations

Things I did to keep it fast:
1. `useMemo` for filtered data - avoids recalculating on every render
2. Virtual scrolling - only renders visible rows
3. Debounced search - waits for user to stop typing
4. Code splitting - Next.js handles this automatically
5. Lazy loading - components load when needed

## Design Decisions

### Color Palette
- Zinc for backgrounds (softer than pure black)
- Blue to Violet gradient for accents
- Kept it consistent throughout

### Animations
- 200-300ms duration (feels snappy)
- ease-out easing (natural deceleration)
- Staggered animations for lists (more engaging)

### Mobile Responsive
- Started mobile-first
- Used Tailwind's responsive prefixes (md:, lg:)
- Tested on actual devices, not just browser resize

## Challenges & Solutions

### Challenge 1: Build Errors
Had some TypeScript errors with hook ordering. Fixed by:
- Moving `useMemo` before `useEffect` that depends on it
- Proper dependency arrays

### Challenge 2: Gemini Streaming
First attempt didn't stream properly. Solution:
- Use `generateContentStream` not `generateContent`
- Iterate with `for await`
- Update state incrementally

### Challenge 3: Virtual Scrolling Performance
Initial implementation was choppy. Fixed by:
- Setting fixed row height (56px)
- Adding overscan (10 rows)
- Using `transform` for positioning (GPU accelerated)

## Code Style Choices

I prefer:
- Descriptive variable names over short ones
- Comments that explain "why" not "what"
- Early returns to reduce nesting
- Extracting complex logic into separate functions

Example:
```typescript
// Bad
const d = data.filter(r => r.s === s && r.y === y);

// Good
const filteredRecords = dataset.filter(record => {
  const stateMatch = record.state === selectedState;
  const yearMatch = record.year === selectedYear;
  return stateMatch && yearMatch;
});
```

## Testing Approach

Manual testing checklist I used:
- [ ] All features work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Keyboard navigation
- [ ] Loading states
- [ ] Error handling

## What I'd Do Differently

If I had more time:
1. Add unit tests (Jest + React Testing Library)
2. E2E tests (Playwright)
3. More sophisticated error boundaries
4. Better loading skeleton states
5. Offline support with service workers
6. More advanced AI features (predictions, anomaly detection)

## Lessons Learned

1. Virtual scrolling is amazing for large datasets
2. Streaming AI responses creates better UX
3. TypeScript catches bugs early
4. Good architecture makes features easier to add
5. Performance optimization should be done early

## Final Thoughts

This was a fun challenge! The requirements pushed me to:
- Think about performance from the start
- Design for scalability
- Focus on user experience
- Write clean, maintainable code

The hardest part was balancing feature completeness with code quality in the time limit. I'm happy with how it turned out!

---

**Time Spent**: ~12 hours total
- Setup & Architecture: 2 hours
- Landing Page: 2 hours
- Dashboard & Virtualization: 3 hours
- AI Integration: 2 hours
- Polish & Testing: 2 hours
- Documentation: 1 hour
