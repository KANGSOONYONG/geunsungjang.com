import * as React from 'react';
import { useState } from "react";
import useFetch from "../hooks/useFetch";

import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';

export default function NestedList() {
  const comments = useFetch('/api/comments');

  const [comment, setComment] = useState();
  
  const commentNumber = comments.length + 1;

  const limitComment = comments.slice(0, 6);

  const commentChange = (e) => {
    setComment(e.target.value)
}
  const handleSubmit = (e) => {
    e.preventDefault();

        fetch(`/api/comments/create` , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                comment : comment,
                number : commentNumber
            })
        })
        .then((res) => res.json())
        .then(res => {
            if(res.success){
                window.location.reload();
            }
        })
        .catch((err) => console.log(err));
}

  return (
  <>
    <FormControl component="form" onSubmit={handleSubmit} sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <ListItem>
        <TextField 
        fullWidth id="fullWidth" 
        variant="filled" 
        label="아무말이나 남기기" 
        value={comment} onChange={commentChange}
        />
        <Button type="submit" variant="contained">전송</Button>
      </ListItem>
    </FormControl>
    {limitComment.map((comment) => (
      <ListItem >
         <ListItemText primary={comment.comment} />
      </ListItem >
    ))}
  </>
  );
}