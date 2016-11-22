/******************************************/
/* Kyle Reitsma, CS 336, Lab 08           */
/******************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import CommentBox from './commentbox.js';
import CommentEdit from './commentedit';

import '../css/base.css';

ReactDOM.render((
  <Router history={browserHistory}>
        <Route path="/" component={CommentBox}/>
				<Route path="/:id" component={CommentEdit} />
    </Router>
	),
  document.getElementById('content')
);
