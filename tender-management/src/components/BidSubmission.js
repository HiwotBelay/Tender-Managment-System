import React from 'react';

const BidSubmission = () => {
  return (
    <div>
      <h1>Submit Bid</h1>
      <form>
        <input type="text" placeholder="Bid Amount" />
        <textarea placeholder="Bid Description"></textarea>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}

export default BidSubmission;
