const getId = (value) => document.getElementById(value);
const getClasses = (value) => document.getElementsByClassName(value);

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
      const todos = getId('todos');

      require('./todos.js');

      title.value = 'New todo title!';
      content.value = 'New todo content!';

      addTodo.click();

      expect(todos).toBe('<li>Title: New todo title! / Content: New todo content!</li>');
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

      const todos = getId('todos');
      expect(todos.innerHTML).toBe('');
    });
  });

  describe('complete task', () => {
    test('click complete', () => {
      document.body.innerHTML = indexPage;
      const todos = getId('todos');

      todos.innerHTML = `
        <li id="1">
        Title: New todo title! / Content: New todo content!
          <label>
            <input class="done" type="checkbox"  data-id="1" />
            Complete
          </label>
        </li>
      `;

      require('./todos.js');

      const doneButton = getClasses('done')[0];

      doneButton.click();
      expect(doneButton.value).toBe('on');
    });
  });
});
