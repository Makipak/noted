import * as SQLite from 'expo-sqlite';

export type Todo = {
  id: number;
  title: string;
  todo_date: string;
  todo_time: string;
  priority: string;
  completed: number;
};

// ✅ API BARU (SDK 54)
const db = SQLite.openDatabaseSync('todos.db');

export function useTodos() {
  // 🔹 INIT DB
  const initDB = () => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        todo_date TEXT NOT NULL,
        todo_time TEXT,
        priority TEXT,
        completed INTEGER
      );
    `);
  };

  // 🔹 FETCH
  const fetchTodosByDate = (
    date: string,
    setTodos: (todos: Todo[]) => void
  ) => {
    const result = db.getAllSync<Todo>(
      `SELECT * FROM todos WHERE todo_date = ? ORDER BY todo_time ASC`,
      [date]
    );
    setTodos(result);
  };

  // 🔹 INSERT (ASYNC-SAFE)
  const insertTodo = async (todo: {
    title: string;
    date: string;
    time: string;
    priority: string;
  }) => {
    db.runSync(
      `INSERT INTO todos (title, todo_date, todo_time, priority, completed)
       VALUES (?, ?, ?, ?, 0)`,
      [todo.title, todo.date, todo.time, todo.priority]
    );
  };

  // 🔹 TOGGLE
  const toggleTodo = (id: number, completed: boolean) => {
    db.runSync(
      `UPDATE todos SET completed = ? WHERE id = ?`,
      [completed ? 1 : 0, id]
    );
  };

  // 🔹 INIT ONCE
  initDB();

  return {
    fetchTodosByDate,
    insertTodo,
    toggleTodo,
  };
}
