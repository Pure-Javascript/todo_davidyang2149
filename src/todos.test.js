describe('Todos', () => {
  test('Check addTodo able add todo to todos', () => {
    document.body.innerHTML = `
    <input id="newTodo" />
    <button id="addTodo">Add todo</button>
    <ol id="todos"></ol>
    `;

    const newTodo = document.getElementById('newTodo');
    const addTodo = document.getElementById('addTodo');
    const todolist = document.getElementById('todos');

    require('./todos.js');

    newTodo.value = 'New todo!';
    addTodo.click();

    expect(todolist.innerHTML).toBe('<li>New todo!</li>');
  });

});
