import React, { useState, useMemo, useEffect } from 'react'
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterPanel from './components/FilterPanel';
import TrashBin from './components/TrashBin';
import DeletedTasksModal from './components/DeletedTaskModal';
import Notification from './components/Notification';
import { Task, FilterType, NotificationState } from './types';

// Начальные данные для демонстрации
const initialTasks: Task[] = [
    { id: '1', title: 'Изучить React', completed: false },
    { id: '2', title: 'Разобраться с переводом сайта на TypeScript', completed: false },
    { id: '3', title: 'Сделать красивый, удобный и интуитивно понятный таск-менеджер для управления творческими проектами, позволяющий добавлять новые идеи, редактировать концепции, отмечать завершённые этапы работы и перемещать в корзину неудачные задумки', completed: true },

];

const initialDeletedTasks: Task[] = [
    { id: '4', title: 'Доделать лендинг', completed: false },
    { id: '5', title: 'Поменять дизайн кнопок в Фигме', completed: true },
    { id: '6', title: 'Тестирование адаптивок', completed: false }
];

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : initialTasks;
    });

    const [deletedTasks, setDeletedTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('deletedTasks');
        return saved ? JSON.parse(saved) : initialDeletedTasks;
    });

    const [filter, setFilter] = useState<FilterType>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        isVisible: false
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    }, [deletedTasks]);

    const showNotification = (message: string) => {
        setNotification({ message, isVisible: true });
    };

    const hideNotification = () => {
        setNotification({ ...notification, isVisible: false });
    };

    const addTask = (title: string) => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        const existingTask = tasks.find(task =>
            task.title.toLowerCase() === trimmedTitle.toLowerCase()
        );

        if (existingTask) {
            showNotification(`Задача "${trimmedTitle}" уже существует в списке!`);
            return;
        }

        const newTask: Task = {
            id: Date.now().toString(),
            title: trimmedTitle,
            completed: false
        };

        setTasks(prev => [...prev, newTask]);
    };

    const deleteTask = (id: string) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (taskToDelete) {
            setTasks(prev => prev.filter(task => task.id !== id));
            setDeletedTasks(prev => [...prev, taskToDelete]);
        }
    };

    const restoreTask = (task: Task) => {
        setDeletedTasks(prev => prev.filter(t => t.id !== task.id));
        setTasks(prev => [...prev, task]);
    };

    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const updateTaskTitle = (id: string, newTitle: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    const sortedTasks = useMemo(() => {
        const sorted = [...tasks];

        return sorted.sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return 0;
        });
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'active':
                return sortedTasks.filter(task => !task.completed);
            case 'completed':
                return sortedTasks.filter(task => task.completed);
            default:
                return sortedTasks;
        }
    }, [sortedTasks, filter]);

    const remainingTasks = tasks.filter(task => !task.completed).length;

    return (
        <div className="app-container">
            <div className="content-container">
                <h1 className="app-title">Список задач</h1>

                <div className="controls-wrapper">
                    <AddTaskForm onAdd={addTask} />
                    <FilterPanel filter={filter} setFilter={setFilter} />
                </div>

                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdateTitle={updateTaskTitle}
                />

                <div className="footer-container">
                    <div className="remaining-todos">
                        Осталось задач: {remainingTasks}
                    </div>
                    <TrashBin
                        deletedTasks={deletedTasks}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                {notification.isVisible && (
                    <Notification
                        message={notification.message}
                        onClose={hideNotification}
                    />
                )}

                {isModalOpen && (
                    <DeletedTasksModal
                        deletedTasks={deletedTasks}
                        onRestore={restoreTask}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;