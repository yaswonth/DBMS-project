import React, {useState,useRef,useEffect} from 'react'
import '../App.css';
import firebase from './Firebase';
export default function Home(){

    useEffect(()=>{
        document.title = 'Project';
    })

    const [uid,setuid] = useState('');
    const [file,setfile] = useState(null);
    const [load,setload] = useState(false);
    let bu = 'LOAD';
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
    let stylee={
        display:'flex',
        flexDirection:'column',
        outline:'none',
        border:1,
        borderRadius:5,
        padding: 5,
        resize:'none',
        background: '#fff',
        width: '100%',
        fontSize:16
    }
    let b=null;
    const upd=()=>{
        setfile(null);
        if(uid==''){
            alert('Please fill the uniqueid!!');
        }else{
            setload(true);
            firebase.database().ref('pdfs').orderByChild('id').equalTo(uid).once('value',(snapshot)=>{
                if(snapshot.exists()){
                    var k = Object.keys(snapshot.val())
                    console.log(snapshot.val()[k[0]].uri);
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        const filer = new Blob([xhr.response], { type: 'application/pdf' });
            
                        const fileURL = URL.createObjectURL(filer);
            
                        setfile(fileURL);
                    };
                    xhr.open('GET', snapshot.val()[k[0]].uri);
                    xhr.send();
                    // setfile('http://www.africau.edu/images/default/sample.pdf')
                }else{
                    alert('File not exist')
                    setfile('File not exists!!')
                }
                setload(false);
            })
            .catch(er=>{
                console.log(er);
            })
        }
    }
    if(load){
        bu ='Loading...';
    }else{
        bu = 'LOAD';
    }

    if(file!=null){
        if(file=='File not exists!!'){
            b=<p>File doesn't exists!!</p>;
        }else{
            
            
            b=(<div><p>File exists!!</p>
               <iframe src={file} width='200' height='240' id='fr' ref={fileref} onFocus={()=>console.log('pdf focused')} ></iframe>
                
                <div className='it'>
                    <p className='bo' onClick={op} >OPEN</p>
                    <p className='bo' onClick={pr} >PRINT</p>
                    {/* <ReactToPrint
                       trigger={() => {
                               return <p className='bo'>PRINT</p>;
                               }}
                        content={file}
                    /> */}
                    
                </div></div>);
        }
    }else{
        b = null;
    }
    return(
        <div className='App' >
            <div className='w-m'>
                <div className='inp'>
                <input placeholder='Unique number' style={stylee} value={uid} onChange={e=>setuid(e.target.value)}/>
                </div>
                <div className='but' onClick={upd}>
                    {bu}
                </div>
                {b}
                
                
            </div>
        </div>
    )
}