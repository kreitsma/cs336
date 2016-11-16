/******************************************/
/* Kyle Reitsma, CS 336, Lab 08           */
/******************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import CommentBox from './commentbox.js';
import '../css/base.css';

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
