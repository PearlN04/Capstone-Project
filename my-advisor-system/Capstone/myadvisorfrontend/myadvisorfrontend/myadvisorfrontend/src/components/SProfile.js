import React, { useState, useEffect } from "react";

function StudentProfile() {
  const [student, setStudent] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    enrolledCourses: ["CS101", "CS102"],
    appointments: [
      {
        id: 1,
        advisor: "Aslam",
        date: "2024-09-13",
        time: "21:44",
        note: "Need help with CS101",
        reply: "Sure, let's meet!",
      },
      {
        id: 2,
        advisor: "Jane Smith",
        date: "2024-09-20",
        time: "10:00",
        note: "Want to discuss career options",
        reply: "",
      },
    ],
  });

  const [editing, setEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch the student profile from API here (if needed)
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setUpdatedInfo({ name: student.name, email: student.email });
  };

  const handleSave = () => {
    setStudent({ ...student, ...updatedInfo });
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Student Profile</h1>

      {!editing ? (
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {student.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {student.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Enrolled Courses:</span>{" "}
            {student.enrolledCourses.join(", ")}
          </p>

          <h2 className="text-xl font-semibold mt-6">Appointments</h2>
          <ul className="space-y-4">
            {student.appointments.map((appointment) => (
              <li key={appointment.id} className="p-4 bg-gray-100 rounded-lg">
                <p>
                  <span className="font-semibold">Advisor:</span>{" "}
                  {appointment.advisor}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {appointment.date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {appointment.time}
                </p>
                <p>
                  <span className="font-semibold">Note:</span>{" "}
                  {appointment.note}
                </p>
                <p>
                  <span className="font-semibold">Reply:</span>{" "}
                  {appointment.reply || "No reply yet"}
                </p>
              </li>
            ))}
          </ul>

          <button
            onClick={handleEdit}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">Name:</label>
            <input
              type="text"
              value={updatedInfo.name}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, name: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Email:</label>
            <input
              type="email"
              value={updatedInfo.email}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, email: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
