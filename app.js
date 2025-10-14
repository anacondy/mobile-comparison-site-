// Mobile Comparison Site - Application Logic
// Secure, standalone JavaScript without external dependencies

const WIKI_API = 'https://en.wikipedia.org/w/api.php';

// Global state
const state = {
    phoneA: null,
    phoneB: null,
    searchTimeoutA: null,
    searchTimeoutB: null
};

// Security: Sanitize HTML to prevent XSS attacks
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Show/hide loading indicator
function setLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'block' : 'none';
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Wikipedia API: Search for phones
async function searchPhones(query) {
    try {
        const params = new URLSearchParams({
            action: 'opensearch',
            search: query,
            limit: 6,
            namespace: 0,
            format: 'json',
            origin: '*'
        });

        const response = await fetch(`${WIKI_API}?${params}`);
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        
        const data = await response.json();
        return data[1].map(title => ({ title }));
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

// Wikipedia API: Fetch phone data by title
async function fetchPhoneData(title) {
    try {
        const params = new URLSearchParams({
            action: 'parse',
            page: title,
            format: 'json',
            origin: '*',
            prop: 'text'
        });

        const response = await fetch(`${WIKI_API}?${params}`);
        if (!response.ok) throw new Error('Failed to fetch phone data');
        
        const data = await response.json();
        if (data.error) throw new Error(data.error.info);
        
        const html = data.parse.text['*'];
        return parsePhoneData(html, title);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Parse phone specifications from Wikipedia infobox
function parsePhoneData(html, title) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find infobox
    const infobox = doc.querySelector('.infobox') || doc.querySelector('table.infobox');
    const specs = {
        name: title,
        display: {},
        hardware: {},
        camera: {},
        battery: {},
        connectivity: {},
        other: {}
    };

    if (!infobox) return specs;

    // Parse table rows
    const rows = infobox.querySelectorAll('tr');
    rows.forEach(row => {
        const header = row.querySelector('th');
        const data = row.querySelector('td');
        
        if (header && data) {
            const key = header.textContent.trim().toLowerCase();
            const value = data.textContent.trim();
            
            // Categorize specifications
            if (key.includes('display') || key.includes('screen') || key.includes('resolution')) {
                specs.display[key] = value;
            } else if (key.includes('cpu') || key.includes('processor') || key.includes('chipset') || 
                       key.includes('ram') || key.includes('memory') || key.includes('storage')) {
                specs.hardware[key] = value;
            } else if (key.includes('camera') || key.includes('video')) {
                specs.camera[key] = value;
            } else if (key.includes('battery') || key.includes('charging')) {
                specs.battery[key] = value;
            } else if (key.includes('network') || key.includes('connectivity') || key.includes('wifi') || 
                       key.includes('bluetooth') || key.includes('usb')) {
                specs.connectivity[key] = value;
            } else {
                specs.other[key] = value;
            }
        }
    });

    return specs;
}

// Render phone specifications
function renderPhoneSpecs(specs, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const sections = [
        { title: 'Display', data: specs.display },
        { title: 'Hardware', data: specs.hardware },
        { title: 'Camera', data: specs.camera },
        { title: 'Battery', data: specs.battery },
        { title: 'Connectivity', data: specs.connectivity },
        { title: 'Other', data: specs.other }
    ];

    sections.forEach(section => {
        const entries = Object.entries(section.data);
        if (entries.length === 0) return;

        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'spec-section';
        
        const heading = document.createElement('h3');
        heading.textContent = section.title;
        sectionDiv.appendChild(heading);

        entries.forEach(([key, value]) => {
            if (!value) return;
            
            const item = document.createElement('div');
            item.className = 'spec-item';
            
            const label = document.createElement('div');
            label.className = 'spec-label';
            label.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            
            const valueDiv = document.createElement('div');
            valueDiv.className = 'spec-value';
            valueDiv.textContent = sanitizeHTML(value);
            
            item.appendChild(label);
            item.appendChild(valueDiv);
            sectionDiv.appendChild(item);
        });

        container.appendChild(sectionDiv);
    });
}

// Compare two phones
function comparePhones() {
    if (!state.phoneA || !state.phoneB) return;

    const resultsDiv = document.getElementById('comparison-results');
    const tableDiv = document.getElementById('comparison-table');
    const verdictDiv = document.getElementById('verdict');
    
    resultsDiv.style.display = 'block';
    
    // Build comparison table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Header
    const headerRow = document.createElement('tr');
    ['Specification', state.phoneA.name, state.phoneB.name, 'Winner'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // Compare each category
    const categories = ['display', 'hardware', 'camera', 'battery', 'connectivity'];
    let scoreA = 0;
    let scoreB = 0;
    
    categories.forEach(category => {
        const specsA = Object.entries(state.phoneA[category]);
        const specsB = Object.entries(state.phoneB[category]);
        
        // Get all unique keys
        const allKeys = new Set([
            ...specsA.map(([k]) => k),
            ...specsB.map(([k]) => k)
        ]);
        
        allKeys.forEach(key => {
            const valueA = state.phoneA[category][key] || 'N/A';
            const valueB = state.phoneB[category][key] || 'N/A';
            
            const row = document.createElement('tr');
            
            // Spec name
            const specCell = document.createElement('td');
            specCell.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            row.appendChild(specCell);
            
            // Phone A value
            const cellA = document.createElement('td');
            cellA.textContent = valueA;
            row.appendChild(cellA);
            
            // Phone B value
            const cellB = document.createElement('td');
            cellB.textContent = valueB;
            row.appendChild(cellB);
            
            // Winner
            const winnerCell = document.createElement('td');
            if (valueA === 'N/A' && valueB === 'N/A') {
                winnerCell.textContent = 'N/A';
                winnerCell.className = 'tie';
            } else if (valueA === 'N/A') {
                winnerCell.textContent = 'Phone B';
                winnerCell.className = 'winner';
                scoreB++;
            } else if (valueB === 'N/A') {
                winnerCell.textContent = 'Phone A';
                winnerCell.className = 'winner';
                scoreA++;
            } else {
                winnerCell.textContent = 'Tie';
                winnerCell.className = 'tie';
            }
            row.appendChild(winnerCell);
            
            tbody.appendChild(row);
        });
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    tableDiv.innerHTML = '';
    tableDiv.appendChild(table);
    
    // Generate verdict
    let verdict = '';
    if (scoreA > scoreB) {
        verdict = `🏆 ${state.phoneA.name} wins with ${scoreA} advantages over ${scoreB}!`;
    } else if (scoreB > scoreA) {
        verdict = `🏆 ${state.phoneB.name} wins with ${scoreB} advantages over ${scoreA}!`;
    } else {
        verdict = `🤝 It's a tie! Both phones have comparable specifications.`;
    }
    
    verdictDiv.innerHTML = `<h3>Verdict</h3><p>${verdict}</p>`;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Handle search input with debouncing
function handleSearch(which) {
    const input = document.getElementById(`search${which}`);
    const suggestionsDiv = document.getElementById(`suggestions${which}`);
    
    input.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        
        // Clear previous timeout
        if (state[`searchTimeout${which}`]) {
            clearTimeout(state[`searchTimeout${which}`]);
        }
        
        if (query.length < 2) {
            suggestionsDiv.classList.remove('show');
            suggestionsDiv.innerHTML = '';
            return;
        }
        
        // Debounce search
        state[`searchTimeout${which}`] = setTimeout(async () => {
            const results = await searchPhones(query);
            
            if (results.length === 0) {
                suggestionsDiv.classList.remove('show');
                return;
            }
            
            suggestionsDiv.innerHTML = '';
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = result.title;
                item.addEventListener('click', () => selectPhone(which, result.title));
                suggestionsDiv.appendChild(item);
            });
            
            suggestionsDiv.classList.add('show');
        }, 300);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!suggestionsDiv.contains(e.target) && e.target !== input) {
            suggestionsDiv.classList.remove('show');
        }
    });
}

// Select a phone
async function selectPhone(which, title) {
    const input = document.getElementById(`search${which}`);
    const suggestionsDiv = document.getElementById(`suggestions${which}`);
    const detailsDiv = document.getElementById(`phone${which}-details`);
    
    input.value = title;
    suggestionsDiv.classList.remove('show');
    
    setLoading(true);
    
    try {
        const specs = await fetchPhoneData(title);
        state[`phone${which}`] = specs;
        renderPhoneSpecs(specs, `phone${which}-details`);
        
        // If both phones are selected, show comparison
        if (state.phoneA && state.phoneB) {
            comparePhones();
        }
    } catch (error) {
        showError(`Failed to load data for ${title}. Please try another phone.`);
        detailsDiv.innerHTML = '<p style="color: var(--error-color);">Failed to load phone data</p>';
    } finally {
        setLoading(false);
    }
}

// Initialize the app
function init() {
    console.log('Mobile Comparison Site initialized');
    
    // Set up search handlers
    handleSearch('A');
    handleSearch('B');
    
    // Hide comparison results initially
    document.getElementById('comparison-results').style.display = 'none';
    
    console.log('App ready! Start searching for phones to compare.');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
