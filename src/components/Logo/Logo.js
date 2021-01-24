import React from 'react';

import {Link} from 'react-router-dom'

import classes from './Logo.css';
import LogoImage from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className= {classes.Logo} style= {{height: props.height}} >
        <Link to= '/' >
        <img src = {LogoImage} alt='logo loading' />
        </Link>
    </div>
);

export default logo;