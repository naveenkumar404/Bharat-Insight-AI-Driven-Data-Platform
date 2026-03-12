# Quick Start - Get Running in 5 Minutes

Alright, let's get this thing running on your machine!

## Step 1: Install Dependencies (2 min)

```bash
npm install
```

Grab a coffee while npm does its thing.

## Step 2: Setup Your API Key (1 min)

```bash
# Copy the example file
cp .env.example .env.local
```

Now open `.env.local` and add your Gemini API key:

```
NEXT_PUBLIC_GEMINI_API_KEY=paste_your_key_here
```

**Where to get the key?**
Go to https://makersuite.google.com/app/apikey and create one. It's free!

## Step 3: Fire It Up (1 min)

```bash
npm run dev
```

Wait for it to compile, then open http://localhost:3000

## Step 4: Test It Out (1 min)

Try these things:

1. **Landing Page**: Should see animated charts and stuff
2. **Dashboard**: Click "Launch Dashboard" button
3. **Data Grid**: Should load 100,000 rows (might take a sec)
4. **Search**: Type something in the search box
5. **Filters**: Try the state and year dropdowns
6. **AI Chat**: Ask it "What insights can you provide?" (needs API key)
7. **Command Palette**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
8. **Switch Stuff**: Try changing departments and roles

## That's It! 🎉

You're running locally now. Here's what you can do next:

### Want to Deploy?

```bash
npm i -g vercel
vercel login
vercel --prod
```

Boom. Your site is live.

### Want to Modify?

- Components are in `components/`
- Styles in `app/globals.css`
- Business logic in `lib/`

### Having Issues?

**Port 3000 already in use?**
```bash
# Kill whatever's using it
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

**npm install fails?**
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**AI not working?**
- Make sure you added the API key to `.env.local`
- Restart the dev server after adding env variables
- Check browser console for errors

**Build fails?**
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

## Quick Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check for issues
```

## Need More Help?

Check out:
- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `DEPLOYMENT_GUIDE.md` - How to deploy
- Browser console - Usually shows what's wrong

---

That's all you need to get started. Have fun! 🚀
