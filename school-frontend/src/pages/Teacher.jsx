import Layout from '../layout/Layout';
import authHoc from '../hoc/authHoc';
import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import {Box,Grid,Typography,Accordion,AccordionSummary,AccordionDetails,TextField, MenuItem, Button} from '@mui/material';
import { useForm } from 'react-hook-form';


function Teachers() {
    const role = localStorage.getItem("role");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editTeacher, setEditTeacher] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const {register, handleSubmit, reset, formState:{errors}}=useForm();

    const fetchTeachers = async (pageNumber = 1) => {
      try {
        const response = await api.get(`/teachers?page=${pageNumber}`);
        setTeachers(response.data.data); 
        setPage(response.data.current_page);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error("Error fetching teachers", error);
      } finally {
        setLoading(false);
      }
    };

    const handleEditClick = (teacher) => {
      setEditTeacher(teacher);  
      reset(teacher);
      setShowForm(true);      
    };

    useEffect(() => {
        fetchTeachers(1);
    }, []);

    const onSubmit= async (data)=>{
      try{
        if(editTeacher){
          await api.put(`/teachers/${editTeacher.id}`, data);
          console.log("Teacher updated:", data);
        }
        else{
          const response=await api.post("/teachers", data);
          console.log("Teacher created:", response.data);
        }
        fetchTeachers();
        reset();
        setEditTeacher(null);
        setShowForm(false);

      }catch(error){
        console.error("Error saving teacher:", error);
      }
    }
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this teacher?")) return;
  
      try {
        await api.delete(`/teachers/${id}`);
        setTeachers((prev) => prev.filter(t => t.id !== id));
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    };


  return (
    <Layout>
      <Box sx={{ maxWidth: 900, margin: 'auto', padding: { xs: 2, sm: 3 },justifyContent:'center',alignItems:'center'}}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
        >
          Teachers List
        </Typography>

        {role === "admin" && (
        <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add Teacher"}
        </button>)}
        {showForm && (<Box sx={{ maxWidth: 600, margin: "20px auto", padding: 1, 
          border: "2px solid #ddd", borderRadius: 2, backgroundColor: "#fafafa" }}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {!editTeacher && (
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

              <TextField label="Subject"{...register('subject', {required: "Subject is required"})}
                error={!!errors.subject || !!backendErrors.subject}
                helperText={errors.subject?.message || backendErrors.subject?.[0]}/>

              <TextField label="Employee ID"{...register('emp_id', {required: "Employee ID is required",
                pattern: { value: /^[A-Za-z0-9]+$/, message: "Only letters and numbers allowed" }})}
                error={!!errors.emp_id || !!backendErrors.emp_id}
                helperText={errors.emp_id?.message || backendErrors.emp_id?.[0]}/>

              <TextField label="Date of Join" type="date" InputLabelProps={{ shrink: true }}{...register('date_of_join', {
                required: "Date of join is required"})}
                error={!!errors.date_of_join || !!backendErrors.date_of_join}
                helperText={errors.date_of_join?.message || backendErrors.date_of_join?.[0]}/>
              
              <TextField select label="Status" defaultValue=""{...register('status', { required: "Status is required" })}
                error={!!errors.status || !!backendErrors.status}
                helperText={errors.status?.message || backendErrors.status?.[0]}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>

              <Button type="submit" variant="contained" sx={{ backgroundColor: 'black' }}>
                {editTeacher ? "Update Teacher" : "Add Teacher"}</Button>

            </Box>
          </form>
        </Box>)}



        {loading ? (
          <Typography>Loading...</Typography>
        ) : teachers.length === 0 ? (
          <Typography>No teachers found</Typography>
        ) : (
          <Grid container spacing={10} justifyContent={'center'}>
            {teachers.map((teacher) => (
              <Grid item xs={12} sm={6} key={`teacher-${teacher.id}`}>
                  <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary >
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {teacher.first_name} {teacher.last_name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {role === "admin" && (<Button variant="outlined" size="small" color='black' onClick={() => handleEditClick(teacher)}>
                        Edit</Button>)}

                      <Typography>ID: {teacher.id}</Typography>
                      <Typography>Email: {teacher.email}</Typography>
                      <Typography>Phone: {teacher.phoneno}</Typography>
                      <Typography>Employee ID: {teacher.emp_id}</Typography>
                      <Typography>Subject: {teacher.subject}</Typography>
                      <Typography>Date of Join: {teacher.date_of_join}</Typography>
                      <Typography>Status: {teacher.status}</Typography>
                      {role === "admin" && (<Button variant="outlined" color="black" 
                          onClick={() => handleDelete(teacher.id)}>Delete</Button>)}

                    </AccordionDetails>
                  </Accordion>
                  
              </Grid>
            ))}
            
          </Grid>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button onClick={() => fetchTeachers(page - 1)} disabled={page === 1}>
            Prev</Button>
          <Typography sx={{ mx: 2 }}>Page {page} of {totalPages}</Typography>
          <Button onClick={() => fetchTeachers(page + 1)} disabled={page === totalPages}>
            Next</Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default authHoc(Teachers);
