# House Shop - E-commerce for House Projects

A modern e-commerce website built with Next.js, React, and Tailwind CSS for selling private house projects and architectural designs.

## Features

### 🏠 **House Project Showcase**
- Browse a curated collection of house projects
- Detailed project information with specifications
- High-quality images and 3D visualizations
- Filter projects by category, bedrooms, price range

### 🛒 **Shopping Cart**
- Add house projects to cart
- Manage quantities and remove items
- Persistent cart state with Zustand
- Secure checkout process

### 📱 **Responsive Design**
- Mobile-first responsive design
- Optimized for all device sizes
- Modern, clean UI with Tailwind CSS
- Smooth animations and transitions

### 🎨 **Modern UI/UX**
- Beautiful hero section with compelling visuals
- Product cards with ratings and reviews
- Interactive filtering and search
- Professional typography and spacing

### 📄 **Content Pages**
- About page with company information
- Blog section for articles and updates
- Contact form with multiple channels
- Professional footer with social links

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd house-shop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
house-shop/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop pages
│   └── cart/              # Cart page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── FeaturedProducts.tsx # Featured products
│   ├── ProductGrid.tsx    # Product grid
│   ├── FilterSidebar.tsx  # Filter sidebar
│   ├── AboutSection.tsx   # About section
│   └── ContactSection.tsx # Contact section
├── store/                 # State management
│   └── cartStore.ts       # Shopping cart store
├── public/                # Static assets
└── package.json           # Dependencies
```

## Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- Calculate totals
- Persistent state
- Clear cart functionality

### Product Filtering
- Filter by category (Modern, Traditional, Luxury, Cottage)
- Filter by number of bedrooms
- Filter by price range
- Clear all filters option

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Fast loading times

### SEO Optimized
- Meta tags and descriptions
- Semantic HTML structure
- Fast page loads
- Accessible design

## Customization

### Adding New Products
1. Update the products array in `components/FeaturedProducts.tsx` and `components/ProductGrid.tsx`
2. Add product images to the public folder
3. Update filters in `components/FilterSidebar.tsx`

### Styling
- Customize colors in `tailwind.config.js`
- Modify component styles in individual files
- Add new utility classes as needed

### Content
- Update company information in components
- Modify contact details
- Add new blog posts or content pages

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@houseshop.com or create an issue in the repository. 