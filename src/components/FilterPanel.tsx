import React, { useState, useEffect } from 'react';
import { FilterType } from '../types';
import '../styles/FilterPanel.css';

interface FilterPanelProps {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filter, setFilter }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className="filter-panel">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                    className="filter-select"
                >
                    <option value="all">Все задачи</option>
                    <option value="active">Активные</option>
                    <option value="completed">Выполненные</option>
                </select>
            </div>
        );
    }

    return (
        <div className="filter-panel">
            <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
            >
                Все
            </button>
            <button
                className={filter === 'active' ? 'active' : ''}
                onClick={() => setFilter('active')}
            >
                Активные
            </button>
            <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
            >
                Выполненные
            </button>
        </div>
    );
};

export default FilterPanel;