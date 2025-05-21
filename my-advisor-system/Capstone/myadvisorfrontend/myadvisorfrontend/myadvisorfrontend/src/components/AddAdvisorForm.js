import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './AddAdvisorForm.css'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ManageAdvisors from './ManageAdvisors';


/*Form for adding an advisor to the advisor table*/

const AddAdvisorForm = ({ onSuccess }) => {
    const [peoplesoftID, setPeoplesoftID] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
    const [faculty, setFaculty] = useState('');
    const [available, setAvailable] = useState(false);
    const [department, setDepartment] = useState(null);
    const [majors, setMajors] = useState('');
    const [notes, setNotes] = useState(null);
    const [userID, setUserID] = useState(0);
    

    const validate = () => {
        const newErrors = {};

        // Validates peoplesoft id
        if (!peoplesoftID) {
            newErrors.peoplesoftID = "PeopleSoft ID is required";}

        // Validates name ,checks whether the name field is empty or whether the input is valid or not
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

        //Validates Faculty
        if (!faculty.trim()) {
            newErrors.faculty = "Faculty is required";
        } else if (faculty.length < 2) {
            newErrors.faculty = "Faculty name must be at least 2 characters";
        }


        //Valida
        if (!majors.trim()) {
            newErrors.majors= "A major is required";
        } else if (majors.length < 2) {
            newErrors.majors = "A major must be at least 2 characters";
        }

        // Validates email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Invalid email format";
        }

        // Checks whether the role is valid or not
        if (!role.trim()) {
            newErrors.role = "Role is required";
        }

        return newErrors;
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarMessage("Please fill in the required values.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true); 
        } else {
            //creates an advisor object
            const advisor = {
                peoplesoftID,
                name,
                surname,
                email,
                role,
                department,
                notes,
                available,
                faculty,
                majors
                
            };
            if (userID) {
                advisor.userID = userID;
            }
            console.log(advisor);

            //allows the advisor object to be added to the database
            fetch("http://localhost:8080/advisor/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(advisor),
            }).then((response) => {
                if (response.ok) {
                    setSnackbarMessage("Advisor added successfully!");
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true); 
                    //Clears form fields after an advisor has been added successfully
                    setPeoplesoftID('');
                    setName('');
                    setSurname('');
                    setEmail('');
                    setRole('');
                    setMajors('');
                    setFaculty('');
                    setErrors({});
                    setTimeout(() => {
                        if (onSuccess) {
                            onSuccess(); 
                        }
                    }, 1500); 
        
                } else {
                    setSnackbarMessage("Error adding advisor.");
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true); 
                }
            }).catch((error) => {
                console.error("Error:", error);
                setSnackbarMessage("Failed to add advisor. Please try again.");
                setSnackbarSeverity('error');
                setOpenSnackbar(true); 
            });
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); 
    };

    /*this is an advisor form, it prompts the user to enter name,email,surname,role and password*/
    return (
        <div className="form">
            <h2>Add Advisor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input     //peoplesoft id textbox
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
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        placeholder="Faculty"
                    />
                    {errors.faculty && <p className="error">* {errors.faculty}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        value={majors}
                        onChange={(e) => setMajors(e.target.value)}
                        placeholder="Major"
                    />
                    {errors.majors && <p className="error">* {errors.majors}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>

            
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

export default AddAdvisorForm;