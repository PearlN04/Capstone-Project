import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import AddUserForm from './AddUserForm';
import RemoveUserForm from './RemoveUserForm';
import Header from './Header';
import './ManageUsers.css';
import User from './User';
import BackButton from './BackButton';

// Styled table component
const StyledTable = styled(Table)({
    minWidth: 900,
});

const ManageUsers = () => {
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showRemoveUserForm, setShowRemoveUserForm] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the from the user table
        fetch("http://localhost:8080/user/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data); 
        })
        .catch(error => {
            console.error("Error fetching the database:", error);
        });
    }, [showAddUserForm, showRemoveUserForm]);

    const toggleAddUserForm = () => {
        setShowAddUserForm(prev => !prev);
        setShowRemoveUserForm(false);
    };

    const toggleRemoveUserForm = () => {
        setShowRemoveUserForm(prev => !prev);
        setShowAddUserForm(false);
    };

    const handleFormClose = () => {
        setShowAddUserForm(false);
    };


    const handleCancel = () => {
        setShowRemoveUserForm(false);
    };

    const handleClose = () => {
        setShowAddUserForm(false);
    };

    return (
        <div className="ManageUsers-container">
            <BackButton/>
            <h1 className="centered-header">Manage Users</h1>
            <h5 className="centered-header">View, add, and remove users from the system.</h5>
            {showAddUserForm && <AddUserForm onSuccess={handleFormClose} onCancel={handleClose}/>}
            {showRemoveUserForm && <RemoveUserForm onCancel={handleCancel}/>}

            <Box className="button-container">
                <button className="custom-button" onClick={toggleAddUserForm}>
                    {showAddUserForm ? 'Hide Add User Form' : 'Add User'}
                </button>
                <button className="custom-button" onClick={toggleRemoveUserForm}>
                    {showRemoveUserForm ? 'Hide Remove User Form' : 'Remove User'}
                </button>
            </Box>

            <div className="database-display">
                <Container maxWidth="lg">
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                        Users:
                    </Typography>
                    <Box sx={{ marginLeft: -1 }}>
                        <TableContainer component={Paper}>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PeopleSoft ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Surname</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                    </TableRow>
                                </TableHead>
                                *<TableBody>
                                    {users.map(user => (
                                        <TableRow key={user.userid}>
                                            <TableCell>{user.peoplesoftID}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.surname}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>*
                            </StyledTable>
                        </TableContainer>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default ManageUsers;
