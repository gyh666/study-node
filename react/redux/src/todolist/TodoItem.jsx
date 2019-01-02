import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    const { content } = this.props;
    return (
      <div style={{margin: 20}} onClick={this.handleClick}>
        {content}
      </div>
    )
  }
  handleClick() {
    const { index, deleteItem } = this.props;
    deleteItem(index)
  }
}
