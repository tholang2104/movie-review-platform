import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would authenticate with Firebase
    console.log(isLogin ? 'Login:' : 'Register:', formData);
    alert(isLogin ? 'Login successful!' : 'Registration successful!');
    navigate('/');
  };

  return (
    <div className="login container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {isLogin ? 'Login' : 'Register'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </form>

              <div className="text-center">
                <p className="mb-0">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Register here' : 'Login here'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
