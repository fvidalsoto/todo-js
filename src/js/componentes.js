//REFERENCIAS EN EL HTML

import { todoList } from "..";
import { Todo } from "../classes";

const divTodoList = document.querySelector(".todo-list");
const textInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltors = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
          <li class="${todo.completado ? "completed" : " "}" data-id="${
    todo.id
  }">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completado ? "checked" : " "} >
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li> `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

//Eventos
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && textInput.value.length > 0) {
    console.log(textInput.value);
    const nuevoTodo = new Todo(textInput.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodoHtml(nuevoTodo);
    textInput.value = "";
  }
});

divTodoList.addEventListener("click", function (event) {
  const nombreElemento = event.target.localName; // input, label, button
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");

  if (nombreElemento.includes("input")) {
    // click en el check
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    // hay que borrar el todo

    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
});

btnBorrar.addEventListener("click", () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltors.addEventListener("click", (e) => {
  console.log(e.target.text);

  const filtro = e.target.text;
  if (!filtro) {
    return;
  }

  anchorFiltros.forEach((elem) => elem.classList.remove("selected"));

  for (const elemento of divTodoList.children) {
    elemento.classList.remove("hidden");
    const completado = elemento.classList.contains("completed");
    e.target.classList.add("selected");

    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});
