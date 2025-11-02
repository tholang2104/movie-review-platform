# Movie Review Platform

A full-stack web application for movie enthusiasts to browse movies, read reviews, and share their own opinions.

## Features

- Browse and search movies
- Read and write movie reviews
- User authentication with Firebase
- Responsive design with Bootstrap
- RESTful API backend

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Bootstrap for styling
- Firebase for authentication and database

### Backend
- Node.js with Express
- Firebase Admin SDK
- RESTful API design
- CORS and security middleware

## Project Structure

```
movie-review-platform/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── ui/             # UI components
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── firebaseConfig.js
│   └── package.json
├── backend/                # Node.js backend
│   ├── config/
│   │   └── firebase.js
│   ├── routes/
│   │   └── reviews.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd movie-review-platform
```

2. Set up the backend
```bash
cd backend
npm install
# Copy .env.example to .env and fill in your Firebase credentials
cp .env.example .env
npm start
```

3. Set up the frontend
```bash
cd ../client
npm install
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Reviews
- `GET /api/reviews/movie/:movieId` - Get all reviews for a movie
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
