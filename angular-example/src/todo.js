
export const todoComponent = {
	template: `
		<div class="todo">
			<div class="todo-header">
				<form novalidate ng-submit="$ctrl.handleSubmit($event)">
					<input type="text" class="todo-input" ng-model="$ctrl.inputValue" placeholder="Add todo" />
					<button type="submit">Add Todo item</button>
				</form>
			</div>
			<div class="todo-body">
				<div class="todo-item" ng-class="todoItem.isCompleted ? 'todo-completed': ''" ng-repeat="todoItem in $ctrl.todoList" ng-click="$ctrl.setCompletedStatus(todoItem.id, !todoItem.isCompleted)">
					<div class="todo-item-text">{{ todoItem.text }}</div>
					<button type="button" class="todo-delete-button" ng-click="$ctrl.deleteTodoItem($event, todoItem.id)">Delete</button>
				</div>
			</div>
		</div>
	`,
	controller: function () {
		this.todoList = [];
		this.inputValue = '';

		this.handleSubmit = function (event) {
			event.preventDefault();
			this.addTodoItem();
			this.inputValue = '';
		};

		this.addTodoItem = function () {
			this.todoList.push({
				id: Math.random().toString(),
				text: this.inputValue,
				isCompleted: false
			});
		};

		this.deleteTodoItem = function (event, id) {
			event.stopPropagation();
			this.todoList = this.todoList.filter(function (todoItem) {
				return todoItem.id !== id;
			})
		};

		this.setCompletedStatus = function (id, isCompleted) {
			this.todoList.forEach(function (todoItem) {
				if (todoItem.id === id) {
					todoItem.isCompleted = isCompleted;
				}
			});
		}
	}
};
