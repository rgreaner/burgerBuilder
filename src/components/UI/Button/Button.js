import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
    className={[classes.Button, classes[props.btnType]].join(' ')}
        //Array with first item being the Button class. Second item is the dynamically filled btnType class (.Success/.Danger). Finally, .join makes the list of strings (array) one long string.
    onClick={props.clicked}>
        {props.children}
    </button>
        //Make button work as a regular button but wrap the content with custom button styling.
);

export default button;