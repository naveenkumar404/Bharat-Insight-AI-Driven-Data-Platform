# My TODO List

## Before Submitting

- [ ] Get Gemini API key from https://makersuite.google.com/app/apikey
- [ ] Add API key to `.env.local`
- [ ] Test everything locally
- [ ] Make sure no console errors
- [ ] Test on mobile (use Chrome DevTools)
- [ ] Run `npm run build` to check for errors
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test deployed version
- [ ] Run Lighthouse audit (aim for 95+)
- [ ] Take screenshots
- [ ] Write submission email
- [ ] Send email to bhanu.mudgal@regrip.in

## Submission Email Template

```
Subject: Frontend Engineering Assignment - [Your Name]

Hi,

I'm submitting my Frontend Engineering Assignment for the Bharat-Insight project.

GitHub: [your-repo-url]
Live Demo: [your-vercel-url]

What I built:
- Analytics dashboard with 100K+ rows (virtualized)
- AI chat with Gemini API (streaming responses)
- Multi-tenant setup (switch departments/roles)
- Command palette (Cmd+K)
- Mobile responsive

Tech: Next.js 14, TypeScript, Tailwind, Framer Motion, TanStack Virtual, Gemini API

Time spent: ~12 hours

Thanks!
[Your Name]
```

## If Something Breaks

**Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Vercel deployment fails:**
- Check environment variables are added
- Make sure repo is public
- Check build logs

**AI not working:**
- Verify API key is correct
- Check it starts with `NEXT_PUBLIC_`
- Restart dev server

## Nice to Have (If Time)

- [ ] Add more chart types
- [ ] Better error messages
- [ ] Loading skeletons
- [ ] Export to CSV
- [ ] More AI features
- [ ] Unit tests

## Notes to Self

- Keep it simple
- Focus on what works
- Don't over-engineer
- Test on real devices
- Check console for errors
- Make sure it's fast

## Deadline

**March 13, 2026 at 11:00 AM**

Don't forget!
