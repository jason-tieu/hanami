# Jason Tieu - Portfolio Website

A modern, professional portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Showcasing expertise in embedded systems, AI/ML, and software engineering.

## 🚀 Features

- **Modern Design**: Clean, minimal design with dark mode support
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized for speed with static export
- **Accessibility**: WCAG AA+ compliant with proper semantic HTML
- **SEO Optimized**: Meta tags, sitemap, and structured data
- **Content Management**: MDX-based content system for easy editing
- **Animations**: Smooth animations with Framer Motion
- **Security**: Security headers and CSP configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Content**: MDX
- **Deployment**: Vercel (static export)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasontieu/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Building and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Static Export
```bash
npm run build
# The static files will be generated in the 'out' directory
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📝 Adding Content

### Adding a New Project

1. **Create a new MDX file** in `content/projects/`
   ```bash
   touch content/projects/my-new-project.mdx
   ```

2. **Add frontmatter** to the file:
   ```mdx
   ---
   title: "My New Project"
   date: "2024-01-15"
   excerpt: "Brief description of the project"
   tech: ["React", "TypeScript", "Node.js"]
   links:
     github: "https://github.com/username/repo"
     demo: "https://demo-url.com"
   coverImage: "/images/project-image.svg"
   featured: true
   category: "Web Development"
   ---

   # My New Project

   Your project content here...
   ```

3. **Add a cover image** to `public/images/`

### Adding a Blog Post

1. **Create a new MDX file** in `content/posts/`
   ```bash
   touch content/posts/my-blog-post.mdx
   ```

2. **Add frontmatter**:
   ```mdx
   ---
   title: "My Blog Post"
   date: "2024-01-15"
   excerpt: "Brief description of the post"
   tags: ["AI", "Machine Learning", "Technology"]
   coverImage: "/images/blog-image.svg"
   featured: false
   ---

   # My Blog Post

   Your blog content here...
   ```

## 🎨 Customization

### Colors and Branding

Edit the brand colors in `src/app/globals.css`:

```css
:root {
  --brand: oklch(0.6 0.2 15); /* Primary brand color */
  --accent-brand: oklch(0.5 0.15 270); /* Accent brand color */
}
```

### Typography

The site uses Inter font by default. To change fonts, update `src/app/layout.tsx`:

```typescript
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
```

### Adding New Pages

1. **Create a new page** in `src/app/(routes)/`
   ```bash
   mkdir src/app/(routes)/new-page
   touch src/app/(routes)/new-page/page.tsx
   ```

2. **Add navigation** in `src/components/header.tsx`

### Custom Components

Create reusable components in `src/components/`:

```typescript
// src/components/my-component.tsx
interface MyComponentProps {
  title: string;
  description: string;
}

export function MyComponent({ title, description }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### SEO Configuration

Update metadata in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your description",
  // ... other metadata
};
```

### Analytics

To add Google Analytics, uncomment the configuration in `src/app/layout.tsx` and add your GA ID to environment variables.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── experience/
│   │   │   ├── projects/
│   │   │   └── layout.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── project-card.tsx
│   │   └── ...
│   └── lib/
│       ├── mdx.ts
│       ├── projects.ts
│       └── utils.ts
├── content/
│   ├── projects/
│   └── posts/
├── public/
│   └── images/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 🚀 Performance

The site is optimized for performance with:

- **Static Export**: Pre-rendered pages for fast loading
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Font Optimization**: Preloaded fonts with `font-display: swap`
- **Lighthouse Score**: 95+ across all metrics

## 🔒 Security

Security features include:

- **Security Headers**: HSTS, X-Frame-Options, CSP
- **Content Security Policy**: Restrictive CSP for enhanced security
- **No External Scripts**: Self-contained with no external dependencies
- **HTTPS Only**: Enforced through security headers

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: jason.tieu04@gmail.com
- **GitHub**: [@jasontieu](https://github.com/jasontieu)
- **LinkedIn**: [Jason Tieu](https://linkedin.com/in/jasontieu)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by Jason Tieu