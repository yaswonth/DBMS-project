import React,{useState,useEffect,useRef} from 'react'
import '../App.css';
import firebase from './Firebase';


export default function Items({data}){
    let ba = <p>Loading...</p>
    const [file,setfile] = useState(null);
    let fileref = useRef(null);
    const op=()=>{
        console.log(file);
        window.open(file,'_blank');
    }
    const pr=()=>{
        fileref.current.focus();
        const iframe = document.frames
      ? document.frames['fr']
      : document.getElementById('fr');
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
    }
    useEffect(() => {
        var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        const filer = new Blob([xhr.response], { type: 'application/pdf' });
            
                        const fileURL = URL.createObjectURL(filer);
            
                        setfile(fileURL);
                    };
                    xhr.open('GET', data);
                    xhr.send();
        console.log(data);
    }, [])
    if(file!=null){
            ba=(<div><p>File exists!!</p>
            <iframe src={file} width='200' height='240' id='fr' ref={fileref} onFocus={()=>console.log('pdf focused')} ></iframe>
             
             <div className='it'>
                 <p className='bo' onClick={op} >OPEN</p>
                 <p className='bo' onClick={pr} >PRINT</p>
                 
             </div></div>);
            console.log(data);
    }else{
        ba=<p>Loading...</p>;
    }

    return(
        <div key={data}>
          {ba}
        </div>
    )
}