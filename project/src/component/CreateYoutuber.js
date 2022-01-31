import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function CreateYoutuber(props) {
    const { onDrawerToggle } = props;

    const theme = createTheme();
    const navigate = useNavigate();

    const [channelName, setChannelName] = useState();

    const ChannelChange = (e) => {
        setChannelName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/youtubers/create` , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                youtuber : channelName
            })
        })
        .then(res => {
            if(res.ok){
                alert("생성 완료");
                navigate(-1);
            }
        })   
    }

    const goBack = () => {
        navigate(-1);        
    }
    
    return (
        <>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                <Grid container spacing={1} alignItems="center">
                    <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onDrawerToggle}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs>
                    <Typography color="inherit" variant="h5" component="h1">
                        유튜버 추가하기
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="channel"
                                label="채널명 예시"
                                name="channel"
                                InputProps={{
                                    readOnly: true,
                                  }}
                                value={"지피티"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="channel"
                                label="채널명"
                                name="channel"
                                value={channelName} onChange={ChannelChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        추가하기
                        </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button variant="text" onClick={goBack}>뒤로가기</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}