# Bharat Insight - My Take on AI-Driven Analytics

> Hey! I'm Naveen Kumar and this is my submission for the Regrip India Frontend Assignment.
> 
> I spent the last 48 hours building this analytics platform, and I'm pretty excited about how it turned out. Let me walk you through what I built and why I made certain decisions.

## What I Built

This is a data analytics platform that can handle massive datasets (100K+ rows) with AI-powered insights. Think of it as a tool for government departments to analyze public data efficiently.

## Getting Started (The Quick Way)

```bash
# Install stuff
npm install

# Add your Gemini API key to .env.local
cp .env.example .env.local
# Edit .env.local and paste your key

# Fire it up
npm run dev
```

Open http://localhost:3000 and you should see the landing page.

## My Implementation Approach

### 1. How I Handled the Data

The 100K rows requirement was interesting. Here's what I did:

**Virtual Scrolling**: Instead of rendering all 100,000 rows (which would crash the browser), I used TanStack Virtual. It only renders what's visible on screen - usually about 20-30 rows. This keeps everything smooth.

**Filtering**: I went with client-side filtering because:
- It's instant (no API calls)
- Works great for 100K rows
- Simple to implement

**Data Structure**: Each record has:
- State (Indian states)
- Year (2018-2024)
- Value (random for now, but ready for real data)
- Category (Healthcare or Agriculture)
- Status (Active/Pending/Completed)

### 2. Design Choices

I went with a dark theme because:
1. It looks modern
2. Easier on the eyes for long sessions
3. Makes the data pop

**Colors I picked**:
- Zinc shades for backgrounds (softer than pure black)
- Blue-to-violet gradient for important stuff
- Green/yellow/red for status indicators

**Fonts**: Stuck with Inter because it's clean and readable.

### 3. The Virtualization Thing

This was the trickiest part. Here's how it works:

```typescript
const virtualizer = useVirtualizer({
  count: 100000,           // Total rows
  estimateSize: () => 56,  // Each row is 56px
  overscan: 10,            // Render 10 extra rows for smooth scrolling
});
```

The magic: Only visible rows exist in the DOM. Scroll down? Old rows get removed, new ones get added. Feels like all 100K are there, but actually only ~30 exist at any time.

### 4. Multi-Tenant Setup

I used Zustand for state management (it's lighter than Redux):

**Department Switching**: 
- Click dropdown → state updates → data reloads
- No page refresh needed
- Instant UI updates

**Role-Based Access**:
- Admin: Can see Edit/Delete buttons
- Viewer: Read-only mode
- Just a simple if statement: `{role === 'admin' && <EditButton />}`

### 5. AI Integration (The Fun Part)

I integrated Google's Gemini API with streaming responses:

**How it works**:
1. You ask a question
2. I send your question + current filter context to Gemini
3. Response streams back token-by-token (that typing effect)
4. Shows "Thinking..." while processing

**Context I send to AI**:
- Current department
- Total records
- Filtered records
- Active filters (search, state, year)

This makes the AI actually useful - it knows what data you're looking at.

## Tech Stack (What I Used)

- **Next.js 14**: Because it's fast and has great DX
- **TypeScript**: Catches bugs before they happen
- **Tailwind**: I can style faster with utility classes
- **Framer Motion**: For smooth animations
- **Zustand**: Lightweight state management
- **TanStack Virtual**: For the virtualization magic
- **Gemini API**: For AI features

## Project Structure (How I Organized Things)

```
bharat-insight/
├── app/                    # Pages
├── components/             # UI components
│   ├── landing/           # Landing page stuff
│   └── dashboard/         # Dashboard components
├── lib/                   # Business logic
│   ├── dataService.ts    # Data handling
│   └── geminiService.ts  # AI integration
├── store/                 # Global state
└── public/                # Static files
```

I like keeping things organized - makes it easier to find stuff later.

## Features I'm Proud Of

**100K rows** - Smooth scrolling, no lag
**AI Chat** - Actually understands your data context
**Cmd+K** - Quick command palette (try it!)
**Mobile Responsive** - Works on phones too
**Keyboard Navigation** - Arrow keys work in the grid
**Loading States** - No awkward blank screens

## What I'd Do With More Time

If I had another week:
- Add unit tests (Jest + React Testing Library)
- More chart types (bar, pie, line)
- Export to Excel/PDF
- Real-time collaboration
- More AI features (predictions, anomaly detection)
- Better error handling
- Offline mode with service workers

## Performance Notes

**Lighthouse Scores** (what I'm aiming for):
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 90+

**How I optimized**:
- Virtual scrolling (biggest win)
- Code splitting (Next.js does this automatically)
- Memoized computations (useMemo for filtered data)
- Lazy loading components
- Optimized images (if I had any)

## Deployment

I set this up for Vercel because it's the easiest:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Done. Your site is live.

## Environment Variables You Need

Create a `.env.local` file:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

Get your Gemini key from: https://makersuite.google.com/app/apikey

Supabase is optional (for auth):
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Challenges I Faced

**Challenge 1: Virtual Scrolling**
First time using TanStack Virtual. Took me a while to understand the positioning logic. The trick was using `transform: translateY()` instead of `top` for better performance.

**Challenge 2: AI Streaming**
Getting the streaming to work smoothly was tricky. Had to use `for await` loop and update state incrementally.

**Challenge 3: TypeScript Errors**
Had some issues with hook dependencies. Fixed by reordering hooks and being more careful with dependency arrays.

## Testing Checklist

What I tested:
- [x] Landing page loads and looks good
- [x] Dashboard loads 100K rows smoothly
- [x] Search works instantly
- [x] Filters work (state, year)
- [x] Department switching works
- [x] Role switching shows/hides buttons
- [x] AI chat responds (with API key)
- [x] Cmd+K opens command palette
- [x] Mobile responsive
- [x] No console errors

## Development Time

Total: ~12 hours
- Setup: 1 hour
- Landing page: 2 hours
- Dashboard + virtualization: 4 hours
- AI integration: 2 hours
- Polish + testing: 2 hours
- Documentation: 1 hour

## Final Thoughts

This was a fun challenge! The 48-hour time limit pushed me to make quick decisions and focus on what matters. I'm happy with the result - it's clean, performant, and actually useful.

The hardest part was balancing feature completeness with code quality. I could've added more features, but I wanted to make sure what I built actually works well.

Thanks for checking out my project!

---

**Built by [Naveen Kumar]**
**For Regrip India Frontend Engineering Assignment**
**March 2026**
