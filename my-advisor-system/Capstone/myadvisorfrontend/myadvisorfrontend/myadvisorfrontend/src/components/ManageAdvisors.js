import './ManageAdvisors.css';
import Appbar from './Appbar';
import AdvisorM from "./AdvisorM"
import React, { useState, useEffect } from 'react';
import AddAdvisorForm from './AddAdvisorForm';
import RemoveAdvisorForm from './RemoveAdvisorForm';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container,Box } from '@mui/material';
import { styled } from '@mui/system';
import BackButton from './BackButton';
import EditAdvisorForm from './EditAdvisorForm';


const StyledTable = styled(Table)({
    minWidth: 900,
});


const ManageAdvisors = () => {
    const [showAddAdvisorForm, setShowAddAdvisorForm] = useState(false);
    const [showRemoveAdvisorForm, setShowRemoveAdvisorForm] = useState(false);
    const [advisors, setAdvisors] = useState([]);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null); 
    const [showEditAdvisorForm, setShowEditAdvisorForm] = useState(false); 

    const handleCancel = () => {
        setShowRemoveAdvisorForm(false);
    };

    useEffect(() => {
        // Fetch advisors from the advisors table API
        fetch("http://localhost:8080/api/advisors/getAll", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then(response => response.json())
      .then(data => {
          setAdvisors(data); 
      })
      .catch(error => {
          console.error("Error fetching the database:", error);
      });
    }, [showAddAdvisorForm, showRemoveAdvisorForm]);
 
    
    const fetchAdvisors = () => {
        fetch("http://localhost:8080/api/advisors/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            setAdvisors(data);
        })
        .catch(error => {
            console.error("Error fetching the database:", error);
        });
    };
 

    const toggleAddAdvisorForm = () => {
        setShowAddAdvisorForm(prev => !prev);
        setShowRemoveAdvisorForm(false);
    };

    const toggleRemoveAdvisorForm = () => {
        setShowRemoveAdvisorForm(prev => !prev);
        setShowAddAdvisorForm(false);
    };

    const handleFormClose = () => {
        setShowAddAdvisorForm(false);
    };

    const handleEditAdvisor = (advisor) => {
        setSelectedAdvisor(advisor); // Select the advisor to edit
        setShowEditAdvisorForm(true); 
      };
    
    
    return (
        
        
        <div type="container">
            
            <BackButton/>
            <h1 className="centered-header">Manage Advisors</h1>
            <h5 className="centered-header">  View, add,edit and remove advisors from the system.</h5>
            
            

            <Box className="button-container">
            <button className ="custom-button" onClick={toggleAddAdvisorForm}>
                {showAddAdvisorForm ? 'Hide Add Advisor Form' : 'Add Advisor'}
            </button>

            <button className =" custom-button" onClick={toggleRemoveAdvisorForm}>
                {showRemoveAdvisorForm ? 'Hide Remove Advisor Form' : 'Remove Advisor'}
            </button>
            
            </Box>

            {showAddAdvisorForm && <AddAdvisorForm onSuccess={handleFormClose}/> }
            {showRemoveAdvisorForm && <RemoveAdvisorForm onCancel={handleCancel}/>}
           
            {showEditAdvisorForm && (
            <EditAdvisorForm
             advisor={selectedAdvisor} 
            onClose={() => setShowEditAdvisorForm(false)
        
            }
           
         />
      )}
            <div className="database-display">
               
                <Container maxWidth="lg">
            <Typography variant="h6"  sx={{ fontWeight: 'bold' }} gutterBottom>
              Advisors:
            </Typography>
            <Box sx={{ width: '100%', overflowX: 'auto', marginTop: 2 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            
                            <TableCell>PeopleSoft ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Faculty</TableCell>
                            <TableCell>Major(s)</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {advisors.map(advisor => (
                            <TableRow key={advisor.peoplesoft_id}>
                                <TableCell>{advisor.peoplesoft_id}</TableCell>
                                <TableCell>{advisor.name}</TableCell>
                                <TableCell>{advisor.surname}</TableCell>
                                <TableCell>{advisor.email}</TableCell>
                                <TableCell>{advisor.type}</TableCell>
                                <TableCell>{advisor.faculty}</TableCell>
                                <TableCell>{advisor.majors}</TableCell>
                                <TableCell>
                                     <button className="custom-button" onClick={() => handleEditAdvisor(advisor)}>
                                        Edit
                                     </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </Container>
       
            </div>
           
        </div>
    );
};

export default ManageAdvisors;