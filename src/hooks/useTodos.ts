import * as SQLite from 'expo-sqlite';
import { useMemo } from 'react';

export type Todo = {
  id: number;
  title: string;
  todo_date: string;
  todo_time: string;
  priority: string;
  completed: number;
  notification_id?: string;
};

export type TodoSummary = {
  date: string;
  total: number;
  completed: number;
};

// ✅ API BARU (SDK 54)
const db = SQLite.openDatabaseSync('todos.db');

export function useTodos() {
  // 🔹 INIT DB
  const initDB = () => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          todo_date TEXT NOT NULL,
          todo_time TEXT,
          priority TEXT,
          completed INTEGER,
          notification_id TEXT
        );
      `);

      // Add notification_id column if it doesn't exist (for existing tables)
      try {
        db.execSync(`ALTER TABLE todos ADD COLUMN notification_id TEXT;`);
      } catch (err) {
        // Column already exists, ignore error
      }
    } catch (error) {
      console.error('❌ Error initializing database:', error);
    }
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
    notificationId?: string;
  }) => {
    db.runSync(
      `INSERT INTO todos (title, todo_date, todo_time, priority, completed, notification_id)
       VALUES (?, ?, ?, ?, 0, ?)`,
      [todo.title, todo.date, todo.time, todo.priority, todo.notificationId || null]
    );
  };

  // 🔹 TOGGLE
  const toggleTodo = (id: number, completed: boolean) => {
    db.runSync(
      `UPDATE todos SET completed = ? WHERE id = ?`,
      [completed ? 1 : 0, id]
    );
  };

  // 🔹 DAILY SUMMARY (for calendar + stats)
  const getDailySummary = (): TodoSummary[] => {
    const rows = db.getAllSync<{
      todo_date: string;
      total: number;
      completed: number;
    }>(
      `
      SELECT
        todo_date,
        COUNT(*) as total,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed
      FROM todos
      GROUP BY todo_date
      ORDER BY todo_date DESC;
    `
    );

    return rows.map(row => ({
      date: row.todo_date,
      total: row.total,
      completed: row.completed ?? 0,
    }));
  };

  // 🔹 GET ONE
  const getTodoById = (id: number): Todo | null => {
    const row = db.getFirstSync<Todo>(
      `SELECT * FROM todos WHERE id = ? LIMIT 1`,
      [id]
    );
    return row ?? null;
  };

  // 🔹 UPDATE
  const updateTodo = (todo: {
    id: number;
    title: string;
    time: string;
    priority: string;
    notificationId?: string;
  }) => {
    db.runSync(
      `UPDATE todos
       SET title = ?, todo_time = ?, priority = ?, notification_id = ?
       WHERE id = ?`,
      [todo.title, todo.time, todo.priority, todo.notificationId || null, todo.id]
    );
  };

  // 🔹 DELETE
  const deleteTodo = (id: number) => {
    db.runSync(`DELETE FROM todos WHERE id = ?`, [id]);
  };

  // 🔹 GET OVERDUE HIGH PRIORITY TODOS
  const getOverdueHighPriorityTodos = (): Todo[] => {
    const now = new Date();
    const currentDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const result = db.getAllSync<Todo>(
      `SELECT * FROM todos 
       WHERE priority = 'high' 
       AND completed = 0
       AND todo_date = ?
       AND todo_time <= ?
       ORDER BY todo_time ASC`,
      [currentDateStr, currentTimeStr]
    );
    
    return result || [];
  };

  // 🔹 INIT ONCE
  initDB();

  // memoize so callers get stable references (avoids effect loops)
  return useMemo(
    () => ({
      fetchTodosByDate,
      insertTodo,
      toggleTodo,
      getDailySummary,
      getTodoById,
      updateTodo,
      deleteTodo,
      getOverdueHighPriorityTodos,
    }),
    []
  );
}
