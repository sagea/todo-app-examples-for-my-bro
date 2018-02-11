const containerElem = document.querySelector('.todo');
const formElem = containerElem.querySelector('.todo-header > form');
const inputElem = containerElem.querySelector('.todo-input');
const todoBodyElem = containerElem.querySelector('.todo-body');

let todoList = [];
formElem.addEventListener('submit', function (event) {
	event.preventDefault();
	todoList.push({
		id: Math.random().toString(), // generates a random number
		isCompleted: false,
		text: inputElem.value
	});
	inputElem.value = '';
	render();
});

function render () {
	let html = '';
	todoList.forEach(function (todoItem) {
		html += `
			<div data-todo-item-id="${ todoItem.id }" class="todo-item ${ todoItem.isCompleted ? 'todo-completed': '' }">
				<div class="todo-item-text">${ todoItem.text }</div>
				<button type="button" class="todo-delete-button">Delete</button>
			</div>
		`;
	});

	// While this works, this is not performent. re-rendering all items everytime we delete or
	// complete a item is horrible
	todoBodyElem.innerHTML = html;
	
	todoBodyElem.querySelectorAll('.todo-item').forEach(function (todoItemElem) {
		let elemId = todoItemElem.getAttribute('data-todo-item-id');
		todoItemElem.querySelector('.todo-delete-button').addEventListener('click', function (event) {
			event.stopPropagation();
			todoList = todoList.filter(function (todoItem) {
				return todoItem.id !== elemId
			});
			render();
		});

		todoItemElem.addEventListener('click', function () {
			todoList.forEach(function (todoItem) {
				if (todoItem.id === elemId) {
					todoItem.isCompleted = !todoItem.isCompleted;
				}
			});

			render();
		})
	})
}