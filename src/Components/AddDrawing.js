import '../Styles/Book.css';
import React, { useState } from 'react';

function AddDrawing() {
  const [clicked, setClicked] = useState(false)
  const [color, setColor] = useState('');
  const [size, setSize] = useState(0);
  const draw = () => {
    setClicked(clicked => !clicked)
    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const ctx = canvas.getContext("2d")
    // previous mouse positions
    // They will be null initially
    let prevX = null
    let prevY = null

    // How thick the lines should be
    let draw = false

    // Set draw to true when mouse is pressed
    document.addEventListener("mousedown", (e) => draw = true)
    document.addEventListener("mouseclick", (e) => draw = false)
    document.addEventListener("mouseup", (e) => draw = false)
    document.addEventListener("mousemove", (e) => {
      // if draw is false then we won't draw
      if (prevX == null || prevY == null || !draw) {
        prevX = e.pageX
        prevY = e.pageY
        return
      }

      let currentX = e.pageX
      let currentY = e.pageY
      //console.log('Current: ' + currentX + ' ' + currentY + ' Previous: ' + prevX + ' ' + prevY + ' Cursor: ' + cursorX + ' ' + cursorY)
      ctx.beginPath()
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(currentX, currentY)
      ctx.lineWidth = size
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      console.log(size, color)
      ctx.stroke()

      prevX = currentX
      prevY = currentY
    })
  }

  function saveImage() {
    const image_data_url = document.getElementsByClassName("canvas")[0].toDataURL();
    console.log(image_data_url)
  }

  function handleColorChange(e) {
    setColor({ color: e.target.value })
  }
  function handleSizeChange(e) {
    setSize({ size: e.target.value })
  }

  return (
    <div>
      <button onClick={() => draw()} className='draw'></button>
      {clicked &&
        <div className='controls'>
          <input type="range" value={size} max={40} onChange={(e) => handleSizeChange(e)} />
          <input type="color" value={color} onChange={(e) => handleColorChange(e)} />
          <button onClick={() => saveImage()}>submit</button>
        </div>
      }
    </div>
  );
}

export default AddDrawing;