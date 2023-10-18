// KanbanBoard.js
import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, groupingOption, sortOption }) => {
  // Mapping priority values to names
  const priorityNames = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };

  const groupTickets = () => {
    // Group tickets based on the selected option
    let groupedTickets = {};

    tickets.forEach((ticket) => {
      const groupKey =
        groupingOption === 'status'
          ? ticket.status
          : groupingOption === 'user'
          ? ticket.userId
          : groupingOption === 'priority'
          ? `priority-${ticket.priority}`
          : '';

      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }

      groupedTickets[groupKey].push(ticket);
    });

    // Sort tickets within each group based on the selected sorting option
    for (const key in groupedTickets) {
      groupedTickets[key] = groupedTickets[key].sort((a, b) => {
        if (sortOption === 'priority') {
          return b.priority - a.priority;
        } else if (sortOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groupedTickets;
  };

  const renderColumns = () => {
    const groupedTickets = groupTickets();

    return Object.keys(groupedTickets).map((groupKey, index) => (
      <div key={groupKey} className={`kanban-column ${groupingOption === 'status' ? 'full-width' : ''}`}>
        <div className="column-title">
          {getTitleWithSymbols(groupKey)}
        </div>
        {groupedTickets[groupKey].map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    ));
  };

  const getTitleWithSymbols = (title) => (
    <>
      {groupingOption === 'priority' ? priorityNames[parseInt(title.replace('priority-', ''), 10)] : title}
      <div className='elements'>
        <span className="add-card" role="img" aria-label="Add Card">
          +
        </span>
        <span className="ellipsis" role="img" aria-label="More Options">
          ...
        </span>
      </div>
    </>
  );

  return <div className="kanban-board">{renderColumns()}</div>;
};

export default KanbanBoard;
