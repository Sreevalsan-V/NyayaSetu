# LawTune - Legal Platform MVP

A legal-tech platform prototype demonstrating basic functionality for client-lawyer interaction.

**⚠️ This is a demo MVP - NOT for production use**

## Features

### Client Side
- Browse lawyer profiles
- Send contact requests with case details
- Real-time chat with lawyers
- View lawyer ratings and experience

### Advocate Side
- Manage cases with document sections
- Upload and organize case files
- Receive and accept client requests
- Chat with clients
- Create new cases and document sections

## Tech Stack
- React 18
- React Router (HashRouter for GitHub Pages)
- localStorage for data persistence
- No backend (client-side only)

## Demo Credentials

**Client Login:**
- Username: `client1`
- Password: `client123`

**Lawyer Login:**
- Username: `lawyer1`
- Password: `lawyer123`

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Live Demo

Visit: https://Sreevalsan-V.github.io/NyayaSetu

## Data Persistence

All data (chats, cases, files, messages) is stored in browser localStorage and persists across sessions.

## Important Notes

- No real authentication security
- No actual file storage (metadata only)
- Uses mock data and hardcoded users
- For demonstration purposes only
- Not suitable for production use

## License

MIT
