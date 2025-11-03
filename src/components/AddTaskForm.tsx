import React, { useState } from 'react';
import '../styles/AddTaskForm.css';

interface AddTaskFormProps {
    onAdd: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название задачи..."
            />
            <button type="submit">Добавить</button>
        </form>
    );
};

export default AddTaskForm;