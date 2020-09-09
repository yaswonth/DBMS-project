import React, {useState,useRef,useEffect} from 'react'
import '../App.css';
import firebase from './Firebase';
import Items from './Items';
export default function Home(){

    useEffect(()=>{
        document.title = 'Project'
    },[])

    const [uid,setuid] = useState('');
    const [file,setfile] = useState(null);
    const [load,setload] = useState(false);
    const [ar,setar] = useState(null);
    let bu = 'LOAD';
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
    let ba = [];
    const upd=()=>{
        setfile(null);
        setar(null);
        if(uid==''){
            alert('Please fill the uniqueid!!');
        }else{
            setload(true);
            firebase.database().ref('pdfs').orderByChild('id').equalTo(uid).once('value',(snapshot)=>{
                if(snapshot.exists()){
                    var k = Object.keys(snapshot.val())
                    var lo = snapshot.val()[k[0]].uri.length;
                    var arr=[]
                    for(var i=0;i<lo;i++){
                        arr.push(snapshot.val()[k[0]].uri[i])
                        // console.log(snapshot.val()[k[0]].uri[i])
                    }
                    setar(arr);
                    setfile(arr[0]);
                    
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
            b=<p>Files doesn't exists!!</p>;
        }else{
           b=null
        }
    }else{
        b = null;
    }

    if(ar!=null){
        ba=[]
        ar.map((item,index)=>{
            ba.push(
                <Items data={item} key={(index).toString()} />
            )
        })
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
                {ba}
                
            </div>
        </div>
    )
}
