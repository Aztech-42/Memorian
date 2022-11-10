import '../Styles/Book.css';
import React, { useState } from 'react';

const AddText = () => {
  const [clicked, setisClicked] = useState(false)
  function renderNew() {
    const App = document.getElementsByClassName('App')[0];
    App.addEventListener('mousedown', function (e) {
      var cursorX = e.pageX;
      var cursorY = e.pageY;
      console.log(cursorX, cursorY)
      function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        console.log(rect)
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
      }
      const canvas = document.getElementsByClassName("canvas")[0];
      canvas.addEventListener('mousedown', function (e) {
        getCursorPosition(canvas, e)
      })
      let main = document.getElementsByClassName('App')[0];
      let input = document.createElement('input')
      input.className = 'input'
      input.style.cssText = `position: absolute;top: ${cursorY}px; left: ${cursorX}px`
      input.placeholder = "trying stuff out"
      main.appendChild(input)
    });
  }
  return (
    <div>
      <button className='text' onClick={() => { setisClicked(!clicked); console.log(clicked); renderNew() }} ></button>
    </div>
  )
}

export default AddText;