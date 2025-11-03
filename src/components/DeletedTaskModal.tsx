import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import '../styles/DeletedTaskModal.css';

interface DeletedTasksModalProps {
    deletedTasks: Task[];
    onRestore: (task: Task) => void;
    onClose: () => void;
}

const DeletedTasksModal: React.FC<DeletedTasksModalProps> = ({
                                                                 deletedTasks,
                                                                 onRestore,
                                                                 onClose
                                                             }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Удалённые задачи</h2>
                </div>

                <div className="modal-content">
                    <div className="modal-content-inner">
                        {deletedTasks.length === 0 ? (
                            <p className='bin-empty'>Корзина пуста</p>
                        ) : (
                            <ul>
                                {deletedTasks.map(task => (
                                    <li key={task.id}>
                                        <div className="task-content">
                      <span className="task-title">
                        {task.title}
                      </span>

                                            <div className="task-actions">
                                                {isMobile ? (
                                                    <button
                                                        className="restore-icon-btn"
                                                        onClick={() => onRestore(task)}
                                                        title="Восстановить"
                                                    >
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M4 18 Q12 24 20 18"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                fill="none"
                                                            />
                                                            <path
                                                                d="M12 18 L12 6 L7 11 L12 6 L17 11 L12 6 Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="restore-btn"
                                                        onClick={() => onRestore(task)}
                                                    >
                                                        Восстановить
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="close-btn" onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default DeletedTasksModal;