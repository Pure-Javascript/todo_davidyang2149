const getId = (value) => document.getElementById(value);

describe('Todos', () => {
  const indexPage = `
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

  JSON.parse = jest.fn().mockImplementationOnce(() => { });

  describe('with title & content', () => {
    test('success addTodo into todos', () => {
      document.body.innerHTML = indexPage;
      const title = getId('title');
      const content = getId('content');
      const addTodo = getId('addTodo');

      require('./todos.js');

      title.value = 'New todo title!';
      content.value = 'New todo content!';

      addTodo.click();

      // Dom rerender
      setTimeout(() => {
        const todos = getId('todos');
        expect(todos.innerHTML).toBe('<li>Title: New todo title! / Content: New todo content!</li>');
      }, 1000)
    });
  });

  describe('without title & content', () => {
    test('failed addTodo into todos', () => {
      document.body.innerHTML = indexPage;
      const title = getId('title');
      const content = getId('content');
      const addTodo = getId('addTodo');

      require('./todos.js');

      title.value = '';
      content.value = '';

      addTodo.click();

      setTimeout(() => {
        const todos = getId('todos');
        expect(todos.innerHTML).toBe('<li>Title: New todo title! / Content: New todo content!</li>');
      }, 1000)
    });
  });
});
