# Alumni Nexus Dashboard - HTML/CSS/JS Version

This project has been converted from React and Tailwind CSS to vanilla HTML, CSS, and JavaScript while maintaining all the original functionality and visual appeal.

## Features

### 🎨 Visual Design
- **Glass morphism effects** with backdrop blur and transparency
- **Gradient backgrounds** and animated elements
- **Dark/Light mode toggle** with theme persistence
- **Responsive design** that works on all screen sizes
- **Smooth animations** and hover effects

### 📊 Dashboard Components
- **Animated counters** with smooth number transitions
- **Interactive charts** using Chart.js (replacing Recharts)
- **Summary cards** with hover effects and progress bars
- **Real-time notifications** dropdown
- **User profile** dropdown menu

### 🧭 Navigation
- **Sidebar navigation** with active state indicators
- **Mobile-responsive** sidebar with toggle functionality
- **URL hash routing** for deep linking
- **Search functionality** (ready for implementation)

### 📈 Analytics
- **Line chart** for registration trends
- **Doughnut chart** for department distribution
- **Bar chart** for fundraising campaigns
- **Interactive tooltips** and legends

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Complete CSS with all styles
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - No frameworks or libraries
- **Chart.js** - For data visualization
- **Font Awesome** - For icons

## Key Features Implemented

### CSS Features
- CSS Custom Properties for theming
- Glass morphism effects with `backdrop-filter`
- Smooth animations and transitions
- Responsive grid layouts
- Dark mode support

### JavaScript Features
- View management and routing
- Dark mode toggle with localStorage persistence
- Animated counters with easing functions
- Interactive dropdowns
- Chart initialization and theme updates
- Mobile sidebar toggle

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- ES6+ JavaScript features
- CSS Custom Properties support

## Getting Started

1. Open `index.html` in a modern web browser
2. The dashboard will load with animated counters and charts
3. Use the sidebar to navigate between different views
4. Toggle dark mode using the switch in the sidebar
5. Click on notification bell or user profile for dropdowns

## Customization

### Colors and Themes
Edit the CSS custom properties in `:root` and `.dark` selectors in `style.css` to customize colors.

### Data
Update the data arrays in `script.js` for charts and counters to reflect your actual data.

### Layout
Modify the HTML structure in `index.html` and corresponding CSS in `style.css` to change the layout.

## Performance

- No external dependencies except Chart.js and Font Awesome
- Optimized animations using `requestAnimationFrame`
- Efficient DOM manipulation
- CSS-only animations where possible

## Conversion Notes

This project was converted from a React + Tailwind CSS application to vanilla HTML/CSS/JS while maintaining:
- All visual effects and animations
- Interactive functionality
- Responsive design
- Performance characteristics
- User experience

The conversion maintains the same modern, professional appearance while being more lightweight and having no build process requirements.