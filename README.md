# Orizonix Landing Page

A premium, ultra-modern, micro-animated landing page for Orizonix - a creative-tech agency.

## Features

- 🎨 **Premium Dark Mode Design** - Clean, futuristic aesthetic
- ✨ **Micro-animations** - Powered by Framer Motion and GSAP
- 🎯 **3D Visual Elements** - Three.js floating orb with animated lines
- 📱 **Fully Responsive** - Mobile-first design
- 🚀 **Next.js 14** - Latest React framework
- 🎭 **Smooth Animations** - Staggered section reveals and hover effects

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js
- **Animations:** Framer Motion + GSAP
- **TypeScript:** Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
orizonix/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── BackgroundGrid.tsx  # Animated background grid
│   ├── FloatingOrb.tsx     # 3D wireframe orb
│   ├── Hero.tsx            # Hero section
│   ├── Services.tsx        # Service grid
│   ├── Pricing.tsx         # Pricing cards
│   ├── Features.tsx        # Why Orizonix section
│   ├── Contact.tsx         # Contact/CTA section
│   └── Footer.tsx          # Footer
└── ...
```

## Customization

### Calendly Integration

Update the Calendly URL in `components/Contact.tsx`:
```tsx
<iframe
  src="https://calendly.com/YOUR-USERNAME"
  ...
/>
```
Replace `YOUR-USERNAME` with your actual Calendly username.

### WhatsApp Number

Update the WhatsApp number in:
- `components/Hero.tsx`
- `components/Contact.tsx`
- `components/FloatingWhatsApp.tsx`

Current number: `919898084143` (format: country code + number without +)

### Social Media Links

Update social media links in `components/Footer.tsx`:
- LinkedIn
- Instagram
- Behance

Replace the placeholder URLs with your actual social media profiles.

## Build for Production

```bash
npm run build
npm start
```

## License

© 2024 Orizonix

