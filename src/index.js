import { crearTodoHtml } from "./js/componentes";
import "./styles.css";
import { Todo, TodoList } from "./classes/";

export const todoList = new TodoList();

/* const tarea = new Todo("Aprender Javascript!");

todoList.nuevoTodo(tarea); */

/* tarea.completado = true; */

/* crearTodoHtml(tarea); */

/* console.log(todoList); */

localStorage.setItem("mi-key", "ABC1234");

/* setTimeout(() => {
  localStorage.removeItem("mi-key");
}, 1500);
 */

todoList.todos.forEach((todo) => crearTodoHtml(todo));

console.log(todoList.todos);

/* todoList.todos.forEach(crearTodoHtml); Funciona de la misma manera, solo funciona así cuando utilizamos un solo argumento*/
