const context = global;

describe('Todos', () => {
  describe('with title & content', () => {
    test('addTodo into todos', () => {
      document.body.innerHTML = `
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label for="content">Content</label>
        <input type="text" id="content" />
      </div>
  
      <button id="addTodo">Add todo</button>
      <ol id="todos"></ol>
      `;

      const title = document.getElementById('title');
      const content = document.getElementById('content');
      const addTodo = document.getElementById('addTodo');
      const todos = document.getElementById('todos');

      require('./todos.js');

      title.value = 'New todo title!';
      content.value = 'New todo content!';

      addTodo.click();

      expect(todos.innerHTML).toBe('<li>Title: New todo title! / Content: New todo content!</li>');
    });
  });

  describe('without title & content', () => {
    test('addTodo into todos', () => {
      document.body.innerHTML = `
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label for="content">Content</label>
        <input type="text" id="content" />
      </div>
  
      <button id="addTodo">Add todo</button>
      <ol id="todos"></ol>
      `;

      const title = document.getElementById('title');
      const content = document.getElementById('content');
      const addTodo = document.getElementById('addTodo');
      const todos = document.getElementById('todos');

      require('./todos.js');

      title.value = '';
      content.value = '';

      addTodo.click();

      expect(todos.innerHTML).not.toBe('<li>Title: New todo title! / Content: New todo content!</li>');
    });
  });
});
