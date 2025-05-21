import React, { useState, useEffect } from "react";
import "./BookAppointment.css";

function BookAppointment() {
  const [advisors, setAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [note, setNote] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch advisor details from the backend
    const fetchAdvisors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/advisors/getName"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Attempt to parse the response as JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setAdvisors(data);
          console.log(data);
        } else {
          const text = await response.text();
          console.error("Unexpected content type:", contentType);
          console.error("Response text:", text);
        }
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    };

    fetchAdvisors();
  }, []);

  const handleTranscriptUpload = (e) => {
    setTranscript(e.target.files[0]);
  };

  const handleAppointmentBooking = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("advisor", selectedAdvisor);
    formData.append("date", appointmentDate);
    formData.append("note", note);
    formData.append("message", message);
    if (transcript) {
      formData.append("transcript", transcript);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/appointments/book",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book the appointment.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-heading">Book Appointment</h1>
      <form className="appointment-form" onSubmit={handleAppointmentBooking}>
        <label htmlFor="advisor">Select Advisor:</label>
        <select
          id="advisor"
          value={selectedAdvisor}
          onChange={(e) => setSelectedAdvisor(e.target.value)}
        >
          <option value="">Select Advisor</option>
          {advisors.map((advisor) => (
            <option key={advisor.id} value={advisor.id}>
              {advisor}
            </option>
          ))}
        </select>

        <label htmlFor="appointmentDate">Date and Time:</label>
        <input
          type="datetime-local"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Additional information or requests..."
        />

        <label htmlFor="transcript">Upload Transcript:</label>
        <input
          type="file"
          id="transcript"
          accept=".pdf, .docx, .jpg"
          onChange={handleTranscriptUpload}
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;
