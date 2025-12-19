# Surface Planner Backend

A [Next.js](https://nextjs.org) application for managing surface planning bookings, photographers, and real-time notifications.

## Features

- 🔐 **Authentication** - NextAuth with email/password and photographer signup
- 📅 **Booking Management** - Create, assign, and track bookings
- 📸 **Photographer Management** - Assign photographers to bookings
- 🔔 **Real-Time Notifications** - Server-Sent Events (SSE) for instant updates
- 💬 **Messaging System** - Communication between clients and photographers
- 💳 **Payment Processing** - Payment tracking and management
- 📊 **Admin Dashboard** - Manage users, bookings, and photographers

## Real-Time Notifications ⚡

This project includes a **real-time notification system** using Server-Sent Events (SSE) and Supabase Real-time.

### Quick Setup (10 minutes)

1. **Enable Supabase Real-Time**
   - See: [SUPABASE_REALTIME_CHECKLIST.md](./SUPABASE_REALTIME_CHECKLIST.md)

2. **Run Database Migration**
   ```sql
   -- See: migrations/enable_notifications_realtime.sql
   ```

3. **Test the Implementation**
   - Open: http://localhost:3000/test-realtime.html
   - Or use: `npx ts-node scripts/test-realtime-notifications.ts <userId>`

### Documentation

- 📋 **[Quick Summary](./REALTIME_NOTIFICATIONS_SUMMARY.md)** - Overview and getting started
- ✅ **[Setup Checklist](./SUPABASE_REALTIME_CHECKLIST.md)** - Step-by-step setup guide
- 📖 **[Full Setup Guide](./REALTIME_NOTIFICATIONS_SETUP.md)** - Comprehensive documentation
- 📚 **[API Reference](./REALTIME_NOTIFICATIONS_REFERENCE.md)** - Code examples and API docs

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Environment variables configured (see below)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables
# See "Environment Variables" section below

# Run database migrations
# See SUPABASE_SETUP_GUIDE.md

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email Configuration (NodeMailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourapp.com

# Optional
NODE_ENV=development
```

See [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) for detailed setup instructions.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signup-photographer` - Photographer registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify` - Email verification

### Bookings
- `GET /api/bookings` - Get all bookings (with filters)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Delete booking
- `POST /api/bookings/[id]/assign` - Assign photographer
- `POST /api/bookings/[id]/accept` - Accept booking (photographer)
- `PUT /api/bookings/[id]/status` - Update booking status
- `GET /api/bookings/[id]/files` - Get booking files
- `GET /api/bookings/status-history/[id]` - Get status history

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/stream` - **Real-time SSE endpoint** ⚡
- `PUT /api/notifications/[id]/read` - Mark notification as read
- `POST /api/notifications/mark-all-read` - Mark all as read
- `GET /api/notifications/unread-count` - Get unread count
- `POST /api/notifications/work-completed` - Notify work completion

### Messages
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send new message
- `GET /api/messages/[id]` - Get message details
- `GET /api/messages/conversations` - Get conversations list
- `POST /api/messages/mark-all-read` - Mark all as read
- `GET /api/messages/unread-count` - Get unread count

### Admin
- `GET /api/Admin/photographers` - Get all photographers
- `PUT /api/Admin/photographers/[id]` - Update photographer
- `DELETE /api/Admin/photographers/[id]` - Delete photographer
- `GET /api/Admin/messages/conversations` - Get all conversations

### Users
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `PUT /api/users/[id]/password` - Change password

## Project Structure

```
surface-planner-backend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── bookings/      # Booking management
│   │   │   ├── notifications/ # Notification system
│   │   │   │   └── stream/    # Real-time SSE endpoint ⚡
│   │   │   ├── messages/      # Messaging system
│   │   │   ├── Admin/         # Admin endpoints
│   │   │   └── users/         # User management
│   │   ├── pages/             # Page components
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   ├── context/               # React context providers
│   ├── lib/                   # Utility libraries
│   │   ├── supabaseAdmin.ts   # Supabase admin client
│   │   ├── notificationHelper.ts # Notification helpers
│   │   └── emailService.ts    # Email service
│   └── utils/                 # Utility functions
│       ├── authOptions.ts     # NextAuth configuration
│       └── emailService.ts    # Email utilities
├── migrations/                # Database migrations
│   └── enable_notifications_realtime.sql
├── public/                    # Static files
│   ├── test-realtime.html    # Real-time test page
│   └── uploads/              # File uploads
├── scripts/                   # Utility scripts
│   └── test-realtime-notifications.ts
├── .env.local                 # Environment variables (create this)
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## Database Schema

See [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) for the complete database schema.

Main tables:
- **User** - User accounts (clients, photographers, admins)
- **Booking** - Booking requests and details
- **Notification** - User notifications (with real-time support)
- **Message** - Chat messages between users
- **Payment** - Payment records
- **BookingFile** - Uploaded files for bookings

## Testing

### Test Real-Time Notifications

```bash
# Option 1: Visual test page
npm run dev
# Open: http://localhost:3000/test-realtime.html

# Option 2: Script test
npx ts-node scripts/test-realtime-notifications.ts <userId>

# Option 3: Browser console
# See REALTIME_NOTIFICATIONS_REFERENCE.md
```

### Manual API Testing

Use tools like Postman, Insomnia, or curl to test API endpoints.

Example:
```bash
# Get notifications
curl -X GET http://localhost:3000/api/notifications \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"

# Connect to real-time stream
curl -N http://localhost:3000/api/notifications/stream \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Configure for Real-Time**
   ```json
   // vercel.json
   {
     "functions": {
       "src/app/api/notifications/stream/route.ts": {
         "maxDuration": 300
       }
     }
   }
   ```

4. **Add Environment Variables in Vercel Dashboard**
   - All variables from `.env.local`
   - Update `NEXTAUTH_URL` to your production URL

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

See Next.js [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - feedback and contributions welcome!

### Supabase Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Real-time Guide](https://supabase.com/docs/guides/realtime)

### Project Documentation
- [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md)
- [Real-Time Notifications Summary](./REALTIME_NOTIFICATIONS_SUMMARY.md)
- [Real-Time Setup Checklist](./SUPABASE_REALTIME_CHECKLIST.md)
- [Real-Time Setup Guide](./REALTIME_NOTIFICATIONS_SETUP.md)
- [Real-Time API Reference](./REALTIME_NOTIFICATIONS_REFERENCE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is proprietary and confidential.

---

**Built with ❤️ using Next.js, Supabase, and NextAuth**