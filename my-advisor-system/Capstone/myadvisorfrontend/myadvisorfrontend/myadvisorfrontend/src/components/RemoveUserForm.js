import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const RemoveUserForm = ({ onCancel ,onClose}) => {
    const [peoplesoftID, setPeoplesoftID] = useState('');
    const [peoplesoftIDError, setPeoplesoftIDError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const validateForm = () => {
        let isValid = true;

        if (peoplesoftID.trim() === '') {
            setPeoplesoftIDError(true);
            isValid = false;
        } else {
            setPeoplesoftIDError(false);
        }

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        fetch(`http://localhost:8080/user/delete/${peoplesoftID}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                setSnackbarMessage('User deleted successfully');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage('Failed to delete user');
                setSnackbarSeverity('error');
            }
            setOpenSnackbar(true);
        })
        .catch(() => {
            setSnackbarMessage('Network error. Try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        });
    };

    return (
        <div className="form">
            <h2>Remove User</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="PeopleSoft ID"
                    value={peoplesoftID}
                    onChange={(e) => setPeoplesoftID(e.target.value)}
                    error={peoplesoftIDError}
                    helperText={peoplesoftIDError ? '* PeopleSoft ID is required' : ''}
                    required
                    fullWidth
                />
                 <Box mt={2} display="flex" justifyContent="space-between">
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button 
                        type="button" 
                        variant="contained" 
                        style={{ backgroundColor: 'red', color: 'white' }}
                        onClick={onCancel}  
                    >
                        Cancel
                    </Button>
                </Box>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default RemoveUserForm;