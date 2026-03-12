# How to Submit This Project

Quick guide to get this submitted before the deadline.

## Step 1: Test Locally (10 min)

```bash
# Make sure everything works
npm run dev
```

Open http://localhost:3000 and test:
- Landing page loads
- Dashboard works
- Search works
- AI chat works (if you added API key)
- No errors in console

## Step 2: Push to GitHub (5 min)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Complete Bharat Insight platform for Regrip assignment"

# Create repo on GitHub (make it PUBLIC!)
# Then:
git remote add origin https://github.com/yourusername/bharat-insight.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (10 min)

**Option A: Using CLI (Faster)**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B: Using Dashboard**
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_GEMINI_API_KEY` = your key
4. Click Deploy
5. Wait 2-3 minutes

## Step 4: Test Deployed Site (5 min)

Open your Vercel URL and test everything again:
- [ ] Landing page works
- [ ] Dashboard loads
- [ ] Data grid works
- [ ] AI chat works
- [ ] Mobile responsive
- [ ] No errors

## Step 5: Run Lighthouse (5 min)

1. Open deployed site in Chrome
2. Press F12 (DevTools)
3. Go to Lighthouse tab
4. Click "Analyze page load"
5. Check scores (aim for 95+)

## Step 6: Send Email (5 min)

**To:** bhanu.mudgal@regrip.in

**Subject:** Frontend Engineering Assignment - [Your Name]

**Body:**
```
Hi,

I'm submitting my Frontend Engineering Assignment.

GitHub: [paste your repo URL]
Live Demo: [paste your Vercel URL]

Key features:
- 100K+ rows with virtual scrolling
- AI chat with Gemini API
- Multi-tenant architecture
- Command palette (Cmd+K)
- Mobile responsive

Tech stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

Thanks for the opportunity!

[Your Name]
[Your Email]
[Your Phone]
```

## Step 7: Double Check

Before hitting send:
- [ ] GitHub repo is PUBLIC
- [ ] Vercel site is accessible
- [ ] Both URLs work
- [ ] Email has both URLs
- [ ] No typos in email
- [ ] Sent to correct email address

## Deadline

**March 13, 2026 at 11:00 AM**

Set an alarm! Don't submit at 10:59 AM - give yourself buffer time.

## If Something Goes Wrong

**GitHub push fails:**
```bash
git remote -v  # Check remote URL
git push -f origin main  # Force push if needed
```

**Vercel deployment fails:**
- Check build logs
- Make sure environment variables are added
- Try redeploying

**Email bounces:**
- Check email address: bhanu.mudgal@regrip.in
- Try from different email client
- Check spam folder for bounce message

## Emergency Contacts

If you're stuck:
1. Check browser console
2. Check terminal output
3. Google the error message
4. Check Vercel deployment logs

---

Good luck! You got this! 🚀
