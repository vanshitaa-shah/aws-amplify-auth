import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const provider = localStorage.getItem('provider');
    
    if (provider === 'google' || provider === 'microsoft') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default Callback;
