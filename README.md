# Next.js CRUD Dashboard

A modern, responsive dashboard application built with Next.js, featuring user authentication and product management capabilities.

## Features

- **User Authentication**

  - Secure login and registration
  - Protected dashboard routes
  - Session management with NextAuth.js

- **Product Management**

  - Create, read, update, and delete products
  - Product listing with search and filtering
  - Detailed product view

- **Responsive Design**
  - Mobile-first approach
  - Sidebar navigation with mobile menu
  - Adaptive layout for different screen sizes

## Tech Stack

- **Frontend**

  - Next.js 14 (React Framework)
  - Tailwind CSS (Styling)
  - Shadcn UI (Component Library)
  - Lucide Icons

- **Backend**
  - Next.js API Routes
  - Prisma (ORM)
  - PostgreSQL (Database)
  - NextAuth.js (Authentication)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or pnpm package manager

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ziad-hatem/Frontend-Challenge
   cd Frontend-Challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app                 # Next.js app directory
  /api               # API routes
  /dashboard         # Dashboard pages
  /login            # Authentication pages
/components         # React components
  /ui               # UI components
/lib                # Utility functions
/prisma             # Database schema and migrations
/public             # Static assets
/styles             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
