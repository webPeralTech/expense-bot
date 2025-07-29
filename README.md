# 💰 Expense Tracker - Shared Expense Management

A full-stack MERN application for tracking shared daily expenses. Built with React, Node.js, Express, and MongoDB, featuring a Progressive Web App (PWA) for mobile use with a beautiful dashboard interface.

## ✨ Features

### 📱 Frontend
- **Progressive Web App (PWA)** - Installable on mobile devices
- **Fully Responsive** - Works perfectly on phones, tablets, and desktops
- **Beautiful Dashboard** - Modern card-based UI with summary statistics
- **Three Main Pages:**
  - ➕ **Add Expense** - Simple form to add new expenses
  - 📊 **Dashboard** - Overview with cards showing totals, recent expenses, and full list
  - 📋 **Monthly Summary** - Detailed breakdown with expense table and split calculations

### 🧠 Backend
- **RESTful API** with Express.js
- **MongoDB** database for data persistence
- **CORS enabled** for frontend communication
- **Input validation** and error handling

### 📧 Email Automation
- **Monthly Reports** - Automated email on the 1st of every month
- **Beautiful HTML emails** with expense breakdowns
- **Split calculations** showing total and per-person amounts

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Gmail account for email reports

### 1. Clone and Install
```bash
git clone <repository-url>
cd expense-tracker
npm run install-all
```

### 2. Environment Setup
Copy the example environment file and configure it:
```bash
cp env.example .env
```

Edit `.env` with your settings:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/expense-tracker

# Server Configuration
PORT=5000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO_1=user1@gmail.com
EMAIL_TO_2=user2@gmail.com

# App Configuration
NODE_ENV=development
```

### 3. Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASS`

### 4. Start Development
```bash
npm run dev
```

This starts both:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:3000`

## 📱 PWA Installation

### Mobile Installation
1. Open the app in your mobile browser
2. Look for the "Add to Home Screen" prompt
3. Or manually add via browser menu
4. The app will now work like a native app!

### Desktop Installation
- Chrome/Edge: Look for the install icon in the address bar
- Firefox: Use the menu → "Install App"

## 🛠️ API Endpoints

### Expenses
- `POST /api/expenses/add` - Add new expense
- `GET /api/expenses/all` - Get all expenses
- `GET /api/expenses/monthly-summary` - Get monthly summary

### Health Check
- `GET /api/health` - Server status

## 📧 Email Reports

The app automatically sends monthly expense reports on the 1st of every month at 9:00 AM (IST). Reports include:
- Total monthly spending
- List of all expenses with details
- Split calculations (50/50 split)

## 🎨 Design Features

- **Green & White Theme** - Clean, modern design
- **Dashboard Cards** - Beautiful summary cards with icons
- **Mobile-First** - Optimized for phone browsers
- **Responsive Navigation** - Bottom tabs on mobile, top on desktop
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages

## 🏗️ Project Structure

```
expense-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Main page components
│   │   ├── services/     # API communication
│   │   └── ...
│   └── ...
├── server/                # Node.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # Utilities (cron jobs, email)
│   └── ...
├── package.json          # Root dependencies
└── README.md
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run build` - Build for production

### Database Schema
```javascript
{
  note: String,      // Expense description
  amount: Number,    // Expense amount
  date: Date,        // Expense date
  createdAt: Date,   // Auto-generated
  updatedAt: Date    // Auto-generated
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB (MongoDB Atlas recommended)
2. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

### Frontend Deployment
1. Build the app: `npm run build`
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure MongoDB is running
4. Check Gmail app password setup

---

**Built with ❤️ using the MERN stack** 