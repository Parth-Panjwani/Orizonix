import { Project } from "@/types/portfolio";

// Sample portfolio data - Replace with your actual projects
export const portfolioProjects: Project[] = [
  {
    id: "1",
    title: "TechStartup Brand Identity",
    type: "digital-creative",
    description: "Complete brand identity system for a B2B SaaS startup",
    longDescription:
      "We crafted a modern, tech-forward brand identity that speaks to innovation and trust. The project included logo design, brand guidelines, color palette, typography system, and application across all touchpoints.",
    images: [
      "/portfolio/techstartup-1.jpg",
      "/portfolio/techstartup-2.jpg",
      "/portfolio/techstartup-3.jpg",
    ],
    tags: ["Branding", "Logo Design", "Brand Guidelines"],
    year: 2024,
    featured: true,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    type: "website",
    description: "Full-stack e-commerce solution with custom CMS and payment integration",
    longDescription:
      "Built a high-performance e-commerce platform using Next.js with custom admin dashboard, inventory management, payment gateway integration, and SEO optimization. Resulted in 40% increase in conversion rates.",
    images: [
      "/portfolio/ecommerce-1.jpg",
      "/portfolio/ecommerce-2.jpg",
      "/portfolio/ecommerce-3.jpg",
    ],
    tags: ["Next.js", "E-Commerce", "Payment Integration"],
    liveUrl: "https://example-ecommerce.com",
    year: 2024,
    featured: true,
  },
  {
    id: "3",
    title: "Client Onboarding Automation",
    type: "automation",
    description: "n8n-powered workflow automating client onboarding from lead to customer",
    longDescription:
      "Created an end-to-end automation system that handles lead capture, qualification, proposal generation, contract signing, and CRM updates. Reduced manual work by 80% and improved response time from days to minutes.",
    images: [
      "/portfolio/automation-1.jpg",
      "/portfolio/automation-2.jpg",
    ],
    tags: ["n8n", "Workflow Automation", "CRM Integration"],
    year: 2024,
    featured: true,
  },
  {
    id: "4",
    title: "SaaS Landing Page",
    type: "website",
    description: "High-converting landing page with animated components and A/B testing",
    longDescription:
      "Designed and developed a conversion-optimized landing page with interactive animations, A/B testing capabilities, and analytics integration. Achieved 25% improvement in conversion rates.",
    images: [
      "/portfolio/saas-1.jpg",
      "/portfolio/saas-2.jpg",
    ],
    tags: ["Landing Page", "Conversion Optimization", "Animation"],
    liveUrl: "https://example-saas.com",
    year: 2024,
  },
  {
    id: "5",
    title: "Social Media Campaign Creative",
    type: "digital-creative",
    description: "Complete social media creative package for product launch campaign",
    longDescription:
      "Created a cohesive visual identity for a 3-month product launch campaign across Instagram, LinkedIn, and Twitter. Included static posts, carousels, stories, and video content templates.",
    images: [
      "/portfolio/social-1.jpg",
      "/portfolio/social-2.jpg",
      "/portfolio/social-3.jpg",
      "/portfolio/social-4.jpg",
    ],
    tags: ["Social Media", "Content Creation", "Campaign Design"],
    year: 2024,
  },
  {
    id: "6",
    title: "Telegram Bot for Customer Support",
    type: "automation",
    description: "AI-powered Telegram bot handling customer inquiries 24/7",
    longDescription:
      "Built an intelligent Telegram bot integrated with OpenAI that handles customer support, order tracking, and FAQ responses. Processes 500+ queries daily with 90% satisfaction rate.",
    images: [
      "/portfolio/telegram-bot-1.jpg",
      "/portfolio/telegram-bot-2.jpg",
    ],
    tags: ["Telegram Bot", "AI Integration", "Customer Support"],
    year: 2024,
  },
];

