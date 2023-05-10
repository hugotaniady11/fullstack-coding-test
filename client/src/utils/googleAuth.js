import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { axiosInstance } from '../lib/axios';

const clientId = process.env.CLIENT_ID;

const GoogleOAuth = () => {
  const handleLoginSuccess = async (response) => {
    const { tokenId } = response;
    try {
      // Send the token to your server for validation and to obtain user information
      const res = await axiosInstance.post('/auth/google/login', { token: tokenId });
      // Handle the response from the server as needed
      console.log(res.data);
    } catch (error) {
      // Handle error if authentication fails
      console.error(error);
    }
  };

  const handleLoginFailure = (error) => {
    // Handle error if login fails
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleOAuth;
