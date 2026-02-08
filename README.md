# InoriのAI Navigation

A curated directory of 200+ AI tools for productivity, marketing, development, design, and more. Discover, search, and submit AI tools.

![Inori AI Navigation](https://image.thum.io/get/width/1200/crop/768/https%3A%2F%2Finori-ai.vercel.app)

## Features

- **200+ AI Tools**: Curated collection of the best AI tools across multiple categories
- **Search & Filter**: Real-time search and category filtering
- **Pagination**: Browse through tools with easy pagination
- **Sort Options**: Sort by popularity or newest additions
- **User Submissions**: Submit new AI tools for review
- **Click Tracking**: Popularity metrics for each tool
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, minimalist design with smooth animations

## Categories

- 🤖 Artificial Intelligence
- ⚡ Productivity
- 📢 Marketing
- 💻 Developer Tools
- 🎨 Design
- 🔍 SEO
- 💬 Chatbots
- 📱 Social Media
- ✍️ Content Creation
- 🔧 No-Code
- 📝 Writing
- 🎧 Customer Support
- 📰 Blogging
- 💰 Sales
- 📦 Productized Services
- 🌐 Website Builders
- 📊 Data Analytics
- 🍎 iOS
- 🔌 Developer APIs
- 🎬 Video
- 🏗️ Product Building
- 🖥️ Mac
- 💭 Feedback Tools
- 📚 Education
- 📧 Email

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite (with Prisma ORM)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/inori-3333/inori-ai-navigation.git
cd inori-ai-navigation
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client:
```bash
npm run db:generate
```

4. Push database schema:
```bash
npm run db:push
```

5. Seed the database with initial data:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
inori-ai-navigation/
├── app/
│   ├── api/
│   │   ├── submit/route.ts       # Tool submission API
│   │   └── tools/[id]/view/route.ts  # View tracking API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── Footer.tsx                # Footer component
│   ├── Header.tsx                # Header with navigation
│   ├── Pagination.tsx            # Pagination controls
│   ├── Sidebar.tsx               # Category sidebar
│   ├── SubmissionModal.tsx       # Tool submission modal
│   ├── ToolCard.tsx              # Individual tool card
│   └── ToolGrid.tsx              # Tools grid with search/filter
├── lib/
│   ├── categories.ts             # Category definitions and utilities
│   └── tools.ts                  # Database operations
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding script
├── public/                       # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Database Schema

### Tool Model
- `id`: Unique identifier
- `name`: Tool name
- `description`: Brief description
- `url`: Website URL
- `category`: Category ID
- `logoUrl`: Clearbit logo URL
- `screenshotUrl`: Thum.io screenshot URL
- `views`: View count for popularity sorting
- `isApproved`: Approval status for submissions
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Submission Model
- `id`: Unique identifier
- `name`: Tool name
- `description`: Brief description
- `url`: Website URL
- `category`: Category ID
- `isApproved`: Approval status

## API Routes

### POST /api/submit
Submit a new AI tool for inclusion.

**Request Body:**
```json
{
  "name": "Tool Name",
  "url": "https://tool-url.com",
  "description": "Brief description",
  "category": "artificial-intelligence"
}
```

### POST /api/tools/[id]/view
Increment view count for a tool.

## Customization

### Adding New Categories

Edit `lib/categories.ts` to add new categories:

```typescript
export const CATEGORIES = [
  { id: 'new-category', name: 'New Category', icon: '✨' },
  // ... existing categories
];
```

### Styling

The design uses Tailwind CSS. Key design tokens are defined in `tailwind.config.js`:

- **Fonts**: Poppins (headings), Inter (body)
- **Colors**: Slate color palette with Indigo primary
- **Shadows**: Custom card shadows with hover effects

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure settings
4. Add environment variables if needed
5. Deploy!

### Other Platforms

For other deployment options, run:

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- [Clearbit](https://clearbit.com) for logo API
- [Thum.io](https://thum.io) for website screenshots
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Next.js](https://nextjs.org) for the framework
- All the amazing AI tool creators featured on this site

---

Built with ❤️ by Inori