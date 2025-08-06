import Layout from '../layout/Layout';
import authHoc from '../hoc/authHoc';
import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import {Box,Grid,Typography,Accordion,AccordionSummary,AccordionDetails, TextField, Button, MenuItem} from '@mui/material';
import { useForm } from "react-hook-form";





function Students() {
  const role = localStorage.getItem("role");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [backendErrors, setBackendErrors] = useState({});

  const {register, handleSubmit, reset, formState:{errors}}=useForm();

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      //console.log("API response:", response.data);

      let studentData = [];
      if (Array.isArray(response.data?.data)) {
        studentData = response.data.data; 
      } else if (response.data && typeof response.data === "object") {
        studentData = [response.data]; 
      }
      setStudents(studentData);
    } catch (error) {
      console.error("Error fetching students", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student) => {
      setEditStudent(student);  
      reset(student);
      setShowForm(true);      
    };

  useEffect(() => {
    fetchStudents();
  }, []);
  const onSubmit= async (data)=>{
    try{
      setBackendErrors({});
      if(editStudent){
          await api.put(`/students/${editStudent.id}`, data);
          console.log("Student updated:", data);
        }
        else{
          const response=await api.post("/students", data);
          console.log("Student created:", response.data);
        }
      fetchStudents();
      reset();
      setShowForm(false);

    }catch (error) {
    if (error.response && error.response.status === 422) {
      setBackendErrors(error.response.data.errors || {});
    } else {
      console.error("Error creating teacher:", error);
    }
  }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return; 
    try {
      await api.delete(`/students/${id}`);
      setStudents((prev) => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 900, margin: 'auto', padding: { xs: 2, sm: 3 },justifyContent:'center',alignItems:'center'}}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
        >
          Students List
        </Typography>
        {role === "admin" && (
        <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add Student"}
        </button>)}
        {showForm && (<Box sx={{ maxWidth: 600, margin: "20px auto", padding: 1, 
          border: "1px solid #ddd", borderRadius: 2, backgroundColor: "#fafafa" }}>
          <form onSubmit={handleSubmit(onSubmit)}>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {!editStudent && (
              <>
            <TextField label='Username'{...register('username',{required:"Username is required",minLength: { value: 3, message: "At least 3 characters" },pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Only letters, numbers, and underscores allowed" }})}
              error={!!errors.username || !!backendErrors.username}
              helperText={errors.username?.message || backendErrors.username?.[0]}/>

            <TextField label="Password"{...register('password',{required: "Password is required", 
              minLength: { value: 6, message: "At least 6 characters" }})}
              error={!!errors.password || !!backendErrors.password}
              helperText={errors.password?.message || backendErrors.password?.[0]}/>
            </>)}

            <TextField label='First Name'{...register('first_name',{required:"Firstname is required", minLength:{value:3,message:"Minimum 3 characters"}})}
            error={!!errors.first_name || !!backendErrors.first_name}
            helperText={errors.first_name?.message || backendErrors.first_name?.[0]}/>

            <TextField label='Last Name'{...register('last_name')}/>

            <TextField label='Email'{...register('email',{ required: "Email is required", 
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }})}
              error={!!errors.email || !!backendErrors.email}
              helperText={errors.email?.message || backendErrors.email?.[0]}/>

            <TextField label='Phone no'{...register('phoneno',{required: "Phone number is required", 
              pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" }})}
              error={!!errors.phoneno || !!backendErrors.phoneno}
              helperText={errors.phoneno?.message || backendErrors.phoneno?.[0]}/>

            <TextField label="Roll Number"{...register('rollno', {required: "Roll number is required",
              pattern: { value: /^[A-Za-z0-9]+$/, message: "Only letters and numbers allowed" }})}
              error={!!errors.rollno || !!backendErrors.rollno}
              helperText={errors.rollno?.message || backendErrors.rollno?.[0]}/>

            <TextField label="Class"{...register('class', {required: "Class is required"})}
              error={!!errors.class || !!backendErrors.class}
              helperText={errors.class?.message || backendErrors.class?.[0]}/>

            <TextField label="Date of Birth"type="date" InputLabelProps={{ shrink: true }}{...register('date_of_birth', {
              required: "Date of birth is required"})}
              error={!!errors.date_of_birth || !!backendErrors.date_of_birth}
              helperText={errors.date_of_birth?.message || backendErrors.date_of_birth?.[0]}/>
              
            <TextField label="Admission Date" type="date" InputLabelProps={{ shrink: true }}
              {...register('admission_date', {required: "Admission date is required"})}
              error={!!errors.admission_date || !!backendErrors.admission_date}
              helperText={errors.admission_date?.message || backendErrors.admission_date?.[0]}/>

            <TextField select label="Status" defaultValue=""{...register('status', { required: "Status is required" })}
              error={!!errors.status || !!backendErrors.status}
              helperText={errors.status?.message || backendErrors.status?.[0]}>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>

            <TextField label="Teacher ID" type="number"{...register('teacher_id', {
              required: "Teacher ID is required",valueAsNumber: true})}
              error={!!errors.teacher_id || !!backendErrors.teacher_id}
              helperText={errors.teacher_id?.message || backendErrors.teacher_id?.[0]}/>

            <Button type="submit" variant="contained" sx={{ backgroundColor: 'black' }}>
                            {editStudent ? "Update Student" : "Add Student"}</Button>
          </Box>
          </form>
        </Box>)}

        {loading ? (
          <Typography>Loading...</Typography>
        ) : students.length === 0 ? (
          <Typography>No students found</Typography>
        ) : (
          <Grid container spacing={10} justifyContent={'center'}>
            {students.map((student) => (
              <Grid item xs={12} sm={6} key={`student-${student.id}`}>
                  <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary >
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {student.first_name} {student.last_name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      
                      {role === "admin" && (<Button variant="outlined" size="small" color='black' onClick={() => handleEditClick(student)}>
                        Edit</Button>)}                      
                      <Typography>ID: {student.id}</Typography>
                      <Typography>Email: {student.email}</Typography>
                      <Typography>Phone: {student.phoneno}</Typography>
                      <Typography>Roll no: {student.rollno}</Typography>
                      <Typography>Class: {student.class}</Typography>
                      <Typography>Date of birth: {student.date_of_birth}</Typography>
                      <Typography>Admission Date: {student.admission_date}</Typography>
                      <Typography>Status: {student.status}</Typography>
                      {role === "admin" && (<Button variant="outlined" color="black" 
                          onClick={() => handleDelete(student.id)}>Delete</Button>)}            
                    </AccordionDetails>
                  </Accordion>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}

export default authHoc(Students);
