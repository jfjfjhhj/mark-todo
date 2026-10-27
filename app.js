// 马克待办 - 交互逻辑
// 数据保存在浏览器 localStorage 中，刷新页面不会丢失。

const STORAGE_KEY = 'mark-todo.items';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyTip = document.getElementById('todo-empty');

let items = loadItems();

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.addEventListener('change', () => toggleItem(index));

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = item.text;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '删除';
    removeBtn.addEventListener('click', () => removeItem(index));

    li.append(checkbox, text, removeBtn);
    list.appendChild(li);
  });
  emptyTip.style.display = items.length === 0 ? 'block' : 'none';
}

function addItem(text) {
  items.push({ text: text, done: false });
  saveItems();
  render();
}

function toggleItem(index) {
  items[index].done = !items[index].done;
  saveItems();
  render();
}

function removeItem(index) {
  items.splice(index, 1);
  saveItems();
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addItem(text);
  input.value = '';
  input.focus();
});

render();
