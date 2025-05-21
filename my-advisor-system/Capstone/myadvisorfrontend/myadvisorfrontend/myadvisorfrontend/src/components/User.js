import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import Button from '@mui/material/Button';



export default function User() {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')

    const handleClick=(e)=>{e.preventDefault()
        const user={
            name: name,
            surname: surname,
            email: email,
            role: role}
        console.log(user)
        fetch("http://localhost:8080/user/add",
            {method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
        .then(()=>{
            console.log("New user added")
        })
    }
 
}

