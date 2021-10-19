import React, { useEffect ,useState, useRef, createRef} from 'react'
// import {Link ,withRouter } from 'react-router-dom'
import Header from './Header'
import "./../App.css"
export default  function Dashboard(props) {

    // const [userData,setUserData]=useState({});
    const [isSpinner,setSpinner]=useState(false);
    const [source , setSource] = useState();
    const [status,setStatus] = useState(false);
    const [chunks , setChunks] = useState([]);
    const [videoURL, setViodeURL] = useState("");

   const userlog= async ()=>{

    try{
    const resp = await fetch("/dashboard");
    const data = await resp.json();
         if(data.success === false){
            props.history.push("/login");
         }
    }catch(e){
        console.log(e);
        props.history.push("/login");
    }
    }

    // useEffect(()=>{
    //     // console.log("sssss")
    //     // userlog();
    //     setSpinner(false)
    // },[])

    const videos = createRef(null);
    const videoSave = createRef(null)

    const startCapture = async(e)=>{

        
    }
    useEffect(()=>{

        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            navigator.mediaDevices.getUserMedia = function(constraintObj) {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraintObj, resolve, reject);
                });
            }
        }else{
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device=>{
                    console.log(device.kind.toUpperCase(), device.label);
                    //, device.deviceId
                })
            })
            .catch(err=>{
                console.log(err.name, err.message);
            })
        }

        navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
            .then(stream =>{
                
                videos.current.srcObject = stream;
                videos.current.onloadedmetadata = (e)=>{
                    videos.current.play();
                }

                let mediaRecorder = new MediaRecorder(stream);
                
                mediaRecorder.onstop = async(ev)=>{
                    let blob = new  Blob(chunks, { 'type' : 'video/mp4;' });
                    setChunks([]);
                    let videourl = window.URL.createObjectURL(blob);
                    console.log(videourl)
                    setViodeURL(videourl)
                    // videoSave.current.src = videoURL ? "videoURL" : "erzsfz";
                }
                if (status) {
                    mediaRecorder.start();
                } else {
                    mediaRecorder.stop();
                }
                

            })
            .catch(err=>{
                alert(err)
            
            })
        
    },[status])

    // const stopCapture = async(e)=>{

    //     try {
    //        videos.current.play();
    //         console.log(mediaRecorder.state);
    //     } catch (error) {
    //         alert(error + "erere")
    //     }
        
        
        // setViodeURL(videourl)
        
        // tracks.forEach(track => {
        //     videos.current.srcObject = null
        // });
        
    // }

    var displayMediaOptions = {
        video:{
            cursor:'always'
        },
        audio:false
    }

    if (isSpinner) {
        return (
          <div className="spinner-border " role="status" id="spinner">
          <span className="sr-only">Loading...</span>
          </div> 
        )
    }else{
    return (
        <div>
        <Header />
        <div className="App">
        
            <h1>Welcome</h1>
            <button id="start" onClick={setStatus(!status)}>{status? "start Capture":"Stop Capture"}</button>
            <button id="stop" onClick={setStatus(false)}>Stop Capture</button>
            <video id="video" ref={videos} srcObject={source} autoPlay="true"></video>
            <video id="vidSave" ref={videoSave} src={videoURL}controls="true"/>
        </div>
        </div>
        
    )
    }
}
