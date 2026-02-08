# LawTune - Technical Stack Documentation

## Overview
LawTune is a **purely frontend application** with no backend server. All data is stored locally in the user's browser using localStorage.

---

## Tech Stack

### Frontend Framework
- **React 18.2.0**
  - Modern JavaScript library for building user interfaces
  - Component-based architecture
  - Hooks for state management (useState, useEffect, useContext)
  - No TypeScript - plain JavaScript for simplicity

### Routing
- **React Router DOM 6.20.0**
  - Client-side routing
  - HashRouter (instead of BrowserRouter) for GitHub Pages compatibility
  - Protected routes based on user roles
  - URLs use `#` prefix (e.g., `/#/client`, `/#/advocate`)

### State Management
- **React Context API**
  - AuthContext - manages user authentication
  - ChatContext - manages chat messages and contact requests
  - No Redux or external state libraries

### Data Persistence
- **Browser localStorage**
  - No database
  - No backend API
  - All data stored client-side in browser
  - Data persists across browser sessions
  - Stored data:
    - User authentication state
    - Chat messages
    - Contact requests
    - Case files (metadata only)
    - Document sections

### Build Tool
- **Create React App (react-scripts 5.0.1)**
  - Webpack bundling
  - Babel transpilation
  - Development server with hot reload
  - Production build optimization

### Deployment
- **GitHub Pages (gh-pages 6.1.1)**
  - Static file hosting
  - Automatic deployment from gh-pages branch
  - Free hosting
  - CDN-backed for global access

---

## Why No Backend?

This is an **MVP (Minimum Viable Product)** designed to demonstrate:
- UI/UX concepts
- Role-based navigation
- Chat flow simulation
- Case management structure

### Advantages of Frontend-Only Approach:
✅ No server costs
✅ No database setup
✅ Easy deployment
✅ Instant updates
✅ Fast development
✅ Free hosting on GitHub Pages

### Limitations:
❌ Data not shared between users
❌ No real authentication security
❌ No actual file storage
❌ Data cleared if browser cache cleared
❌ Not suitable for production

---

## Architecture

```
┌─────────────────────────────────────┐
│         GitHub Pages (CDN)          │
│    Static HTML, CSS, JS Files       │
└─────────────────────────────────────┘
                 ↓
         User's Browser
                 ↓
┌─────────────────────────────────────┐
│           React App                 │
│  ┌─────────────────────────────┐   │
│  │   Components & Pages        │   │
│  ├─────────────────────────────┤   │
│  │   Context (State)           │   │
│  ├─────────────────────────────┤   │
│  │   React Router              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│       Browser localStorage          │
│  (All data stored here)             │
└─────────────────────────────────────┘
```

---

## How It Works Without a Backend

### 1. Authentication
- Hardcoded users in JavaScript file
- Login validates against static array
- Session stored in localStorage
- No password encryption (demo only)

### 2. Chat System
- Messages stored as JSON in localStorage
- No WebSocket or real-time server
- Both users must use same browser for shared chat
- Simulates real-time communication

### 3. File Uploads
- Files selected via browser input
- Only metadata stored (name, size, date)
- Actual file content NOT stored
- No file server or cloud storage

### 4. Case Management
- Cases stored as JSON objects
- All updates saved to localStorage
- No database queries
- Instant read/write operations

---

## Dependencies

### Production Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "react-scripts": "5.0.1"
}
```

### Development Dependencies
```json
{
  "gh-pages": "^6.1.1"
}
```

**Total npm packages:** ~1,500+ (including transitive dependencies from react-scripts)

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note:** Requires localStorage support (all modern browsers)

---

## Performance

- **Initial Load:** < 2 seconds
- **Route Navigation:** Instant (client-side)
- **Data Operations:** < 50ms (localStorage)
- **Bundle Size:** ~200KB (gzipped)

---

## Security Considerations

⚠️ **This is a demo app - NOT production-ready**

- No encryption
- No authentication tokens
- No HTTPS enforcement (depends on GitHub Pages)
- No input sanitization
- No CSRF protection
- No rate limiting

**For production, you would need:**
- Backend API server
- Database (PostgreSQL, MongoDB)
- Authentication service (JWT, OAuth)
- File storage (AWS S3, Cloudinary)
- HTTPS/SSL
- Input validation and sanitization

---

## Development Workflow

```bash
# Local development
npm start          # Runs on localhost:3000

# Build for production
npm run build      # Creates optimized build/

# Deploy to GitHub Pages
npm run deploy     # Pushes to gh-pages branch
```

---

## Future Backend Integration (If Needed)

To convert this to a full-stack app, you would need:

1. **Backend Options:**
   - Node.js + Express
   - Python + Django/Flask
   - Java + Spring Boot

2. **Database:**
   - PostgreSQL (relational)
   - MongoDB (document)
   - Firebase (real-time)

3. **File Storage:**
   - AWS S3
   - Google Cloud Storage
   - Cloudinary

4. **Real-time Chat:**
   - Socket.io
   - WebSockets
   - Firebase Realtime Database

5. **Authentication:**
   - JWT tokens
   - OAuth 2.0
   - Session-based auth

---

## Conclusion

LawTune is a **frontend-only React application** that uses browser localStorage for all data persistence. It requires no backend server, making it perfect for GitHub Pages hosting and rapid prototyping.
