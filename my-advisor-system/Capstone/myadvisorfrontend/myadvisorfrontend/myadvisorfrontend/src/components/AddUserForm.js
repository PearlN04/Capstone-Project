import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './AddUserForm.css'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddUserForm = ({onSuccess,onCancel}) => {
    const [peoplesoftID, setPeoplesoftID] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

    const validate = () => {
        const newErrors = {};

        // Validate PeopleSoft ID 
        if (!peoplesoftID) {
            newErrors.peoplesoftID = "PeopleSoft ID is required";}

        // Validate Names, checks if the length entered is correct or whether name has been entered
        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        // Validate Surname
        if (!surname.trim()) {
            newErrors.surname = "Surname is required";
        } else if (surname.length < 2) {
            newErrors.surname = "Surname must be at least 2 characters";
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Invalid email format";
        }

        // Validate Role
        if (!role.trim()) {
            newErrors.role = "Role is required";
        }
        

        //Validate password
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 2) {
            newErrors.password = "Password must be at least 2 characters";
        }

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
            //user object
            const user = {
                peoplesoftID,
                name,
                surname,
                email,
                role,
                password
            };
            console.log(user);

            //adds a user to the user table
            fetch("http://localhost:8080/user/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }).then((response) => {
                if (response.ok) {
                    setSnackbarMessage("User added successfully!");
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    // Clear form fields after successful submission
                    setPeoplesoftID('');
                    setName('');
                    setSurname('');
                    setEmail('');
                    setRole('');
                    setPassword('');
                    setErrors({});
                    setTimeout(() => {
                        if (onSuccess) {
                            onSuccess(); // Close the form after a user has been successfully added
                        }
                    }, 1500); 
                    
                } else {
                    setSnackbarMessage("Error adding user.");
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true); 
                }
            }).catch((error) => {
                console.error("Error:", error);
                setSnackbarMessage("Failed to add user. Please try again.");
                setSnackbarSeverity('error');
                setOpenSnackbar(true); 
            });
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    /*Add user form, allows the system admin to add user to the system*/
    return (
        <div className="form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={peoplesoftID}
                        onChange={(e) => setPeoplesoftID(e.target.value)}
                        placeholder="PeopleSoft ID"
                    />
                    {errors.peoplesoftID && <p className="error">* {errors.peoplesoftID}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    {errors.name && <p className="error">* {errors.name}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Surname"
                    />
                    {errors.surname && <p className="error">* {errors.surname}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">* {errors.email}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role"
                    />
                    {errors.role && <p className="error">* {errors.role}</p>}
                </div>

            
                <div>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">* {errors.password}</p>}
                </div>
            
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button type="submit">
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

              {/* Snackbar */}
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

export default AddUserForm;
