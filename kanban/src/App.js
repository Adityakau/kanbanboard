import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import './styles.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');
  const [displayOptions, setDisplayOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanViewState', JSON.stringify({ groupingOption, sortOption }));
  }, [groupingOption, sortOption]);

  const handleDisplayClick = () => {
    setDisplayOptions(!displayOptions);
  };

  const handleGroupByChange = (e) => {
    setGroupingOption(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <header className="header">
        <div className="display-container">
          <button className="display-button" onClick={handleDisplayClick}>
            Display
          </button>

          {displayOptions && (
            <div className="display-options-container">
              <div className="display-options">
                <div>
                  <label className="label" htmlFor="groupBy">
                    Group by:
                  </label>
                  <select
                    id="groupBy"
                    onChange={handleGroupByChange}
                    className="select-dropdown"
                    value={groupingOption}
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>

                <div className="sort-by-label">
                  <label className="label" htmlFor="sortBy">
                    Sort by:
                  </label>
                  <select
                    id="sortBy"
                    onChange={handleSortByChange}
                    className="select-dropdown"
                    value={sortOption}
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="body-content">
        <KanbanBoard tickets={tickets} groupingOption={groupingOption} sortOption={sortOption} />
      </div>
    </div>
  );
};

export default App;
