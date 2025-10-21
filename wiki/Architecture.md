# Architecture

This document describes the technical architecture of the Mobile Comparison Site.

## 🏗️ System Overview

The Mobile Comparison Site is a client-side web application with zero backend dependencies. All processing happens in the browser.

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│  ┌───────────────────────────────────────────────┐ │
│  │           Mobile Comparison Site              │ │
│  │  ┌─────────────┐  ┌──────────────┐           │ │
│  │  │   index.html│  │   styles.css │           │ │
│  │  └─────────────┘  └──────────────┘           │ │
│  │  ┌─────────────────────────────────┐          │ │
│  │  │          app.js                 │          │ │
│  │  │  ┌─────────────────────────┐    │          │ │
│  │  │  │   Search Engine         │    │          │ │
│  │  │  │   Data Fetcher          │    │          │ │
│  │  │  │   Spec Parser           │    │          │ │
│  │  │  │   Comparison Engine     │    │          │ │
│  │  │  │   UI Controller         │    │          │ │
│  │  │  └─────────────────────────┘    │          │ │
│  │  └─────────────────────────────────┘          │ │
│  └───────────────────────────────────────────────┘ │
│                      ↕                              │
│              HTTPS (API Calls)                      │
└─────────────────────────────────────────────────────┘
                       ↕
         ┌─────────────────────────┐
         │   Wikipedia API         │
         │   (REST/JSON)           │
         └─────────────────────────┘
```

## 🔧 Technology Stack

### Frontend
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Flexbox, Grid, animations, responsive design
- **JavaScript (ES6+)**: Vanilla JS, no frameworks or libraries

### APIs
- **Wikipedia REST API**: OpenSearch and Parse API
  - OpenSearch: For autocomplete suggestions
  - Parse: For detailed phone specifications

### Hosting
- **GitHub Pages**: Static site hosting with HTTPS
- **CDN**: GitHub's global CDN for fast delivery

## 📁 File Structure

```
mobile-comparison-site-/
├── index.html              # Main HTML - UI structure
├── styles.css              # All styles - responsive design
├── app.js                  # Main application logic
├── SECURITY.md             # Security documentation
├── LICENSE                 # MIT License
├── README.md              # Project documentation
├── assets/                # Static assets
│   └── screenshots/       # Site screenshots
└── wiki/                  # Wiki documentation
    ├── Home.md
    ├── Getting-Started.md
    ├── Architecture.md
    └── ...
```

## 🎯 Core Components

### 1. Search System

**Location**: `app.js` - `searchPhones()`, `setupSearch()`

**Functionality**:
- Debounced search (300ms delay)
- Minimum 2 characters required
- Wikipedia OpenSearch API
- Returns up to 6 suggestions
- Handles errors gracefully

**Flow**:
```
User Input → Debounce (300ms) → API Call → Parse Results → Display Suggestions
```

### 2. Data Fetcher

**Location**: `app.js` - `fetchPhoneData()`

**Functionality**:
- Fetches phone page from Wikipedia
- Uses Parse API with HTML output
- Error handling and retry logic
- Loading state management

**API Call**:
```javascript
GET https://en.wikipedia.org/w/api.php?
  action=parse&
  page={title}&
  format=json&
  origin=*&
  prop=text
```

### 3. Specification Parser

**Location**: `app.js` - `parsePhoneData()`

**Functionality**:
- Parses Wikipedia infobox HTML
- Extracts phone specifications
- Categories: Display, Hardware, Camera, Battery, Connectivity
- Handles missing data gracefully
- Sanitizes all input (XSS prevention)

**Parsing Strategy**:
1. Create DOMParser instance
2. Find infobox table
3. Extract rows (th/td pairs)
4. Categorize specifications
5. Return structured data object

### 4. Comparison Engine

**Location**: `app.js` - `comparePhones()`, `createComparisonTable()`

**Functionality**:
- Compares two phone objects
- Generates comparison table
- Highlights superior specifications
- Generates verdict based on specs

**Comparison Logic**:
- Numeric values: Direct comparison
- Text values: Display both
- Missing values: Indicate as "N/A"

### 5. UI Controller

**Location**: `app.js` - Various UI functions

**Functionality**:
- Manages DOM updates
- Loading states
- Error messages
- Suggestion dropdowns
- Phone detail cards
- Comparison results

## 🔄 Data Flow

### Complete User Flow

```
1. User types in search box
   ↓
