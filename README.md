# בינה לכל (Bina4All) - AI Consultancy Website

A bilingual (Hebrew/English) one-page website for Bina4All, an AI consultancy offering education and solutions for individuals and organizations.

## 🌟 Features

- **Bilingual Support**: Full Hebrew (RTL) and English (LTR) language switching
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern UI**: Black background with yellow accents and white text
- **Interactive Elements**: Smooth scrolling, FAQ accordions, contact form
- **Formspree Integration**: Contact form handling
- **Alpine.js**: Reactive JavaScript framework for interactivity

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **TailwindCSS**: Utility-first CSS framework
- **Alpine.js**: Lightweight JavaScript framework
- **Vite**: Fast build tool and dev server
- **Formspree**: Contact form handling
- **Font Awesome**: Icons
- **Google Fonts**: Heebo (Hebrew) and Inter (English)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Bina4All
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
Bina4All/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.js            # Main JavaScript file
│   └── style.css          # Main CSS file with Tailwind imports
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Primary Yellow**: `#FFD600` (bina-yellow)
- **Black**: `#000000` (bina-black)
- **White**: `#FFFFFF` (bina-white)

### Typography
- **Hebrew**: Heebo font family
- **English**: Inter font family
- **Weights**: 300-900 available

### Layout
- **Container**: Max-width responsive containers
- **Spacing**: Consistent spacing using Tailwind utilities
- **Breakpoints**: Mobile-first responsive design

## 🌍 Language Support

The website automatically switches between:
- **Hebrew (RTL)**: Default language with right-to-left text direction
- **English (LTR)**: Secondary language with left-to-right text direction

Language switching is handled by Alpine.js with smooth transitions.

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All sections are fully responsive with appropriate breakpoints.

## 📧 Contact Form

The contact form uses Formspree for handling submissions. To set up your own form:

1. Create a Formspree account at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace the form action URL in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 🎯 Sections

1. **Header**: Navigation, logo, language toggle, CTA
2. **Hero**: Main headline and call-to-action
3. **About**: Personal introduction and vision
4. **Services**: 5 service cards with icons
5. **FAQ**: Expandable accordion questions
6. **Contact**: Contact form with Formspree
7. **Footer**: Links and social media

## 🔧 Customization

### Adding New Content
- Edit the HTML file directly
- Use Alpine.js directives for dynamic content
- Maintain bilingual structure with `x-show` directives

### Styling Changes
- Modify `tailwind.config.js` for theme changes
- Add custom CSS in `src/style.css`
- Use Tailwind utility classes for quick styling

### Adding New Sections
1. Add section to HTML with unique ID
2. Add navigation link in header
3. Update smooth scrolling JavaScript if needed

## 📄 License

This project is created for Bina4All. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, contact:
- Email: info@bina4all.com
- LinkedIn: [Bina4All](https://linkedin.com/in/bina4all)

---

**בינה לכל - AI Consultancy**  
*Making AI accessible for everyone* 