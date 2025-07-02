# VA Training Call Simulator - Setup Guide

## Prerequisites

- Node.js 18+ 
- MongoDB database
- OpenAI API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/va-training-app?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

3. Seed the database with sample scripts:
```bash
node scripts/seed-scripts.js
```

4. Run the development server:
```bash
npm run dev
```

## Features

### Milestone 1 (Completed)
- ✅ User authentication with role-based access
- ✅ Admin and VA dashboards
- ✅ User management

### Milestone 2 (Completed)
- ✅ AI Call Simulator for VAs
- ✅ Script management for admins
- ✅ OpenAI integration for realistic conversations
- ✅ Session tracking and storage

## Usage

### For VAs
1. Navigate to `/va/simulator`
2. Click "Start Simulation" to begin a practice session
3. Respond to AI-generated customer objections
4. Practice handling different scenarios

### For Admins
1. Navigate to `/admin/scripts`
2. Create objection scenarios with multiple rebuttal options
3. Mark preferred responses for each scenario
4. Manage existing scripts

## API Endpoints

### Simulation
- `POST /api/simulation/start` - Start a new simulation session
- `POST /api/simulation/message` - Send/receive messages

### Script Management
- `GET /api/admin/scripts` - Get all scripts
- `POST /api/admin/scripts` - Create a new script
- `GET /api/admin/scripts/[id]` - Get a specific script
- `PUT /api/admin/scripts/[id]` - Update a script
- `DELETE /api/admin/scripts/[id]` - Delete a script

## Database Schema

### Script Model
```prisma
model Script {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  objection    String
  rebuttals    String[]
  preferred    String
  createdAt    DateTime @default(now())
}
```

### SimulationSession Model
```prisma
model SimulationSession {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  messages  Json
  startedAt DateTime @default(now())
  endedAt   DateTime?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
``` 