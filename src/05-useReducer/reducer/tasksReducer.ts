import * as z from "zod";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    total: number;
    pending: number;
    completed: number;
}

export type TaskAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number };

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    total: z.number(),
    pending: z.number(),
    completed: z.number()
});

export const getTasksInitialState = (): TaskState => {
    const localStorageState = localStorage.getItem('tasks-state');

    if (!localStorageState) {
        return {
            todos: [],
            total: 0,
            pending: 0,
            completed: 0,
        };
    }

    const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));

    if (result.error) {
        console.log(result.error);

        return {
            todos: [],
            total: 0,
            pending: 0,
            completed: 0,
        };
    }

    return result.data;
};

export const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };

            return {
                ...state,
                todos: [...state.todos, newTodo],
                total: state.todos.length + 1,
                pending: state.pending + 1,
            };
        }

        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);

            const pendingTodos = updatedTodos.filter(todo => todo.completed === false).length;

            return {
                ...state,
                todos: updatedTodos,
                total: updatedTodos.length,
                pending: pendingTodos,
                completed: updatedTodos.length - pendingTodos,
            };
        }
        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }

                return todo;
            });

            const pendingTodos = updatedTodos.filter(todo => todo.completed === false).length;

            return {
                ...state,
                todos: updatedTodos,
                pending: pendingTodos,
                completed: updatedTodos.length - pendingTodos,
            };
        }

        default: return state;
    }
}
