# LawTune - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [How GitHub Pages Hosting Works](#how-github-pages-hosting-works)
4. [Setup Instructions](#setup-instructions)
5. [User Guide](#user-guide)
6. [Development Guide](#development-guide)
7. [Data Storage](#data-storage)
8. [Limitations](#limitations)
9. [FAQ](#faq)

---

## Project Overview

**LawTune** is a legal-tech platform MVP (Minimum Viable Product) built to demonstrate basic client-lawyer interaction functionality.

### Key Points:
- ✅ **No Backend Required** - Purely frontend application
- ✅ **No Database** - Uses browser localStorage
- ✅ **No Server Costs** - Hosted free on GitHub Pages
- ✅ **Always Online** - Runs on GitHub's servers, not your laptop
- ⚠️ **Demo Only** - Not production-ready

---

## Features

### Client Portal
1. **Find Lawyers**
   - Browse 6 lawyer profiles
   - View detailed information (experience, ratings, education)
   - Filter by specialization

2. **Contact Lawyers**
   - Send contact request with case details
   - Specify case type and urgency
   - Wait for lawyer acceptance

3. **Chat**
   - Real-time messaging with lawyers
   - View chat history
   - Message timestamps

### Advocate Portal
1. **Case Management**
   - View all cases
   - Create new cases
   - Track case status and hearings

2. **Document Management**
   - Organize files by sections
   - Upload documents per section
   - Create custom document sections
   - Remove files as needed

3. **Client Requests**
   - Receive contact requests
   - View case details and urgency
   - Accept or reject requests
   - Notification badges

4. **Chat**
   - Communicate with clients
   - View all active chats
   - Message history

---

## How GitHub Pages Hosting Works

### Your Question: "Will it run even if I shut down my laptop?"

**YES! Absolutely.** Here's why:

```
┌─────────────────────────────────────────┐
│     Your Laptop (Development)           │
│  - Write code                           │
│  - npm run deploy                       │
│  - Code pushed to GitHub                │
└─────────────────────────────────────────┘
                  ↓
         (Push via Git)
                  ↓
┌─────────────────────────────────────────┐
│     GitHub Servers (Cloud)              │
│  - Stores your code                     │
│  - Hosts your website                   │
│  - Runs 24/7/365                        │
│  - Multiple data centers                │
└─────────────────────────────────────────┘
                  ↓
         (Users access)
                  ↓
┌─────────────────────────────────────────┐
│     Users' Browsers (Worldwide)         │
│  - Download HTML/CSS/JS                 │
│  - Run React app locally                │
│  - Store data in their localStorage     │
└─────────────────────────────────────────┘
```

### How It Works:

1. **You Deploy Once:**
   ```bash
   npm run deploy
   ```

2. **GitHub Takes Over:**
   - Code uploaded to GitHub's servers
   - GitHub Pages serves your files
   - Available worldwide via CDN

3. **You Can Shut Down:**
   - Your laptop can be off
   - Your internet can be disconnected
   - Website still works 24/7

4. **Users Access Anytime:**
   - They visit: https://Sreevalsan-V.github.io/NyayaSetu
   - GitHub sends them your files
   - React app runs in their browser

### Why This Works:

- GitHub Pages hosts **static files** (HTML, CSS, JavaScript)
- No server processes running
- No database connections needed
- Everything runs in user's browser
- Your React app is just a JavaScript file

### Cost: **$0 Forever**

GitHub Pages is **completely free** for public repositories.

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/Sreevalsan-V/NyayaSetu.git
cd NyayaSetu

# Install dependencies
npm install

# Start development server
npm start
```

App will open at `http://localhost:3000`

### Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This command:
1. Builds production-ready files
2. Creates/updates `gh-pages` branch
3. Pushes to GitHub
4. GitHub Pages automatically serves it

**First time setup:**
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Save

Wait 2-3 minutes for deployment.

Visit: `https://Sreevalsan-V.github.io/NyayaSetu`

---

## User Guide

### Demo Credentials

**Client Account:**
```
Username: client1
Password: client123
Role: CLIENT
```

**Lawyer Account:**
```
Username: lawyer1
Password: lawyer123
Role: ADVOCATE
```

### Client Workflow

1. **Login** as client
2. **Browse lawyers** - View profiles, ratings, experience
3. **Contact lawyer** - Click "Contact Lawyer" → Fill form → Send request
4. **Check chats** - After lawyer accepts, chat appears in "Chats" tab

### Lawyer Workflow

1. **Login** as lawyer
2. **Manage cases** - View, create, update cases
3. **Upload documents** - Select case → Expand section → Upload files
4. **Handle requests** - "Requests" tab → Accept/Reject
5. **Chat with clients** - "Chats" tab → Select client → Message

---

## Development Guide

### Project Structure

```
Law/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.js
│   │   ├── Chat.js
│   │   ├── LawyerList.js
│   │   ├── CaseList.js
│   │   └── ...
│   ├── pages/              # Main page components
│   │   ├── Login.js
│   │   ├── ClientDashboard.js
│   │   └── AdvocateDashboard.js
│   ├── context/            # State management
│   │   ├── AuthContext.js
│   │   └── ChatContext.js
│   ├── data/               # Mock data
│   │   ├── mockData.js
│   │   └── mockCases.js
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── package.json
└── README.md
```

### Adding New Features

1. **Create Component:**
   ```bash
   src/components/NewFeature.js
   src/components/NewFeature.css
   ```

2. **Import in Dashboard:**
   ```javascript
   import NewFeature from '../components/NewFeature';
   ```

3. **Add to State:**
   - Use useState or Context API
   - Save to localStorage for persistence

### Code Style

- Use functional components
- Use hooks (no class components)
- Keep components small and focused
- Inline styles avoided - use CSS files
- No TypeScript - plain JavaScript

---

## Data Storage

### What's Stored in localStorage

| Key | Data | Size Estimate |
|-----|------|---------------|
| `lawtune_user` | Current user session | ~100 bytes |
| `lawtune_contact_requests` | All contact requests | ~5 KB |
| `lawtune_active_chats` | Active chat sessions | ~2 KB |
| `lawtune_messages` | All chat messages | ~50 KB |
| `lawtune_cases` | All cases with files | ~20 KB |
| `client_active_view` | Client's current view | ~10 bytes |
| `advocate_active_view` | Advocate's current view | ~10 bytes |
| `client_selected_lawyer` | Selected lawyer ID | ~5 bytes |
| `advocate_selected_case` | Selected case ID | ~5 bytes |

**Total:** ~77 KB (localStorage limit: 5-10 MB)

### Data Persistence

✅ **Persists:**
- Across page refreshes
- Browser restarts
- System reboots

❌ **Cleared when:**
- User clears browser data
- Incognito/private mode closed
- localStorage manually cleared

---

## Limitations

### Technical Limitations

1. **No Multi-User Sharing**
   - Each browser has separate data
   - Users can't see each other's updates
   - For demo: use same browser for both roles

2. **No Real File Storage**
   - Only file metadata stored
   - Actual file content not saved
   - Can't download uploaded files

3. **No Real-Time Sync**
   - No WebSocket connections
   - No server push notifications
   - Manual refresh needed

4. **No Security**
   - No encryption
   - No secure authentication
   - Demo credentials only

### Browser Limitations

- localStorage max: 5-10 MB
- Must enable JavaScript
- Modern browser required
- Cookies/localStorage must be enabled

---

## FAQ

### Q: Do I need a server to run this?
**A:** No! It's purely frontend. GitHub Pages serves static files.

### Q: Will it work if my laptop is off?
**A:** Yes! Once deployed, GitHub's servers host it 24/7.

### Q: Can two users chat in real-time?
**A:** No. This MVP uses localStorage, which is per-browser. Each user has separate data.

### Q: How do I test the chat feature?
**A:** Open two browser windows/tabs. Login as client in one, lawyer in another (same browser).

### Q: Is my data secure?
**A:** No. This is a demo. Don't enter real personal information.

### Q: Can I add a real backend later?
**A:** Yes! You'd need to:
- Build REST API (Node.js/Python/Java)
- Add database (PostgreSQL/MongoDB)
- Implement real authentication
- Add file storage service

### Q: Does GitHub Pages cost money?
**A:** No. It's 100% free for public repositories.

### Q: How do I update the live site?
**A:** Just run `npm run deploy` again. Updates go live in 2-3 minutes.

### Q: Why HashRouter instead of BrowserRouter?
**A:** GitHub Pages doesn't support server-side routing. HashRouter uses `#` in URLs which works on static hosts.

### Q: Can I use a custom domain?
**A:** Yes! GitHub Pages supports custom domains. See GitHub documentation.

---

## Support

For issues or questions:
- Check existing issues on GitHub
- Create new issue with details
- Include browser console errors

---

## License

MIT License - Free to use, modify, and distribute.

---

## Acknowledgments

Built as a learning project to demonstrate:
- React fundamentals
- Client-side routing
- State management
- localStorage persistence
- Static site deployment
