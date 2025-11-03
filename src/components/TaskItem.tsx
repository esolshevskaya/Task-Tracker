import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../types';
import '../styles/TaskItem.css';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdateTitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleEdit = () => {
        if (!task.completed) {
            setIsEditing(true);
            setEditTitle(task.title);
        }
    };

    const handleSave = () => {
        const trimmedTitle = editTitle.trim();
        if (trimmedTitle && trimmedTitle !== task.title) {
            onUpdateTitle(task.id, trimmedTitle);
        } else if (!trimmedTitle) {
            setEditTitle(task.title);
        }
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditTitle(task.title);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setIsEditing(false);
    };

    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                disabled={isEditing}
            />

            {isEditing ? (
                <div className="edit-container">
                    <input
                        ref={inputRef}
                        type="text"
                        className="todo-edit-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Введите название задачи..."
                    />
                    <div className="edit-actions">
                        <button
                            className="save-btn"
                            onClick={handleSave}
                            title="Сохранить"
                        >
                            ✓
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={handleCancel}
                            title="Отменить"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ) : (
                <span className={`todo-text ${task.completed ? 'completed-text' : ''}`}>
                    {task.title}
                </span>
            )}

            {!isEditing && (
                <div className="task-actions">
                    <button
                        className="edit-btn"
                        onClick={handleEdit}
                        disabled={task.completed}
                        title="Редактировать задачу"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task.id)}
                        title="Удалить задачу"
                    >
                        Удалить
                    </button>
                </div>
            )}
        </li>
    );
};

export default TaskItem;