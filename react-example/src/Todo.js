import React from 'react';
import { TodoItem } from './TodoItem';

export class Todo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			todoList: [],
			inputValue: ''
		};
	}

	handleInputChange (event) {
		this.setState({
			inputValue: event.target.value
		});
	}

	handleFormSubmit (event) {
		event.preventDefault();

		this.addTodoItem();

	}

	addTodoItem () {
		this.setState({
			todoList: this.state.todoList.concat({
				id: Math.random().toString(),
				text: this.state.inputValue,
				isCompleted: false
			}),

			inputValue: ''
		});
	}

	deleteTodoItem (id) {
		this.setState({
			todoList: this.state.todoList.filter(function (todoItem) {
				return todoItem.id !== id;
			})
		});
	}

	selectTodoItem (id, isCompleted) {
		this.setState({
			todoList: this.state.todoList.map(function (todoItem) {
				if (todoItem.id === id) {
					todoItem.isCompleted = isCompleted;
				}
				return todoItem;
			})
		})
	}

	render () {
		const todoItems = this.state.todoList.map((todoItem, index) => {
			return <TodoItem
				todoItem={todoItem}
				deleteTodoItem={this.deleteTodoItem.bind(this)}
				completedStatusChange={ this.selectTodoItem.bind(this) }
				key={index}/>
		});
		return (
			<div className="todo">
				<div className="todo-header">
					<form onSubmit={this.handleFormSubmit.bind(this)} noValidate>
						<input type="text" value={ this.state.inputValue } onChange={ this.handleInputChange.bind(this) } />
						<button type="submit">Add Todo Item</button>
					</form>
				</div>
				<div className="todo-body">
					{ todoItems }
				</div>
			</div>
		)
	}
} 