# Troubleshooting Guide

This guide helps you resolve common issues with the Mobile Comparison Site.

## 🔍 Diagnostic Steps

Before diving into specific issues, try these general troubleshooting steps:

### 1. Check the Basics
- ✅ Internet connection working?
- ✅ JavaScript enabled in browser?
- ✅ Using a modern browser?
- ✅ No browser extensions blocking scripts?

### 2. Quick Fixes
1. **Hard Refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear Cache**: Clear browser cache and reload
3. **Different Browser**: Try another browser
4. **Incognito Mode**: Test in private/incognito mode

### 3. Check Browser Console
1. Open Developer Tools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Look for error messages (red text)
4. Screenshot and report errors

## 🐛 Common Issues & Solutions

### Search Issues

#### Search Not Working / No Suggestions Appearing

**Symptoms**: Typing in search box shows no suggestions.

**Possible Causes & Solutions**:

1. **Internet Connection**
   - Check your connection
   - Try loading Wikipedia.org
   - Test: `ping en.wikipedia.org`

2. **JavaScript Disabled**
   - Enable JavaScript in browser settings
   - Chrome: Settings → Privacy and security → Site settings → JavaScript
   - Firefox: about:config → javascript.enabled → true

3. **Minimum Characters**
   - You need at least 2 characters to trigger search
   - Try typing more characters

