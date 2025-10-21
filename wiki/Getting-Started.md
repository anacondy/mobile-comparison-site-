# Getting Started

Welcome! This guide will help you get up and running with the Mobile Comparison Site.

## 📋 Prerequisites

To use the Mobile Comparison Site, you need:
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (for fetching phone data from Wikipedia)
- JavaScript enabled in your browser

## 🌐 Using the Live Site

The easiest way to use the application is to visit the live site:

**[https://anacondy.github.io/mobile-comparison-site-/](https://anacondy.github.io/mobile-comparison-site-/)**

No installation required!

## 💻 Running Locally

If you want to run the site locally:

### Option 1: Direct File Access
1. Clone the repository:
   ```bash
   git clone https://github.com/anacondy/mobile-comparison-site-.git
   cd mobile-comparison-site-
   ```

2. Open `index.html` in your web browser
   - Simply double-click the file, or
   - Right-click and select "Open with" your browser

### Option 2: Using a Local Server (Recommended)

Using a local server ensures proper CORS handling and mimics production environment.

#### Using Python
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x (if you still have it)
python -m SimpleHTTPServer 8000
```

#### Using Node.js
```bash
# If you have npx installed
npx http-server

# Or install globally
npm install -g http-server
http-server
```

#### Using PHP
```bash
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎯 First Steps

Once the site is loaded:

1. **Search for Phone A**: Type a phone name in the first search box (e.g., "iPhone 15 Pro")
2. **Select from Suggestions**: Click on a suggestion from the dropdown
3. **Search for Phone B**: Type another phone name in the second search box
4. **Compare**: Once both phones are loaded, the comparison table appears automatically
5. **Review Results**: Check the detailed comparison and verdict

## 🔍 Search Tips

- Use specific model names (e.g., "iPhone 15 Pro" not just "iPhone")
- Include manufacturer name for best results (e.g., "Samsung Galaxy S24")
- The search uses Wikipedia data, so use Wikipedia-compatible names
- Minimum 2 characters required to trigger search

## ✅ Verify Installation

After loading the site, you should see:
- ✅ Page loads without errors
- ✅ Two search boxes for Phone A and Phone B
- ✅ No console errors (check browser DevTools)
- ✅ Search suggestions appear when typing
- ✅ Phone details load after selection

## 🐛 Troubleshooting

If something doesn't work:
1. Check the browser console for errors (F12 or Cmd+Option+I)
2. Ensure JavaScript is enabled
3. Check your internet connection
4. Try a different browser
5. See our [Troubleshooting Guide](Troubleshooting.md) for more help

## 📚 Next Steps

- Read the [How to Use](How-to-Use.md) guide for detailed usage instructions
- Check out the [FAQ](FAQ.md) for common questions
- Explore the [Architecture](Architecture.md) to understand how it works

## 🤝 Need Help?

- Check the [FAQ](FAQ.md)
- Read the [Troubleshooting Guide](Troubleshooting.md)
- [Open an issue](https://github.com/anacondy/mobile-comparison-site-/issues)

---

**Ready to dive deeper?** Continue to [How to Use](How-to-Use.md) →
