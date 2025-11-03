import React from 'react';
import { Task } from '../types';
import '../styles/TrashBin.css';

interface TrashBinProps {
    deletedTasks: Task[];
    onClick: () => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ deletedTasks, onClick }) => {
    return (
        <div className="trash-bin" onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
            </svg>
            {deletedTasks.length > 0 && (
                <div className="trash-count">{deletedTasks.length}</div>
            )}
        </div>
    );
};

export default TrashBin;