import React, { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import '../Styles/Book.css';
import loading from '../assets/icons/loading-gif.gif'

function AddImage() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  let [isMoved, setIsMoved] = useState(true)
  let [render, setRender] = useState("")
  async function upld(file) {
    // web3 storage: https://web3.storage/account/
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxM0Y2Q2QwRmU5MEMxODQwRjNkNjFCNzkzNWE5ODllQ2ZCQWFCREEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjU3NjIzMDMxNDIsIm5hbWUiOiJNZW1vcmlhbiJ9.mhAW4qRQRJiKMIo7WlXhc1ukFudULXZfma1WvEPW5ek'
    const storage = new Web3Storage({ token })
    console.log(`Uploading file`)
    let App = document.getElementsByClassName('App')[0];
    let load = document.createElement('img')
    load.src = loading
    load.className = "loading"
    load.style.css = 'height: 20px; width: 20px'
    App.appendChild(load)
    App.addEventListener('mousemove', function (e) {
      var cursorX = e.pageX;
      var cursorY = e.pageY;
      load.style.cssText = `position: absolute; height: 20px; width: 20px; top: ${cursorY + 20}px; left: ${cursorX + 20}px;`
    })
    const cid = await storage.put([file])
    console.log('Content added with CID:', cid)
    App.removeChild(document.getElementsByClassName('loading')[0])
    setRender(render = 'https://' + cid + '.ipfs.w3s.link/' + file['name'])
    console.log(render)
    let image = document.createElement('img')
    let div = document.createElement('div')
    image.src = render
    div.className = 'img'
    div.id = "img"
    div.appendChild(image)
    const changeMove = () => {
      setIsMoved(isMoved = !isMoved)
    }
    window.addEventListener('mouseup', mouseUp, false);

    function mouseUp() {
      window.removeEventListener('mousemove', divMove, true);
    }

    function mouseDown(e) {
      window.addEventListener('mousemove', divMove, true);
    }

    function divMove(e) {
      var div = document.getElementById('dxy');
      div.style.position = 'absolute';
      div.style.top = e.clientY + 'px';
      div.style.left = e.clientX + 'px';
    }

    App.addEventListener('click', function (e) {
      if (isMoved === true) {
        var cursorX = e.pageX;
        var cursorY = e.pageY;
        console.log(cursorX, cursorY)
        div.style.cssText = `position: absolute;top: ${cursorY}px; left: ${cursorX}px; object-fit: fit; border: 10px; resize: both; overflow: auto; height: 50%; width: 50%`
        App.appendChild(div)
        changeMove()
        console.log(isMoved)
      } else if (isMoved === false) {
        return
      }
    });
    // free memory when ever this component is unmounted
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    var allowedExtensions =
      /(\.jpeg|\.jpg|\.jpe|\.jif|\.jfif|\.jfi|\.png|\.gif|\.webp|\.tiff|\.tif|\.psd|\.raw|\.arw|\.cr2|\.nrw|\.nrw|\.k25|\.bmp|\.dib|\.heif|\.dib|\.heic|\.ind|\.indd|\.indt|\.jp2|\.j2k|\.jpf|\.jpx|\.jpm|\.mj2|\.svg|\.svgz|\.ai|\.eps)$/i;

    if (!allowedExtensions.exec(selectedFile.name)) {
      alert("This file type is not allowed, please select another one. Thank you.");
    } else {
      const objectUrl = URL.createObjectURL(selectedFile)
      console.log(selectedFile)
      upld(selectedFile)
      setPreview(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
        return preview
      }
    }
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])

  }

  return (
    <div className="image">
      <input onChange={onSelectFile} id='upload' type='file' accept="image/*" hidden />
      <label htmlFor="upload"><div className='divLabel'></div></label>
    </div>
  );
}

export default AddImage;