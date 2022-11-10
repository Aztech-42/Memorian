import '../Styles/ToolBox.css';
import React from 'react';
import AddText from './AddText';
import AddDrawing from './AddDrawing';
import AddImage from './AddImage';
import AddVideo from './AddVideo';

function ToolBox() {
  return (
    <div className="ToolBox">
      <AddText />
      <AddDrawing />
      <AddImage />
      <AddVideo />
    </div>
  );
}

export default ToolBox;