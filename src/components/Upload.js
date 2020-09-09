import React, {useState,useRef,useEffect} from 'react'
import '../App.css';
import firebase from './Firebase';
export default function Upload(){


    useEffect(()=>{
        document.title = 'Upload';
    })
    const [uid,setuid] = useState('');
    const [file,setfile] = useState(null);
    const [u,setu] = useState(null);
    var d = 'UPLOAD';
    let fileref = useRef(null);
    let b = null;
    let bu=null;
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
    const change=(event)=>{
        if(event.target.files && event.target.files[0]){
            setfile(event.target.files[0].name);
        }else{
            setfile(null);
        }
    }
    const upd=()=>{
        if(uid==''){
            alert('Please fill the uniqueid!!');
        }else{
            if(fileref.current.files && fileref.current.files[0]){
                setu('Loading...');
                firebase.database().ref('pdfs').orderByChild('id').equalTo(uid).once('value',(snapshot)=>{
                    if(snapshot.exists()){
                        setu(null);
                        alert('unique id already exists!!');
                    }else{
                        var fname=fileref.current.files[0].name.split('.');
                        let stor = firebase.storage().ref('pdfs/'+uid+'.'+fname[fname.length-1]);
                        let up = stor.put(fileref.current.files[0]);
                        up.on('state_changed',
                        (snapshot)=>{
                            var m = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) ;
                            var prog = "pdf upload progress: "+m+"%";
                            setu(prog);
                        },
                        (error)=>{
                          setu(null);
                        },
                        ()=>{
                            setu('wait...Uploading data...');
                            stor.getDownloadURL().then(url=>{
                                firebase.database().ref('pdfs').push().set({
                                   id:uid,
                                   uri:url
                               }).then(()=>{
                               setu(null);
                               
                            })
                            .catch(err=>{
                               alert('Network issues...please try again!');
                            });
                               setu(null);
                            });
                        });
                    }
                }).catch(er=>{
                    console.log(er);
                })
                
            }else{
                alert('Please select a pdf file to upload!!');
            }
        }
        // setu(null);
    }
    if(file!=null){
        b = <p>{file}</p>
    }else{
        b = null;
    }

    if(u!=null){
        d = 'Uploading...'
        bu = <p>{u}</p>;
    }else{
        d = 'UPLOAD'
        bu = null;
    }


    return(
        <div className='App' >
            <div className='w-m'>
                <div className='inp'>
                <input placeholder='Unique number' style={stylee} value={uid} onChange={e=>setuid(e.target.value)}/>
                </div>
                <div className='new-choose'>
                  <button className='new-choose-bt'>Choose file</button>
                  <input type="file" accept="application/pdf" className='dash-ch-in' ref={fileref} onChange={change} />
                </div>
                {b}
                <div className='but' onClick={upd}>
                    {d}
                </div>
                {bu}
                
            </div>
        </div>
    )
}