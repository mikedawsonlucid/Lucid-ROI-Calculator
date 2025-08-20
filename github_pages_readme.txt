# Lucid ROI Calculator

A professional ROI calculator for Lucid's Visual Collaboration Suite, designed to help potential customers understand the value proposition of implementing Lucid's products.

## 🚀 Live Demo

Visit the live calculator: `https://yourusername.github.io/lucid-roi-calculator/`

## 📋 Features

- **Interactive ROI Calculations** - Real-time calculations based on user inputs
- **Toggleable Sections** - Enable/disable ROI categories based on your use case
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Brand Compliant** - Follows Lucid's official brand guidelines
- **Professional UI** - Clean, modern interface with smooth animations
- **Data-Driven** - Based on real customer case studies and ROI data

## 🎯 ROI Categories

### Time Savings
- **Meeting Efficiency**: Asynchronous brainstorming replaces long meetings
- **Meeting Reduction**: 83% reduction in cross-functional meetings

### Travel Cost Savings
- **Virtual Events**: Replace in-person events with virtual collaboration
- **Workshop Collaboration**: Online workshops replace travel

### Productivity Improvements
- **Support Time Reduction**: Visual diagrams reduce triage time
- **Brainstorming Efficiency**: 2.5x more productive brainstorming sessions

### Additional Benefits
- **Faster Onboarding**: Reduce engineer onboarding by 2-3 days
- **Admin Time Reduction**: 95% reduction in administrative tasks
- **Pipeline Generation**: 30-50% more time on pipeline activities

## 🛠️ Setup Instructions

### Method 1: Quick GitHub Pages Setup

1. **Fork or Download** this repository
2. **Upload files** to your GitHub repository:
   ```
   your-repo/
   ├── index.html
   ├── styles.css
   ├── calculator.js
   └── README.md
   ```
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your calculator** at: `https://yourusername.github.io/repository-name/`

### Method 2: Custom Domain Setup

1. Follow steps 1-3 above
2. **Add custom domain** (optional):
   - In Pages settings, add your custom domain
   - Create a `CNAME` file in your repository with your domain
3. **Configure DNS** with your domain provider

### Method 3: Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/lucid-roi-calculator.git
   cd lucid-roi-calculator
   ```

2. **Open locally**:
   - Simply open `index.html` in your browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```

3. **Access at**: `http://localhost:8000`

## 📁 File Structure

```
lucid-roi-calculator/
├── index.html          # Main HTML file with meta tags and structure
├── styles.css          # Complete CSS styling following Lucid brand
├── calculator.js       # JavaScript logic and functionality
└── README.md           # This documentation file
```

## 🎨 Customization

### Brand Colors
The calculator uses Lucid's official brand colors defined in CSS variables:
```css
:root {
    --lucid-blue: #2563eb;
    --lucid-blue-dark: #1d4ed8;
    --emerald-500: #10b981;
    --purple-500: #8b5cf6;
    --indigo-500: #6366f1;
}
```

### ROI Calculations
Modify the calculation logic in `calculator.js`:
```javascript
// Example: Adjust meeting efficiency calculation
const meetingEfficiency = {
    hoursPerYear: this.state.users * 10, // 10 hours saved per user per year
    dollarValue: this.state.users * 10 * hourlyRate
};
```

### Default Values
Change default inputs in the constructor:
```javascript
this.state = {
    users: 10,           // Default number of users
    avgSalary: 85000,    // Default average salary
    // ... other settings
};
```

## 📱 Browser Support

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Dependencies

- **Lucide Icons**: CDN-loaded icon library
- **Google Fonts**: Inter font family
- **No JavaScript frameworks** - Pure vanilla JavaScript

## 📊 Analytics Setup

Add your analytics tracking code to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Icons Not Showing
- Ensure Lucide CDN is accessible
- Check browser console for errors
- Verify internet connection

### Calculator Not Loading
- Check browser console for JavaScript errors
- Ensure all files are uploaded correctly
- Verify file paths in `index.html`

### Mobile Display Issues
- Check viewport meta tag is present
- Verify responsive CSS is loading
- Test on actual devices

## 📄 License

This project is designed for use with Lucid Software's sales and marketing efforts. Please ensure compliance with Lucid's brand guidelines when using or modifying.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions about this ROI calculator:
- Open an issue in this repository
- Contact your Lucid sales representative
- Check Lucid's official documentation

## 🔄 Updates

This calculator is based on real customer data and may be updated periodically to reflect:
- New case studies and ROI data
- Updated product features
- Improved calculations and assumptions

---

**Made with ❤️ for Lucid Software sales teams**