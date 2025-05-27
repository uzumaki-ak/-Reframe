# Reframe🧠

A modern web application for documenting and sharing your philosophical evolution. Track how your beliefs, worldviews, and perspectives have transformed over time, and engage with a community of fellow thinkers.

## ✨ Features

### 🔐 User Authentication
- **Seamless Onboarding**: Create account with just your first name
- **Flexible Auth Flow**: Browse freely, authenticate only when interacting
- **Profile Management**: Edit your name anytime from the sidebar
- **Persistent Sessions**: Stay logged in across browser sessions

### 📝 Evolution Tracking
- **Before/After Comparison**: Document what you used to believe vs. what you believe now
- **Category System**: Tag your evolutions with up to 3 categories
- **Rich Text Support**: Express your thoughts with detailed descriptions
- **Personal Archive**: Keep track of all your philosophical journeys

### 🌍 Community Features
- **Explore Thoughts**: Discover evolutions from the global community
- **Voting System**: Vote on before/after beliefs independently
  - One vote per side (before/after)
  - Click to vote, click again to remove
  - Change votes anytime
- **Comments & Replies**: Engage in threaded discussions
- **User Profiles**: See join dates and user information

### 🔍 Discovery & Search
- **Advanced Search**: Find evolutions by content, author, or category
- **Filter Options**: Filter by category, date range, and more
- **My Thoughts**: View only your personal evolutions
- **Archive System**: Soft delete with restore functionality

### 🎨 Customization
- **Theme Support**: Light, dark, and system themes
- **Typography Controls**: Adjust font size, line height, letter spacing
- **Color Customization**: Personalize primary colors (light mode)
- **Responsive Design**: Perfect experience on all devices
- **Collapsible Sidebar**: Maximize content space when needed

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Loading States**: Smooth loading indicators throughout
- **Error Handling**: Graceful error messages and recovery
- **Toast Notifications**: Real-time feedback for all actions
- **Keyboard Navigation**: Full keyboard accessibility support

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Backend
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Supabase](https://supabase.com/)** - Database hosting and management
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

## 🚀 Getting Started

philosophy-tracker/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── users/               # User management
│   │   ├── posts/               # Evolution posts
│   │   ├── comments/            # Comment system
│   │   ├── votes/               # Voting system
│   │   └── categories/          # Category management
│   ├── archive/                 # Archived posts page
│   ├── explore-thoughts/        # Community exploration
│   ├── my-thoughts/             # Personal posts
│   ├── search/                  # Search functionality
│   ├── share-evolution/         # Create new evolution
│   ├── site-custom/             # Customization settings
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   ├── auth-guard.tsx           # Authentication wrapper
│   ├── auth-prompt.tsx          # Auth modal
│   ├── comments-section.tsx     # Comment system
│   ├── post-card.tsx            # Evolution post display
│   ├── voting-section.tsx       # Voting interface
│   └── user-onboarding.tsx      # User creation flow
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts              # Authentication hook
│   ├── use-mobile.tsx           # Mobile detection
│   └── use-toast.ts             # Toast notifications
├── lib/                         # Utility libraries
│   ├── database.ts              # Database operations
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Helper functions
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema definition
└── public/                      # Static assets


### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation
npm install

#.env.example
DATABASE_URL="your_postgresql_connection_string"
DIRECT_URL="your_direct_connection_string"

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

run server: npm run dev

1. **Clone the repository**
   ```bash
   git clone https://github.com/uzumaki-ak/-Reframe.git
   cd philosophy-tracker
