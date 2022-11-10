import '../Styles/Book.css';
import React, { useState } from 'react';

function Book() {
  const [page, setPage] = useState(0)
  const handlePageChangePositive = () => {
    if (page >= 9999) {
      return
    } else {
      setPage(page => page + 1)
      document.getElementsByClassName('pagecount')[0].placeholder = page + 1
    }
  }
  const handlePageChangeNegative = () => {
    if (page < 1) {
      return
    } else {
      setPage(page => page - 1)
      document.getElementsByClassName('pagecount')[0].placeholder = page - 1
    }
  }

  const handlePageCountSubmit = (e) => {
    e.preventDefault()
    setPage(page)
    console.log(page)
    document.getElementsByClassName('pagecount')[0].placeholder = page
  }
  return (
    <div>
      <canvas className='canvas' id='canvas'></canvas>
      <div className="navigate">
        <button onClick={() => handlePageChangeNegative()} className='previous'></button>
        <form onSubmit={e => handlePageCountSubmit(e)}>
          <input className='pagecount' placeholder={page} onChange={(e) => setPage(parseInt(e.target.value))}></input>
        </form>
        <button onClick={() => handlePageChangePositive()} className='next'></button>
      </div>
    </div>
  );
}

export default Book;