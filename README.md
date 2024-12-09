# AI Chat Application

A React-based chat interface that enables users to interact with an AI assistant. The application features a clean, modern interface with a collapsible sidebar for chat history and a main chat area.

## Features

- Interactive chat interface with AI responses
- Collapsible sidebar for chat history navigation
- Real-time message updates
- MongoDB integration for message persistence
- Dark/Light theme support
- Responsive design for mobile and desktop
- Message history grouping by date

## Tech Stack

- Frontend:

  - React (Create React App)
  - Tailwind CSS for styling
  - React Icons
  - Axios for API calls

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Key Components

### Sidebar

- Collapsible chat history navigation
- Messages grouped by date
- Toggle functionality for mobile responsiveness
- Real-time history updates

### ChatInput

- Message input field with send button
- Handles message submission to backend
- Input validation and error handling
- Loading state management during AI responses

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` files

```
REACT_APP_OPENAI_API_KEY=
REACT_APP_BASE_URL=
REACT_APP_VITE_CLERK_PUBLISHABLE_KEY=

MONGO_URI=
```

4. Start the development server:

```bash
npm start
```

## Environment Variables --> root/.env

```
REACT_APP_OPENAI_API_KEY=    # API from OpenAI
REACT_APP_BASE_URL=          # Server port (default: 5000)
REACT_APP_VITE_CLERK_PUBLISHABLE_KEY=    # API from Clerk
```

## Environment Variables --> server/.env

```
MONGO_URI=   # MongoDB connection string
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
