const generatePlaceholderSVG = (name) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return `
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" fill="#0EA5E9"/>
      <text x="64" y="64" text-anchor="middle" dy="0.3em" fill="white" font-family="Arial" font-size="48">${initials}</text>
    </svg>
  `;
};

// Generate placeholders for each testimonial
const testimonials = [
  'Sarah Johnson',
  'James Wilson',
  'Emma Thompson'
];

testimonials.forEach((name, index) => {
  const svg = generatePlaceholderSVG(name);
  // Save as avatar-1.svg, avatar-2.svg, etc.
  require('fs').writeFileSync(`public/testimonials/avatar-${index + 1}.svg`, svg);
}); 