const { ipcRenderer } = require('electron');
const { v4: uuid } = require('uuid');

const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('task-modal');
const modalTitle = document.getElementById('modal-title');

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const darkToggle = document.getElementById('dark-mode-toggle');
const progressDisplay = document.getElementById('progress');
const filterButtons = document.querySelectorAll('.filter-btn');
const categorySelect = document.getElementById('task-category');
const categoryFilter = document.getElementById('category-filter');
const newCategoryInput = document.getElementById('new-category');

const manageBtn = document.getElementById('manage-categories');
const categoryDropdown = document.getElementById('category-dropdown');

let tasks = [];
let categories = ['School', 'Career', 'Wellness', 'Social', 'Errands'];
let isEditing = false;
let editTaskId = null;

loadFromStorage();
renderCategories();
renderTasks();

openModalBtn.addEventListener('click', () => {
  isEditing = false;
  editTaskId = null;
  resetModalForm();
  modalTitle.textContent = 'Add New Task';
  modal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  resetModalForm();
});

darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const deadline = new Date(document.getElementById('task-deadline').value);
  const urgency = parseInt(document.getElementById('task-urgency').value);
  const category = categorySelect.value;
  const newCat = newCategoryInput.value.trim();

  if (newCat && !categories.includes(newCat)) {
    categories.push(newCat);
  }

  if (isEditing) {
    const index = tasks.findIndex(t => t.id === editTaskId);
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        title,
        deadline,
        urgency,
        category: newCat || category,
        priority: calculatePriority(urgency, deadline)
      };
    }
  } else {
    const task = {
      id: uuid(),
      title,
      deadline,
      urgency,
      category: newCat || category,
      completed: false,
      priority: calculatePriority(urgency, deadline)
    };
    tasks.push(task);
  }

  isEditing = false;
  editTaskId = null;
  saveToStorage();
  renderTasks();
  updateProgress();
  modal.classList.add('hidden');
  resetModalForm();
});

categoryFilter.addEventListener('change', () => renderTasks());

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter;
    renderTasks(type);
  });
});

manageBtn.addEventListener('click', () => {
  categoryDropdown.classList.toggle('hidden');
  renderCategoryDropdown();
});

function renderCategories() {
  categorySelect.innerHTML = '';
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(cat => {
    const opt1 = new Option(cat, cat);
    const opt2 = new Option(cat, cat);
    categorySelect.appendChild(opt1);
    categoryFilter.appendChild(opt2);
  });
}

function renderCategoryDropdown() {
  categoryDropdown.innerHTML = '';

  categories.forEach((cat, i) => {
    const row = document.createElement('div');
    row.className = 'category-row';

    const input = document.createElement('input');
    input.value = cat;
    input.className = 'category-edit';

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.className = 'del-btn';
    delBtn.addEventListener('click', () => {
      categories.splice(i, 1);
      saveToStorage();
      renderCategories();
      renderCategoryDropdown();
      renderTasks();
    });

    input.addEventListener('change', () => {
      categories[i] = input.value;
      saveToStorage();
      renderCategories();
      renderCategoryDropdown();
      renderTasks();
    });

    row.appendChild(input);
    row.appendChild(delBtn);
    categoryDropdown.appendChild(row);
  });
}

function renderTasks(filter = null) {
  taskList.innerHTML = '';
  const now = new Date();
  let filtered = [...tasks];

  const selectedCategory = categoryFilter.value;
  if (selectedCategory) {
    filtered = filtered.filter(t => t.category === selectedCategory);
  }

  if (filter === 'today') {
    filtered = filtered.filter(t => sameDay(new Date(t.deadline), now));
  } else if (filter === 'upcoming') {
    filtered = filtered.filter(t => new Date(t.deadline) > now && !t.completed);
  } else if (filter === 'overdue') {
    filtered = filtered.filter(t => new Date(t.deadline) < now && !t.completed);
  } else if (filter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  filtered.sort((a, b) => b.priority - a.priority);

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task', urgencyClass(task.urgency));

    li.innerHTML = `
      <div class="task-header">
        <strong>${task.title}</strong>
        <div class="task-actions">
          <button type="button" class="edit-task" data-id="${task.id}">✏️</button>
          <button type="button" class="delete-task" data-id="${task.id}">🗑️</button>
        </div>
      </div>
      <div>
        📅 ${new Date(task.deadline).toLocaleString()} | 📂 ${task.category}
      </div>
      <br><input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}"> Mark as Done
    `;

    taskList.appendChild(li);
  });

  addTaskEventListeners();
  updateProgress();
}

function addTaskEventListeners() {
  taskList.querySelectorAll('input[type="checkbox"][data-id]').forEach(box => {
    box.addEventListener('change', () => {
      const task = tasks.find(t => t.id === box.dataset.id);
      task.completed = box.checked;
      saveToStorage();
      updateProgress();
    });
  });

  document.querySelectorAll('.edit-task').forEach(btn => {
    btn.addEventListener('click', () => {
      const task = tasks.find(t => t.id === btn.dataset.id);
      if (task) {
        isEditing = true;
        editTaskId = task.id;
        modalTitle.textContent = 'Edit Task';
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-deadline').value = new Date(task.deadline).toISOString().slice(0, 16);
        document.getElementById('task-urgency').value = task.urgency;
        document.getElementById('task-category').value = task.category;
        modal.classList.remove('hidden');
      }
    });
  });

  document.querySelectorAll('.delete-task').forEach(btn => {
    btn.addEventListener('click', () => {
      const confirmed = confirm('Are you sure you want to delete this task?');
      if (confirmed) {
        tasks = tasks.filter(t => t.id !== btn.dataset.id);
        saveToStorage();
        renderTasks();
        updateProgress();
      }
    });
  });
}

function resetModalForm() {
  taskForm.reset();
  isEditing = false;
  editTaskId = null;
  modalTitle.textContent = 'Add New Task';
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  progressDisplay.textContent = `Progress: ${percent}%`;
}

function sameDay(date1, date2) {
  return date1.toDateString() === date2.toDateString();
}

function urgencyClass(level) {
  return level === 3 ? 'high' : level === 2 ? 'medium' : 'low';
}

function calculatePriority(urgency, deadline) {
  const hoursLeft = (new Date(deadline) - Date.now()) / (1000 * 60 * 60);
  return Math.round((urgency * 1000) + Math.max(0, 1000 - hoursLeft));
}

function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('categories', JSON.stringify(categories));
}

function loadFromStorage() {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  categories = JSON.parse(localStorage.getItem('categories') || JSON.stringify(categories));
}
