# VA Training Simulator - Milestone 1

A full-stack Virtual Assistant Training Simulator built with Next.js, Prisma, MongoDB, and NextAuth.js.

## Features

- ✅ Role-based authentication (Admin & VA)
- ✅ Protected routes with middleware
- ✅ MongoDB database with Prisma ORM
- ✅ Responsive UI with Tailwind CSS
- ✅ Session management with NextAuth.js
- ✅ Server-side rendering and protection

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables

Copy `.env.example` to `.env.local` and update the values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Update the following variables:
- `DATABASE_URL`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: A random secret key
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)

### 3. Database Setup

\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed test users
node scripts/seed-users.js
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see the application.

## Test Credentials

After running the seed script, you can use these test accounts:

**Admin User:**
- Email: admin@example.com
- Password: admin123
- Redirects to: /admin/dashboard

**VA User:**
- Email: va@example.com
- Password: va123
- Redirects to: /va/simulator

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── admin/             # Admin-only routes
│   ├── va/                # VA-only routes
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
├── prisma/                # Database schema
└── scripts/               # Database scripts
\`\`\`

## Key Features Implemented

1. **Authentication System**
   - NextAuth.js with credentials provider
   - Password hashing with bcrypt
   - Session management

2. **Role-based Access Control**
   - Middleware protection for routes
   - Role-based redirects
   - Server-side session validation

3. **Database Integration**
   - Prisma ORM with MongoDB
   - User model with roles
   - Database seeding script

4. **UI/UX**
   - Responsive design with Tailwind CSS
   - Clean dashboard layouts
   - Loading states and error handling

## Next Steps (Future Milestones)

- Add user management for admins
- Implement call simulation features
- Add progress tracking
- Create training scenarios
- Add real-time features
