import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleBack}
      startIcon={<ArrowBackIcon />}
      sx={{
        position: 'absolute',
        top: '85px', // Adjust this value as necessary
        left: '20px',
        borderColor: '#003366',
        color: '#003366',
        '&:hover': {
          borderColor: '#002244',
          color: '#002244',
        },
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;