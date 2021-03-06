let todos = [];
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $form = document.querySelector('.form');
const $activeTodos = document.querySelector('.active-todos');
const $clearBtn = document.querySelector('.btn');
let clearCnt = 0;
const $completeAll = document.querySelector('.complete-all');
const $ckCompleteAll = document.querySelector('#ck-complete-all');


const render = () => {
    $todos.innerHTML = todos.map(({id,content,completed}) => {
        return `<li id="${id}" class="todo-item">
        <input id="ck-${id}" class="checkbox" type="checkbox"${completed ? 'checked':''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`
    }).join('');
    $activeTodos.textContent = todos.length; // items left 숫자
}

const getTodos = () => {
    todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: false },
      { id: 3, content: 'Javascript', completed: false }
    ].sort((todo1,todo2)=> todo2.id - todo1.id);
    render(); 
  };

// id를 자동으로 증가시켜주는 함수 
const updateId = () => Math.max(...todos.map(todo => todo.id),0)+1;

// 내용추가해주는 함수
const addTodo = content => {
  todos = [{id:updateId(), content,completed:false},...todos];
  render();
}

// 내용 삭제해주는 함수
const removeTodo = id => {
  todos = todos.filter(todo =>todo.id !== +id);
  render();
}

$todos.onclick = e => {
  if(!e.target.classList.contains('remove-todo'))return;
  const id = e.target.parentNode.id;
  removeTodo(id);
}

// form 태그의 이벤트 onsubmit이용해서 enter를 누르면 todos에 내용추가
$form.onsubmit = e => {
  e.preventDefault();
  if($inputTodo.value == '')return; //input비어있는 상태일때 

  const content = $inputTodo.value;
  $inputTodo.value = '';
  addTodo(content);
}

// checkbox 클릭하면 true , 클릭해제하면 false
const chkBoxTodo = chkId => {
  if(!chkId === todos.id) return;
  todos = todos.map(todo => todo.id === +chkId ? {...todo, completed: !todo.completed} : todo);
}

// 이벤트 위임 onchange로 chekbox 부모 id 출력 
$todos.onchange = e => {
  const chkId = e.target.parentNode.id;
  chkBoxTodo(chkId);
}

// 전체 체크된 리스트 삭제후 check 버튼 클릭 해제 
const chkRelease = () => {
  $ckCompleteAll.checked = false
}

// click 되어 있는 리스트 Clearbtn누르면 제거되는 기능을 가진 함수  
const clearTodo = () => {
  todos = todos.filter(todo => todo.completed !== true)
  render();  
  chkRelease();
}

// clearbtn누르면 완료된 todo의 개수 카운트되어 기록
$clearBtn.onclick = () => {
  const $completedTodos = document.querySelector('.completed-todos');
  clearCnt += todos.filter(todo => todo.completed === true).length;
  $completedTodos.textContent = clearCnt; 
  clearTodo();
};

// 모든 리스트 체크
const allTodoChk = () => {
  todos = todos.map(todo => ({...todo, completed: true}))
  render();
}

// 모든 리스트 체크 해제
const allTodoUnChk = () => {
  todos = todos.map(todo => ({...todo, completed: false}))
  render();
} 

// 이벤트 위임 all complete check박스 클릭하면 리스트의 모든 checkbox클릭 
$completeAll.onchange = e => {
  e.target.checked === true ? allTodoChk() : allTodoUnChk();
}

document.addEventListener('DOMContentLoaded',getTodos);  