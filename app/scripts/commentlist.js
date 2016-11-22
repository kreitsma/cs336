
import React from 'react';
import Remarkable from 'remarkable';
import $ from 'jquery';

import Comment from './comment.js';

module.exports = React.createClass({
  render: function() {
		var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment id={comment.id} author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
