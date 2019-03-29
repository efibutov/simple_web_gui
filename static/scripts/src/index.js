import React from 'react';
import ReactDOM from 'react-dom';
import LocalGUI from "./local-gui";
require('./app.scss');

ReactDOM.render(
    <LocalGUI/>,
    document.getElementById('app')
);
