import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Form from "./Form";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { onDrawerToggle } = props;

  const youParams = useParams().youtuber;

  const item = useFetch(`/api/items/youtuber/${youParams}`);

  const userRole = localStorage.getItem('userRole');

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
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
                {youParams}
              </Typography>
            </Grid>
            {userRole === "1" ? (
              <>
              <Grid item>
                <Button
                  sx={{ borderColor: lightColor }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={handleClick}
                >
                  수정 / 삭제
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ borderColor: lightColor }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  component={Link}
                  to={`/createList/${youParams}`}
                >
                  항목 추가
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ borderColor: lightColor }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  component={Link}
                  to={`/createyoutuber`}
                >
                  유튜버 추가
                </Button>
              </Grid>
              </>
            ) : null }
            
          </Grid>
        </Toolbar>
      </AppBar>
      <List
        sx={{ bgcolor: 'background.paper', flex: 1, display: 'flex', flexDirection: 'column' }}
        component="div"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            코드 리스트 
          </ListSubheader>
        }
      >
      {item.map((item) => (
        <>
          <List key={item.id} component="div">
              {item.code !== null && 
              <ListItem>
                <Grid item xs={12} sm={2}>
                    <ListItemText primary={item.siteName} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <ListItemText primary={item.code} />
                </Grid>
              </ListItem>}
          </List>
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Form item={item}/>
          </Collapse>
        </>
      ))}
      </List>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;