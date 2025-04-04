import React from 'react';

const TenderCreation = () => {
  return (
    <div>
      <h1>Create New Tender</h1>
      <form>
        <input type="text" placeholder="Tender Name" />
        <textarea placeholder="Tender Description"></textarea>
        <input type="date" />
        <button type="submit">Create Tender</button>
      </form>
    </div>
  );
}

export default TenderCreation;
