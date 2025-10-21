# FAQ - Frequently Asked Questions

Get answers to the most common questions about the Mobile Comparison Site.

## 📱 General Questions

### What is the Mobile Comparison Site?
The Mobile Comparison Site is a free, open-source web application that allows you to compare smartphones side-by-side. It fetches real-time data from Wikipedia to show detailed specifications and help you make informed decisions.

### Is it really free?
Yes! The site is completely free to use with no ads, no subscriptions, and no hidden costs. It's open-source under the MIT License.

### Do I need to create an account?
No! The site requires no registration, login, or account creation. Just visit and start comparing phones.

### Does it work on mobile devices?
Absolutely! The site is fully responsive and works great on smartphones, tablets, and desktop computers.

## 🔍 Search & Data Questions

### Where does the data come from?
All phone specifications are fetched in real-time from Wikipedia using their public API. This ensures up-to-date information without maintaining our own database.

### Why can't I find my phone?
The phone might not have a Wikipedia page, or the search term might not match the Wikipedia article title. Try:
- Using the full official model name
- Including the manufacturer name
- Checking Wikipedia directly to find the exact article title

### Is the data accurate?
The data is as accurate as the Wikipedia articles. Wikipedia is generally reliable, but:
- Some specs may be incomplete
- Recently released phones may have limited information
- Always verify critical specs with official sources before purchase

### Can I compare more than two phones?
Currently, the site supports comparing two phones at a time. This keeps the interface clean and comparisons focused.

### Why are some specifications missing?
Some phones may have incomplete Wikipedia articles. If important specs are missing, you can contribute to Wikipedia by adding them!

## 🔒 Privacy & Security Questions

### Do you track my searches?
No! We don't track, store, or analyze your searches. The site doesn't use cookies, localStorage, or any tracking technology.

### Is my data secure?
Your privacy is protected:
- No data collection
- No cookies
- No user tracking
- HTTPS encryption
- Read-only Wikipedia API access

### Do you share my information?
There's nothing to share! We don't collect any personal information or search history.

### Can I use it anonymously?
Yes, you can use the site completely anonymously. No registration or identification required.

## 💻 Technical Questions

### What browsers are supported?
The site works on all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### Do I need JavaScript enabled?
Yes, JavaScript is required for the site to function. It's a client-side application that runs entirely in your browser.

### Can I use it offline?
No, an internet connection is required to fetch phone data from Wikipedia. We may add offline support in the future.

### Does it work with ad blockers?
Yes! Since we don't use ads or tracking, ad blockers won't affect the functionality.

### Why is it so fast?
The site is lightweight with:
- No external dependencies
- Minimal code (< 50KB)
- Efficient API usage
- No server-side processing

## 🔧 Troubleshooting Questions

### The search isn't working. What should I do?
1. Check your internet connection
2. Ensure JavaScript is enabled
3. Try a different search term
4. Clear your browser cache
5. Try a different browser

See [Troubleshooting Guide](Troubleshooting.md) for more help.

### Why is the site loading slowly?
Possible causes:
- Slow internet connection
- Wikipedia API responding slowly
- Browser extensions interfering
- Try refreshing the page

### The comparison isn't showing. Why?
Make sure:
- Both phones are fully loaded
- Both search boxes have selections
- No errors in browser console (F12)
- The phones have Wikipedia pages with infoboxes

### Images aren't loading. Is that normal?
Some phones may not have images on their Wikipedia pages. This is normal and doesn't affect the comparison functionality.

## 🤝 Contributing Questions

### Can I contribute to the project?
Yes! Contributions are welcome. You can:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Share the project

See [Contributing Guide](Contributing-Guide.md) for details.

### How do I report a bug?
1. Check if it's already reported in [Issues](https://github.com/anacondy/mobile-comparison-site-/issues)
2. If not, open a new issue
3. Provide:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### Can I suggest new features?
Absolutely! Open an issue with the "enhancement" label and describe:
- The feature you'd like
- Why it would be useful
- How it might work

### How can I improve the data quality?
Since data comes from Wikipedia, you can:
1. Find the phone's Wikipedia article
2. Edit the article to add/correct specs
3. Follow Wikipedia's editing guidelines
4. Your edits will automatically appear in our site

## 📊 Comparison Questions

### How is the "winner" determined?
The comparison highlights specifications that are objectively better:
- Higher numbers for: RAM, storage, battery, screen size
- Better technology: 5G vs 4G, OLED vs LCD
- More features: more cameras, faster charging

### Does the comparison consider price?
No, the comparison is specification-based only. Price is not included as it varies by region and time.

### Can I share my comparison?
Currently, you can:
- Take a screenshot
- Bookmark the URL (though it won't save selections)
- Share the site link with others

Future updates may add sharing features.

### Why doesn't the comparison consider real-world performance?
The comparison is based on specifications from Wikipedia, not performance benchmarks. Real-world performance depends on:
- Software optimization
- User usage patterns
- App compatibility
- Individual preferences

## 🔮 Future Features Questions

### Will you add price comparison?
It's on the roadmap! However, prices vary significantly by region and time, making it challenging to maintain accurate data.

### Can you add user reviews?
This is being considered. It would require additional infrastructure and moderation, so it's not currently implemented.

### Will there be a mobile app?
The website is fully mobile-responsive and works great on mobile browsers. A native app is not currently planned, but we're open to community contributions.

### Can you support tablets/laptops comparison?
This is on the roadmap! The architecture can support any device with a Wikipedia page.

### Will you add a dark mode?
Yes! Dark mode is on the roadmap and will be added in a future update.

## 📖 Learning Questions

### How does it work technically?
The site:
1. Uses Wikipedia's OpenSearch API for autocomplete
2. Fetches Wikipedia pages using Parse API
3. Extracts specifications from infoboxes
4. Compares and displays data client-side

See [Architecture](Architecture.md) for technical details.

### Can I use this project to learn web development?
Absolutely! The project is designed with clean, readable code and demonstrates:
- Vanilla JavaScript
- API integration
- Responsive design
- Security best practices
- Modern web development

### Where's the source code?
The source code is fully open and available on GitHub:
[https://github.com/anacondy/mobile-comparison-site-](https://github.com/anacondy/mobile-comparison-site-)

### Can I use this code in my own project?
Yes! The project is licensed under the MIT License, which allows you to:
- Use the code commercially
- Modify the code
- Distribute copies
- Use privately

Just keep the original license and copyright notice.

## 💡 Tips & Tricks Questions

### How can I get better search results?
- Use full model names: "iPhone 15 Pro" not "iPhone"
- Include manufacturer: "Samsung Galaxy S24"
- Match Wikipedia article titles
- Try variations if first search doesn't work

### What makes a good comparison?
Compare phones that are:
- Similar price range
- Same generation/year
- Similar target market (flagship vs budget)
- Available in your region

### How often is the data updated?
The data is fetched in real-time from Wikipedia, so it's as current as the Wikipedia articles. If specs change on Wikipedia, they change on our site immediately.

## 🆘 Still Have Questions?

If your question wasn't answered here:

1. Check other wiki pages:
   - [Getting Started](Getting-Started.md)
   - [How to Use](How-to-Use.md)
   - [Troubleshooting](Troubleshooting.md)

2. [Search existing issues](https://github.com/anacondy/mobile-comparison-site-/issues)

3. [Open a new issue](https://github.com/anacondy/mobile-comparison-site-/issues/new)

4. Contact the maintainer via GitHub

---

**Have a question not listed here?** [Suggest adding it to the FAQ](https://github.com/anacondy/mobile-comparison-site-/issues/new?title=FAQ%20Addition)!
