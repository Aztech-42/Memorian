import React, { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import '../Styles/Book.css';

function AddVideo() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  let [render, setRender] = useState("")
  async function upld(file) {
    // web3 storage: https://web3.storage/account/
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxM0Y2Q2QwRmU5MEMxODQwRjNkNjFCNzkzNWE5ODllQ2ZCQWFCREEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjU3NjIzMDMxNDIsIm5hbWUiOiJNZW1vcmlhbiJ9.mhAW4qRQRJiKMIo7WlXhc1ukFudULXZfma1WvEPW5ek'
    const storage = new Web3Storage({ token })
    console.log(`Uploading file`)
    const cid = await storage.put([file])
    console.log('Content added with CID:', cid)
    setRender(render = 'https://' + cid + '.ipfs.w3s.link/' + file['name'])
    console.log(render)
    let App = document.getElementsByClassName('App')[0];
    let div = document.createElement('div')
    let video = document.createElement('video')
    let source = document.createElement('source')
    source.src = render
    video.autoplay = true;
    video.controls = true;
    div.style.cssText = 'resize: both; overflow: auto; height: 50%; width: 50%; position: absolute'
    App.addEventListener('mousedown', function (e) {
      var cursorX = e.pageX;
      var cursorY = e.pageY;
      console.log(cursorX, cursorY)
      video.style.cssText = `position: absolute;top: ${cursorY}px; left: ${cursorX}px; object-fit: fit; border: 10px; resize: both; overflow: auto; height: 50%; width: 50%`
      video.appendChild(source)
      div.appendChild(video)
      App.appendChild(div)
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
      /(|\.webm|\.mpg|\.mp2|\.mpeg|\.mpe|\.mpv|\.ogg|\.mp4|\.m4p|\.m4v|\.avi|\.wmv|\.mov|\.qt|\.flv|\.swf|\.avchd)$/i;

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
    <div className='video'>
      <input onChange={onSelectFile} id='vidupload' type='file' accept="video/*" hidden />
      <label htmlFor="vidupload"><div className='divLabel'></div></label>
    </div>
  );
}

export default AddVideo;