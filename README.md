# 📱 Mobile Comparison Site

A modern, secure web application for comparing smartphones side-by-side with real-time data fetched from Wikipedia.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://anacondy.github.io/mobile-comparison-site-/)

## ✨ Features

- 🔍 **Real-time Search**: Search for any smartphone with autocomplete suggestions
- 📊 **Side-by-Side Comparison**: Compare two phones with detailed specifications
- 🎨 **Modern UI**: Clean, responsive design that works on all devices
- 🔒 **Secure**: Implements security best practices (CSP, XSS prevention, HTTPS)
- 🚀 **Fast**: Zero dependencies, pure vanilla JavaScript
- 📱 **Mobile-Friendly**: Fully responsive design
- 🌐 **Live Data**: Fetches latest phone specs from Wikipedia API

## 🚀 Quick Start

### View Live Site
Visit: [https://anacondy.github.io/mobile-comparison-site-/](https://anacondy.github.io/mobile-comparison-site-/)

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/anacondy/mobile-comparison-site-.git
   cd mobile-comparison-site-
   ```

2. Open in browser:
   - Simply open `index.html` in any modern web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. Navigate to `http://localhost:8000`

## 📖 How to Use

1. **Search for Phones**: Type a phone name in either search box (e.g., "iPhone 15 Pro", "Samsung Galaxy S24")
2. **Select from Suggestions**: Click on a suggestion to load the phone's specifications
3. **Compare**: Once both phones are selected, the comparison table appears automatically
4. **Analyze**: Review the side-by-side comparison and verdict

## 🏗️ Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: Wikipedia REST API
- **Hosting**: GitHub Pages
- **Security**: Content Security Policy, XSS prevention

### File Structure
```
mobile-comparison-site-/
├── index.html              # Main HTML file with CSP headers
├── styles.css              # Modern, responsive CSS styling
├── app.js                  # Application logic and API integration
├── SECURITY.md             # Security documentation and best practices
├── LICENSE                 # MIT License
└── README.md              # This file
```

### Key Components

1. **Search System**: Debounced search with Wikipedia OpenSearch API
2. **Data Fetching**: Asynchronous data loading from Wikipedia
3. **Specification Parser**: Extracts and categorizes phone specs from infobox
4. **Comparison Engine**: Compares specs and determines winners
5. **Responsive UI**: Mobile-first design with smooth animations

## 🔒 Security

This project implements multiple security best practices:

- ✅ **Content Security Policy**: Restricts resource loading
- ✅ **XSS Prevention**: Input sanitization and safe DOM manipulation
- ✅ **HTTPS Only**: All resources loaded over secure connections
- ✅ **No Dependencies**: Zero npm packages = zero supply chain vulnerabilities
- ✅ **No Data Storage**: No cookies, localStorage, or tracking
- ✅ **Safe API Usage**: Read-only Wikipedia API access

For detailed security information, see [SECURITY.md](SECURITY.md)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue describing the bug
2. **Suggest Features**: Open an issue with feature requests
3. **Submit PRs**: Fork the repo, make changes, and submit a pull request

### Development Guidelines
- Keep the code dependency-free
- Maintain security best practices
- Follow existing code style
- Test on multiple browsers
- Ensure mobile responsiveness

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🎯 Roadmap

- [ ] Add more detailed spec comparisons
- [ ] Implement price comparison
- [ ] Add user reviews aggregation
- [ ] Support for tablets and laptops
- [ ] Offline mode with cached data
- [ ] Export comparison as PDF/Image
- [ ] Dark/Light theme toggle

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anuj Meena** ([@anacondy](https://github.com/anacondy))

## 🙏 Acknowledgments

- Wikipedia API for providing phone specifications data
- The open-source community for inspiration

## 📞 Support

If you find this project helpful, please give it a ⭐️!

For issues or questions:
- Open an [Issue](https://github.com/anacondy/mobile-comparison-site-/issues)
- Check existing [Discussions](https://github.com/anacondy/mobile-comparison-site-/discussions)

## 🔧 Troubleshooting

### Site Not Loading Properly?
- Ensure JavaScript is enabled in your browser
- Check browser console for errors
- Try clearing cache and reloading
- Make sure you have an internet connection (for Wikipedia API)

### Comparison Not Showing?
- Make sure both phones are selected
- Verify the phone names exist on Wikipedia
- Check that data loaded successfully for both phones

---

**Built with ❤️ for the open-source community**
