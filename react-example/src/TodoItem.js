import React from 'react';

export class TodoItem extends React.Component {
	constructor (props) {
		super(props);
	}
	changeCompleted () {
		let todoItem = this.props.todoItem;
		// only call the method if they provided one.
		if (this.props.completedStatusChange) {
			this.props.completedStatusChange(todoItem.id, !todoItem.isCompleted);
		}
	}
	
	deleteItem (event) {
		let todoItem = this.props.todoItem;
		// prevents the parent click event from firing as well
		event.stopPropagation();

		// only call the method if they provided one.
		if (this.props.deleteTodoItem) {
			this.props.deleteTodoItem(todoItem.id)
		}
		
	}
	render () {
		let todoItem = this.props.todoItem;
		let className = 'todo-item ' + (todoItem.isCompleted ? 'todo-completed' : '');
		return (
			<div className={ className } onClick={this.changeCompleted.bind(this)}>
				<div>{ todoItem.text }</div>
				<button type="button" onClick={this.deleteItem.bind(this)}>Delete</button>
			</div>
		)
	}
}