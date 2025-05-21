import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './EditAdvisorForm.css';

const EditAdvisorForm = ({ advisor, onClose }) => {
    const [peoplesoftID, setPeoplesoftID] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [faculty, setFaculty] = useState('');
    const [majors, setMajors] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (advisor) {
            setPeoplesoftID(advisor.peoplesoftID);
            setName(advisor.name);
            setSurname(advisor.surname);
            setRole(advisor.role);
            setEmail(advisor.email);
            setFaculty(advisor.faculty);
            setMajors(advisor.majors);
        }
    }, [advisor]);

    const validate = () => {
        const newErrors = {};

        if (!peoplesoftID) newErrors.peoplesoftID = "PeopleSoft ID is required";
        if (!name.trim()) newErrors.name = "Name is required";
        if (!surname.trim()) newErrors.surname = "Surname is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!role.trim()) newErrors.role = "Role is required";
        if (!faculty.trim()) newErrors.faculty = "Faculty is required";
        if (!majors.trim()) newErrors.majors = "Major is required";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) newErrors.email = "Invalid email format";

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarMessage("Please fix the errors.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } else {
            const updatedAdvisor = {
                peoplesoftID,
                name,
                surname,
                email,
                role,
                faculty,
                majors
            };

            fetch(`http://localhost:8080/advisor/update/${advisor.advisorID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedAdvisor),
            }).then((response) => {
                if (response.ok) {
                    setSnackbarMessage("Advisor updated successfully!");
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    setTimeout(() => onClose(), 1500);
                } else {
                    setSnackbarMessage("Error updating advisor.");
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                }
            }).catch((error) => {
                console.error("Error:", error);
                setSnackbarMessage("Failed to update advisor. Please try again.");
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="form">
            <h2>Edit Advisor</h2>
            <Paper elevation={2} style={{ padding: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="PeopleSoft ID"
                            value={peoplesoftID}
                            onChange={(e) => setPeoplesoftID(e.target.value)}
                            InputProps={{ readOnly: true }}
                            error={!!errors.peoplesoftID}
                            helperText={errors.peoplesoftID}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            error={!!errors.surname}
                            helperText={errors.surname}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            error={!!errors.role}
                            helperText={errors.role}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Faculty"
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                            error={!!errors.faculty}
                            helperText={errors.faculty}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Major"
                            value={majors}
                            onChange={(e) => setMajors(e.target.value)}
                            error={!!errors.majors}
                            helperText={errors.majors}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
                        Update
                    </Button>
                    <Button type="button" variant="contained" color="primary" onClick={onClose}>
                        Cancel
                    </Button>
                </form>
            </Paper>

            
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default EditAdvisorForm;