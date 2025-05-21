import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
    const [loading, setLoading] = useState(true);
    const [advisorData, setAdvisorData] = useState(null);
    //const [email, setEmail] = useState('');
    const [availability, setAvailability] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/api/advisors/ASL1234')
            .then((response) => response.json())
            .then((data) => {
                setAdvisorData(data);
                //setEmail(data.email);
                setAvailability(data.availabilitySlots || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching advisor data:', error);
                setLoading(false);
            });
    }, []);

    // Handle email change
    //const handleEmailChange = (event) => {
   //     setEmail(event.target.value);
    //};

    const handleAvailabilityChange = (index, field, value) => {
        const newAvailability = [...availability];
        if (field === 'startTime' || field === 'endTime') {
            newAvailability[index][field] = `${value}:00`;  
        } else {
            newAvailability[index][field] = value;  
        }
        setAvailability(newAvailability);
    };

    // Add a new availability slot
    const addAvailabilitySlot = () => {
        setAvailability([...availability, { date: '', startTime: '', endTime: '' }]);
    };

    // Remove an availability slot
    const removeAvailabilitySlot = (index) => {
        const newAvailability = availability.filter((_, i) => i !== index);
        setAvailability(newAvailability);
    };

    // Submit the form
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Create the data object to send to the backend
        const updatedData = {
            
            availabilitySlots: availability.map(slot => ({
                advisorId: advisorData.employeeId,
                date: slot.date,
                startTime: '${slot.startTime}:00',
                endTime: '${slot.endTime}:00'
            }))
        };
    
        console.log("Updated data being sent:", updatedData); // Debugging log
    
        fetch('http://localhost:8080/api/advisors/ASL1234/availability', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), 
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json(); 
        })
        .then((data) => {
            console.log("Backend response:", data); 
            alert('Availability updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating availability:', error);
            alert('Failed to update availability. Please try again.');
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>My Profile</h1>

            <div className="non-editable-fields">
                <p>Employee ID: {advisorData.employeeId}</p>
                <p>Department: {advisorData.department}</p>
                <p>Faculty: {advisorData.faculty}</p>
                <p>Type: {advisorData.type}</p>
            </div>

            <form onSubmit={handleSubmit} className="editable-form">
                <label>
                    Email Address:
                    <input
                        type="email"
                        value="aslam@myuct.ac.za"
                        //onChange={handleEmailChange}
                        required
                    />
                </label>

                <h2>Availability</h2>

                {availability.map((slot, index) => (
                    <div key={index} className="availability-slot">
                        <label>
                            Date:
                            <input
                                type="date"
                                value={slot.date}
                                onChange={(e) => handleAvailabilityChange(index, 'date', e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Start Time:
                            <input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            End Time:
                            <input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                                required
                            />
                        </label>

                        <button
                            type="button"
                            onClick={() => removeAvailabilitySlot(index)}
                            className="remove-slot-button"
                        >
                            Remove Slot
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addAvailabilitySlot}
                    className="add-slot-button"
                >
                    Add Availability Slot
                </button>

                <button type="submit" className="submit-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Profile;