2. Debounce timer (300ms)
   ↓
3. Search API call to Wikipedia
   ↓
4. Display suggestions
   ↓
5. User clicks suggestion
   ↓
6. Fetch detailed phone data
   ↓
7. Parse infobox HTML
   ↓
8. Extract and categorize specs
   ↓
9. Display phone details
   ↓
10. If both phones selected → Show comparison
    ↓
11. Generate comparison table
    ↓
12. Calculate and display verdict
```

## 🎨 UI/UX Design

### Design Principles
1. **Mobile-First**: Designed for mobile, enhanced for desktop
2. **Progressive Disclosure**: Show info as needed
3. **Visual Hierarchy**: Important info stands out
4. **Responsive**: Works on all screen sizes
5. **Fast**: Minimal loading, smooth animations

### Responsive Breakpoints
```css
/* Mobile: < 768px */
- Stacked layout
- Full width elements
- Simplified navigation

/* Tablet: 768px - 1024px */
- Side-by-side layout
- Optimized spacing
- Touch-friendly targets

/* Desktop: > 1024px */
- Full side-by-side comparison
- Maximum content width
- Hover interactions
```

## 🔒 Security Architecture

### Defense Layers

1. **Content Security Policy (CSP)**
   - Restricts resource origins
   - Prevents inline script injection
   - Allows only HTTPS resources

2. **Input Sanitization**
   - All user input sanitized
   - Safe DOM manipulation
   - XSS prevention

3. **API Security**
   - Read-only API access
   - No authentication required
   - Public Wikipedia data only

4. **Zero Dependencies**
   - No npm packages
   - No supply chain vulnerabilities
   - Full code control

See [Security Guide](Security-Guide.md) for details.

## 🚀 Performance Optimization

### Strategies

1. **Debouncing**: Reduces API calls
2. **Minimal DOM Updates**: Only update changed elements
3. **CSS Animations**: Hardware-accelerated
4. **No Framework Overhead**: Pure vanilla JS
5. **CDN Delivery**: Fast global delivery via GitHub

### Performance Metrics
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 90+
- Bundle Size: < 50KB total

## 🔌 API Integration

### Wikipedia REST API

**Base URL**: `https://en.wikipedia.org/w/api.php`

**Endpoints Used**:

1. **OpenSearch** (Autocomplete)
   ```
   ?action=opensearch
   &search={query}
   &limit=6
   &namespace=0
   &format=json
   ```

2. **Parse** (Get Content)
   ```
   ?action=parse
   &page={title}
   &format=json
   &prop=text
   ```

**CORS Handling**: `origin=*` parameter

See [API Reference](API-Reference.md) for details.

## 🧪 Testing Strategy

### Manual Testing
- Cross-browser testing
- Responsive design testing
- Search functionality
- Comparison accuracy
- Error handling

### Browser Compatibility
- Chrome/Edge (Chromium): ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## 📦 Deployment

### GitHub Pages Deployment
1. Push to `main` branch
2. GitHub Actions auto-deploys
3. Available at: `https://anacondy.github.io/mobile-comparison-site-/`

### Build Process
- No build step required
- Pure static files
- Direct browser execution

## 🔮 Future Architecture Considerations

### Potential Enhancements
1. **Service Worker**: Offline support
2. **IndexedDB**: Cache phone data
3. **Web Workers**: Background processing
4. **Module System**: Better code organization
5. **TypeScript**: Type safety

### Scalability
- Client-side only: Scales naturally
- Wikipedia API: Rate limits apply
- Could add caching layer if needed

## 🤝 Contributing

See [Contributing Guide](Contributing-Guide.md) for development setup and guidelines.

---

**Have questions about the architecture?** [Open an issue](https://github.com/anacondy/mobile-comparison-site-/issues) for discussion.
