import Layout from '../layout/Layout';
import authHoc from '../hoc/authHoc';
import React, { useState, useEffect } from 'react';
import api from "../api/axios";

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const fetchTeachers = async () => {
        try {
            const response = await api.get("/teachers");
            setTeachers(response.data.data); 
        } catch (error) {
            console.error("Error fetching teachers", error);
        }
    };
    const handleToggle = (id) => {
        setCurrentTeacher(currentTeacher === id ? null : id);
    };


    useEffect(() => {
        fetchTeachers();
    }, []);

  return (
    <Layout>
      <h2>Teachers List</h2>
      {teachers.map((teacher) => (
        <div key={teacher.id}>
          <div
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              margin: "5px 0"
            }}
            onClick={() => handleToggle(teacher.id)}
          >
            {teacher.first_name} {teacher.last_name}
          </div>
          {currentTeacher === teacher.id && (
            <div
              style={{
                marginLeft: "15px",
                background: "#f8f8f8",
                padding: "5px"
              }}>
              <p>ID:{teacher.id}</p>
              <p>Email: {teacher.email}</p>
              <p>Phone: {teacher.phoneno}</p>
              <p>Subject: {teacher.subject}</p>
              <p>Employee ID: {teacher.emp_id}</p>
              <p>Date of Join: {teacher.date_of_join}</p>
              <p>Status: {teacher.status}</p>
            </div>
          )}
        </div>
      ))}

    </Layout>
  );
}

export default authHoc(Teachers);
