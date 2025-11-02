const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Get all reviews for a movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { movieId } = req.params;
    const reviewsRef = db.collection('reviews').where('movieId', '==', movieId);
    const snapshot = await reviewsRef.get();

    const reviews = [];
    snapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ error: 'Failed to get reviews' });
  }
});

// Get a specific review
router.get('/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { id } = req.params;
    const reviewDoc = await db.collection('reviews').doc(id).get();

    if (!reviewDoc.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ id: reviewDoc.id, ...reviewDoc.data() });
  } catch (error) {
    console.error('Error getting review:', error);
    res.status(500).json({ error: 'Failed to get review' });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { movieId, rating, comment, reviewerName } = req.body;

    if (!movieId || !rating || !comment || !reviewerName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newReview = {
      movieId,
      rating: parseInt(rating),
      comment,
      reviewerName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('reviews').add(newReview);
    const review = await docRef.get();

    res.status(201).json({ id: review.id, ...review.data() });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { id } = req.params;
    const { rating, comment, reviewerName } = req.body;

    const updateData = {
      ...(rating && { rating: parseInt(rating) }),
      ...(comment && { comment }),
      ...(reviewerName && { reviewerName }),
      updatedAt: new Date()
    };

    await db.collection('reviews').doc(id).update(updateData);

    const updatedReview = await db.collection('reviews').doc(id).get();
    res.json({ id: updatedReview.id, ...updatedReview.data() });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { id } = req.params;
    await db.collection('reviews').doc(id).delete();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Get reviews by user
router.get('/user/:userId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { userId } = req.params;
    const reviewsRef = db.collection('reviews').where('userId', '==', userId);
    const snapshot = await reviewsRef.get();

    const reviews = [];
    snapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error getting user reviews:', error);
    res.status(500).json({ error: 'Failed to get user reviews' });
  }
});

module.exports = router;
