window.ToDoComponent = (function () {
	const template = `
		<div class="todo">
			<div class="todo-header">
				<form novalidate>
					<input type="text" class="todo-input" placeholder="Add todo" />
					<button type="submit">Add Todo item</button>
				</form>
			</div>
			<div class="todo-body">
			</div>
		</div>
	`;

	function create (containerElement) {
		if (!containerElement) {
			throw new Error('ToDoComponent.create requires html container as the first argument');
		}
		let todoItems = [];
		containerElement.innerHTML = template;

		const formElem = containerElement.querySelector('.todo-header > form');
		const inputElem = containerElement.querySelector('.todo-input');
		const todoBodyElem = containerElement.querySelector('.todo-body');

		formElem.addEventListener('submit', handleSubmit);


		function handleSubmit (event) {
			event.preventDefault();
			// trim() removes whitespace before or after the string
			const inputValue = inputElem.value.trim();
			if (inputValue) {
				const todoItem = {
					id: Math.random().toString(),
					isCompleted: false,
					text: inputValue
				};
				inputElem.value = '';
				addTodoItem(todoItem);
			}
		}

		function addTodoItem (todoItem) {
			todoItems.push(todoItem);
			const div = document.createElement('div');
			div.setAttribute('data-todo-item-id', todoItem.id);
			div.classList.add('todo-item');
			div.innerHTML = `
				<div class="todo-item-text">${ todoItem.text }</div>
				<button type="button" class="todo-delete-button">Delete</button>
			`;
			todoBodyElem.appendChild(div);
			const deleteButton = div.querySelector('.todo-delete-button');
			deleteButton.addEventListener('click', function (event) {
				console.log(event);
				deleteTodoItem(todoItem.id);
			});

			div.addEventListener('click', function () {
				todoItem.isCompleted = !todoItem.isCompleted;
				if (todoItem.isCompleted) {
					div.classList.add('todo-completed');
				} else {
					div.classList.remove('todo-completed');
				}
			})



		}

		function deleteTodoItem (id) {
			todoItems = todoItems.filter(todoItem => todoItem.id !== id);
			todoBodyElem.removeChild(todoBodyElem.querySelector(`.todo-item[data-todo-item-id="${id}"]`));
		}
	}
	return {
		create: create
	}
}) ();