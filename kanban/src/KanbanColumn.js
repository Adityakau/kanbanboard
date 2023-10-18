
import React from 'react';

const KanbanColumn = ({ title, tickets}) => {
  return (
    <div className="kanban-column">
      <h3>{title}</h3>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <div className="ticket">
              <p>{ticket.title}</p>
              <p>Priority: {ticket.priority}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KanbanColumn;
