import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Ratings() {
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/login')
    }
  }, [cookies.access_token, history]);

  if (!cookies.access_token) {
    return null;
  }

  return (
    <div>Ratings</div>
  );
}