4. **Wikipedia API Down**
   - Check [Wikipedia Status](https://www.wikipediastatus.com/)
   - Wait a few minutes and retry

5. **Browser Console Errors**
   ```
   F12 → Console tab → Look for errors
   Common errors:
   - CORS errors: Usually temporary
   - Network errors: Check connection
   - 429 errors: Rate limiting, wait 1 minute
   ```

**Solution Steps**:
```bash
1. Check console (F12) for errors
2. Try hard refresh (Ctrl+Shift+R)
3. Test with "iPhone 15 Pro" as search
4. Try different browser
5. Check internet connection
```

#### Search Results Not Relevant

**Symptoms**: Search shows irrelevant suggestions.

**Solutions**:
- Use more specific terms
- Include manufacturer name
- Use full model name
- Try the exact Wikipedia article title

**Examples**:
- ❌ "Samsung" → Too broad
- ✅ "Samsung Galaxy S24 Ultra" → Specific

### Phone Data Issues

#### Phone Details Not Loading

**Symptoms**: Selected phone doesn't show details.

**Possible Causes & Solutions**:

1. **Wikipedia Page Doesn't Exist**
   - Verify the page exists on Wikipedia
   - Try accessing: `https://en.wikipedia.org/wiki/[Phone_Name]`

2. **Page Has No Infobox**
   - Some pages lack specification infoboxes
   - Try a different phone model

3. **Loading Timeout**
   - Wait longer (up to 10 seconds)
   - Check loading indicator
   - Retry selection

4. **API Error**
   - Check browser console
   - Look for error messages
   - Try again in a minute

**Solution Steps**:
```
1. Verify phone has Wikipedia page
2. Check page has infobox with specs
3. Wait for loading to complete
4. Try selecting again
5. Try different phone if issue persists
```

#### Missing Specifications

**Symptoms**: Phone loads but many specs are missing.

**Causes**:
- Wikipedia page has incomplete information
- Infobox doesn't contain all specs
- Specs not in standard format

**Solutions**:
1. **Verify on Wikipedia**: Check if specs exist on Wikipedia page
2. **Different Source**: Try official manufacturer website
3. **Contribute**: Add specs to Wikipedia (if you have them)

#### Images Not Loading

**Symptoms**: Phone details show but no image.

**Causes**:
- Wikipedia page has no image
- Image failed to load
- Content Security Policy blocking

**Solutions**:
- This is usually normal (not all pages have images)
- Specs still work without images
- Images are cosmetic, not functional

### Comparison Issues

#### Comparison Not Showing

**Symptoms**: Both phones loaded but no comparison table.

**Checklist**:
- [ ] Both phones fully loaded?
- [ ] Both have green checkmarks?
- [ ] No errors in console?
- [ ] Scrolled down to see comparison section?

**Solutions**:
1. **Ensure Both Loaded**: Wait for both phones to finish loading
2. **Scroll Down**: Comparison appears below phone details
3. **Reload Page**: Try hard refresh
4. **Check Console**: Look for JavaScript errors

#### Comparison Shows Errors

**Symptoms**: Comparison table has errors or "undefined".

**Solutions**:
1. Reload both phones
2. Try different phone models
3. Check browser console for errors
4. Report issue with specific phone models

### Performance Issues

#### Site Loading Slowly

**Symptoms**: Everything is slow and laggy.

**Possible Causes**:

1. **Slow Internet**
   - Test your connection speed
   - Close other bandwidth-heavy apps
   - Try again when connection is better

2. **Wikipedia API Slow**
   - Usually temporary
   - Wait a few minutes
   - Try during off-peak hours

3. **Browser Resources**
   - Close unnecessary tabs
   - Restart browser
   - Clear cache and cookies
   - Update browser

4. **Old Device**
   - Site requires modern browser
   - Try on different device
   - Close other applications

**Solution Steps**:
```
1. Test internet speed
2. Close unnecessary tabs
3. Clear browser cache
4. Restart browser
5. Try incognito mode
```

#### Search Feels Slow

**Symptoms**: Delay between typing and suggestions.

**Explanation**: This is intentional!
- 300ms debounce delay to avoid API spam
- Reduces unnecessary API calls
- Improves overall performance

**Normal Behavior**: Wait ~300ms after typing stops

### Browser-Specific Issues

#### Chrome/Edge Issues

**Common Problems**:
1. **Extensions Blocking**: Disable extensions one by one
2. **Hardware Acceleration**: Try disabling in settings
3. **Cache Issues**: Clear site data in DevTools

**Solutions**:
```
1. Settings → Privacy → Clear browsing data
2. Settings → Advanced → Reset settings
3. Try incognito mode
```

#### Firefox Issues

**Common Problems**:
1. **Tracking Protection**: May block API calls
2. **Content Blocking**: Check settings
3. **Extensions**: Disable NoScript, uBlock

**Solutions**:
```
1. Click shield icon in address bar
2. Disable tracking protection for this site
3. Reload page
```

#### Safari Issues

**Common Problems**:
1. **Intelligent Tracking Prevention**: May cause issues
2. **Cross-Site Tracking**: Settings may interfere

**Solutions**:
```
1. Safari → Preferences → Privacy
2. Temporarily disable "Prevent cross-site tracking"
3. Reload page
4. Re-enable after testing
```

### Mobile Browser Issues

#### Mobile Safari (iOS)

**Common Problems**:
- Touch targets too small
- Keyboard covering inputs
- Zoom issues

**Solutions**:
1. Use landscape mode for better layout
2. Manually adjust zoom (pinch to zoom)
3. Scroll after keyboard appears
4. Update to latest iOS

#### Chrome Android

**Common Problems**:
- Similar to desktop Chrome
- Data saver mode interfering

**Solutions**:
1. Settings → Data Saver → Disable temporarily
2. Clear Chrome cache
3. Update Chrome

### Error Messages

#### "Failed to fetch suggestions"

**Meaning**: Can't reach Wikipedia API

**Solutions**:
1. Check internet connection
2. Check if Wikipedia.org is accessible
3. Wait 1 minute and retry
4. Try different network (mobile data vs WiFi)

#### "Failed to fetch phone data"

**Meaning**: Can't load phone specifications

**Solutions**:
1. Verify phone name on Wikipedia
2. Try different phone
3. Check console for specific error
4. Wait and retry

#### "Phone not found"

**Meaning**: Wikipedia page doesn't exist or isn't accessible

**Solutions**:
1. Verify Wikipedia page exists
2. Try different search terms
3. Use exact Wikipedia article title

### Network Issues

#### CORS Errors

**Symptoms**: Console shows CORS-related errors

**Explanation**: Wikipedia API should allow cross-origin requests

**Solutions**:
1. Usually temporary - retry
2. Check if using HTTPS (not HTTP)
3. Check if Wikipedia API is down
4. Try different network

#### Rate Limiting (429 Errors)

**Symptoms**: "Too many requests" error

**Explanation**: Wikipedia API rate limit reached

**Solutions**:
1. Wait 1-2 minutes
2. Reduce search frequency
3. Debouncing should prevent this
4. Contact us if persistent

### Display Issues

#### Layout Broken

**Symptoms**: Elements overlapping or misaligned

**Solutions**:
1. Hard refresh (Ctrl+Shift+R)
2. Clear cache
3. Check browser zoom level (should be 100%)
4. Try different browser
5. Check for CSS loading errors

#### Responsive Issues on Mobile

**Symptoms**: Layout doesn't fit mobile screen

**Solutions**:
1. Try landscape mode
2. Refresh page
3. Clear mobile browser cache
4. Update browser app

## 🛠️ Advanced Troubleshooting

### Developer Tools Investigation

#### Network Tab Analysis
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check for:
   - Failed requests (red)
   - 404 errors (resources not found)
   - 429 errors (rate limiting)
   - CORS errors

#### Console Tab Analysis
1. Open DevTools (F12)
2. Go to Console tab
3. Look for:
   - JavaScript errors (red)
   - Warning messages (yellow)
   - CSP violations
   - Network failures

#### Application Tab Analysis
1. Check if site data is stored (shouldn't be)
2. Verify no cookies (shouldn't be any)
3. Check for service workers (shouldn't be any)

### Testing in Clean Environment

#### Incognito/Private Mode
```
1. Open incognito/private window
2. Navigate to site
3. Test functionality
4. If works, issue is likely:
   - Extension conflict
   - Cached data
   - Cookie issue
```

#### Different Network
```
1. Try mobile data vs WiFi
2. Try different WiFi network
3. If works on one but not other:
   - Network restrictions
   - Firewall issues
   - Proxy problems
```

## 📝 Reporting Issues

If you can't resolve your issue, please report it:

### Information to Include

1. **Environment**:
   - Browser name and version
   - Operating system
   - Device type (desktop/mobile)

2. **Issue Description**:
   - What you were trying to do
   - What happened instead
   - Expected behavior

3. **Steps to Reproduce**:
   ```
   1. Step one
   2. Step two
   3. Error occurs
   ```

4. **Screenshots**:
   - Screenshot of issue
   - Browser console (F12)
   - Network tab if relevant

5. **Console Output**:
   ```
   Copy any error messages from console
   ```

### Where to Report

- **GitHub Issues**: [Open an issue](https://github.com/anacondy/mobile-comparison-site-/issues/new)
- **Template**: Use bug report template
- **Search First**: Check if already reported

## 🔮 Known Limitations

These are not bugs, but current limitations:

1. **Only Two Phones**: Can only compare two phones at a time
2. **Wikipedia Dependency**: Limited to phones with Wikipedia pages
3. **Incomplete Data**: Some phones have incomplete specs on Wikipedia
4. **No Pricing**: Price information not included
5. **No Offline Mode**: Requires internet connection
6. **English Only**: Currently supports English Wikipedia only

## 📚 Additional Resources

- [FAQ](FAQ.md) - Frequently Asked Questions
- [How to Use](How-to-Use.md) - Detailed usage guide
- [Architecture](Architecture.md) - Technical details
- [GitHub Issues](https://github.com/anacondy/mobile-comparison-site-/issues) - Known issues

---

**Still having issues?** [Open a GitHub issue](https://github.com/anacondy/mobile-comparison-site-/issues/new) with details!
