import React from 'react';

const About = () => {
  return (
    <div className="about">
      <div className="hero-section text-center py-5 bg-light">
        <h1 className="display-4 fw-bold mb-3">About Movie Review Platform</h1>
        <p className="lead mb-4">Your ultimate destination for movie reviews and recommendations</p>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="mb-4">Our Mission</h2>
            <p className="mb-4">
              Movie Review Platform is dedicated to helping movie enthusiasts discover great films,
              share their opinions, and connect with fellow cinephiles. We believe that everyone has
              a unique perspective on cinema, and we're here to amplify those voices.
            </p>

            <h2 className="mb-4">What We Offer</h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Comprehensive Reviews</h5>
                    <p className="card-text">
                      Read detailed reviews from our community of movie lovers, covering everything
                      from blockbusters to indie gems.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Movie Database</h5>
                    <p className="card-text">
                      Browse our extensive collection of movies with detailed information,
                      ratings, and user reviews.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Community Driven</h5>
                    <p className="card-text">
                      Join a vibrant community of film enthusiasts sharing their thoughts
                      and recommendations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Personal Collections</h5>
                    <p className="card-text">
                      Keep track of your reviews, create watchlists, and manage your personal
                      movie collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mb-4">Get Started</h2>
            <p className="mb-4">
              Ready to dive into the world of cinema? Browse our movie collection, read reviews,
              and start sharing your own thoughts on your favorite films.
            </p>
            <div className="text-center">
              <a href="/browse" className="btn btn-primary btn-lg me-3">Browse Movies</a>
              <a href="/search" className="btn btn-outline-primary btn-lg">Search Movies</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
