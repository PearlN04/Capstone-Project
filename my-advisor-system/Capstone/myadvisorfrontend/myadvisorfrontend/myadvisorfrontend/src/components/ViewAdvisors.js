import React from "react";
import "./ViewAdvisors.css"; 

function ViewAdvisors() {
  
  const advisors = [
    {
      id: 1,
      name: "Advisor 1",
      specialization: "Computer Science",
      availability: [
        { day: "Monday", time: "10:00 AM - 12:00 PM" },
        { day: "Wednesday", time: "2:00 PM - 4:00 PM" },
      ],
    },
    {
      id: 2,
      name: "Advisor 2",
      specialization: "Business Computing",
      availability: [
        { day: "Tuesday", time: "11:00 AM - 1:00 PM" },
        { day: "Thursday", time: "3:00 PM - 5:00 PM" },
      ],
    },
    {
      id: 3,
      name: "Advisor 3",
      specialization: "Computer Engineering",
      availability: [{ day: "Friday", time: "9:00 AM - 11:00 AM" }],
    },
  ];

  return (
    <div className="view-advisors">
      <div className="container">
        <h2 className="title">Student Advisors</h2>

        <div className="advisors-grid">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="advisor-card">
              <h3 className="advisor-name">{advisor.name}</h3>
              <p className="specialization">
                <strong>Specialization:</strong> {advisor.specialization}
              </p>

              <h4 className="availability-title">Availability</h4>
              <ul className="availability-list">
                {advisor.availability.map((slot, index) => (
                  <li key={index} className="availability-item">
                    <strong>{slot.day}:</strong> {slot.time}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAdvisors;
