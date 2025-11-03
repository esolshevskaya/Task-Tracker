import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';
import '../styles/TaskItem.css';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onUpdateTitle }) => {
    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdateTitle={onUpdateTitle}
                />
            ))}
        </ul>
    );
};

export default TaskList;