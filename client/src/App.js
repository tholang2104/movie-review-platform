import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import BrowseMovies from './pages/BrowseMovies';
import Search from './pages/Search';
import MyReviews from './pages/MyReviews';
import About from './pages/About';
import Login from './pages/Login';
import ItemDetail from './pages/ItemDetail';
import AddReview from './pages/AddReview';
import UpdateReview from './pages/UpdateReview';
import Reviews from './pages/Reviews';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseMovies />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:id" element={<ItemDetail />} />
            <Route path="/add-review/:id" element={<AddReview />} />
            <Route path="/update-review/:id" element={<UpdateReview />} />
            <Route path="/reviews/:id" element={<Reviews />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
