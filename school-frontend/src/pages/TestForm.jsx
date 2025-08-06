import React from 'react';
import { useForm } from "react-hook-form";

function TestForm(){
    const {register, handleSubmit,formState:{errors}}=useForm();
    const onSubmit=(data)=>{
        console.log("data",data)
    }
    return(<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' {...register('first_name')}/>
            <button type='submit'>Submit</button>
        </form>
    </>);
}
export default TestForm;