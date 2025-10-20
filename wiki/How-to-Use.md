# How to Use the Mobile Comparison Site

This guide provides detailed instructions on how to use all features of the Mobile Comparison Site.

## 🔍 Searching for Phones

### Basic Search
1. Click on either search box (Phone A or Phone B)
2. Start typing the phone name
3. Wait for suggestions to appear (appears after 2+ characters)
4. Click on a suggestion to select it

### Search Tips
- **Be Specific**: Use full model names (e.g., "iPhone 15 Pro Max" instead of just "iPhone")
- **Include Manufacturer**: Better results with "Samsung Galaxy S24 Ultra"
- **Use Wikipedia Names**: The app uses Wikipedia data, so use Wikipedia-compatible names
- **Autocomplete**: The search provides up to 6 suggestions
- **Debounced Search**: Search waits 300ms after you stop typing to reduce API calls

### Common Phone Search Examples
- ✅ "iPhone 15 Pro"
- ✅ "Samsung Galaxy S24 Ultra"
- ✅ "Google Pixel 8 Pro"
- ✅ "OnePlus 12"
- ✅ "Xiaomi 14 Pro"
- ❌ "new iPhone" (too vague)
- ❌ "Samsung phone" (not specific)

## 📱 Viewing Phone Details

After selecting a phone, you'll see:

### Phone Information Card
- **Phone Name**: Official model name
- **Image**: Phone image from Wikipedia (if available)
- **Specifications**: Categorized by:
  - 📺 Display
  - ⚙️ Hardware
  - 📷 Camera
  - 🔋 Battery
  - 📡 Connectivity
  - 📦 Other specs

### Specification Categories

#### Display
- Screen size
- Resolution
- Screen type (OLED, LCD, etc.)
- Refresh rate
- Pixel density

#### Hardware
- Processor (chipset)
- RAM
- Storage options
- Operating system
- GPU

#### Camera
- Main camera specs
- Front camera
- Video recording capabilities
- Camera features

#### Battery
- Battery capacity (mAh)
- Charging speed
- Wireless charging
- Battery life

#### Connectivity
- Network support (4G, 5G)
- WiFi
- Bluetooth
- NFC
- USB type

## 📊 Comparing Phones

### How Comparison Works
1. Select **Phone A** from the first search box
2. Select **Phone B** from the second search box
3. Comparison table appears automatically
4. Shows side-by-side specifications
5. Highlights winners in each category

### Comparison Features
- **Side-by-Side View**: All specs displayed in parallel
- **Winner Highlighting**: Better specs are highlighted
- **Verdict Section**: Overall comparison summary
- **Category Grouping**: Specs organized by category

### Understanding the Verdict
The verdict analyzes:
- Display quality
- Performance (processor, RAM)
- Camera capabilities
- Battery capacity
- Overall value proposition

## 🎨 User Interface Features

### Responsive Design
- **Desktop**: Full side-by-side layout
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Stacked layout for small screens

### Visual Feedback
- **Loading Indicators**: Shows when fetching data
- **Error Messages**: Clear error messages if something goes wrong
- **Hover Effects**: Interactive elements have hover states
- **Smooth Animations**: Transitions for better UX

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Semantic HTML
- **High Contrast**: Readable text and colors
- **Focus Indicators**: Clear focus states

## 🔄 Changing Selections

To compare different phones:
1. Clear the current selection by typing a new search
2. Select a different phone from suggestions
3. The comparison updates automatically

## 💡 Pro Tips

1. **Bookmark Favorites**: Bookmark the site for quick access
2. **Try Different Combinations**: Compare phones from different manufacturers
3. **Check Multiple Specs**: Don't rely on just one specification
4. **Consider Your Needs**: The "best" phone depends on your requirements
5. **Use Latest Models**: Search for current year models for most accurate data
6. **Compare Same Generation**: Compare phones from similar time periods

## 📸 Taking Screenshots

To save comparison results:
1. Use your browser's screenshot tool (Cmd+Shift+4 on Mac, PrtScn on Windows)
2. Or use browser extensions for full-page screenshots
3. Share with friends or save for reference

## 🔒 Privacy & Data

- **No Tracking**: The site doesn't track your usage
- **No Cookies**: No cookies stored
- **No Accounts**: No login required
- **No Storage**: Search history not saved
- **Safe**: All data from Wikipedia (read-only)

## ⚠️ Limitations

### Data Accuracy
- Data is sourced from Wikipedia
- Accuracy depends on Wikipedia content
- Some specs may be incomplete
- Recently released phones may have limited data

### Comparison Limitations
- Only compares specifications, not real-world performance
- Doesn't include pricing information
- Doesn't include user reviews
- Limited to phones with Wikipedia pages

## 🐛 Known Issues

If you encounter issues:
1. **No Search Results**: Try a different search term
2. **Missing Specs**: Wikipedia page may lack information
3. **Slow Loading**: Check internet connection
4. **Images Not Loading**: Some phones may not have images on Wikipedia

See [Troubleshooting Guide](Troubleshooting.md) for more help.

## 📚 Learn More

- [Architecture](Architecture.md): How it works under the hood
- [API Reference](API-Reference.md): Wikipedia API details
- [FAQ](FAQ.md): Common questions

---

**Have questions?** Check the [FAQ](FAQ.md) or [open an issue](https://github.com/anacondy/mobile-comparison-site-/issues).
