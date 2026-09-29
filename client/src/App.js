import { useState, useEffect } from 'react';

const API = "http://localhost:5000/api";

function App() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({name:"", age:"", disease:"", room:""});

  const load = () => {
    fetch(`${API}/patients`).then(r=>r.json()).then(setPatients);
  };

  useEffect(()=>{ load(); }, []);

  const addPatient = async () => {
    if(!form.name) return alert("Name enter chey bro");
    await fetch(`${API}/patients`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    setForm({name:"", age:"", disease:"", room:""});
    load();
  };

  return (
    <div style={{padding:20, maxWidth:600, margin:'auto'}}>
      <h1 style={{color:'#0056b3'}}>🏥 Hospital Management - DB Connected ✅</h1>
      <p>Backend: Port 5000 - Data ippudu server lo save avuthundi!</p>
      <div style={{display:'grid', gap:10, background:'white', padding:20, borderRadius:10, boxShadow:'0 2px 10px #ccc'}}>
        <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{padding:10}}/>
        <input placeholder='Age' value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={{padding:10}}/>
        <input placeholder='Disease' value={form.disease} onChange={e=>setForm({...form,disease:e.target.value})} style={{padding:10}}/>
        <input placeholder='Room' value={form.room} onChange={e=>setForm({...form,room:e.target.value})} style={{padding:10}}/>
        <button onClick={addPatient} style={{padding:12, background:'#0056b3', color:'white', border:'none', borderRadius:5}}>+ Add Patient to Database</button>
      </div>
      <h3 style={{marginTop:20}}>Patients from Backend (Port 5000):</h3>
      {patients.map(p=> <div key={p.id} style={{background:'white', padding:10, margin:'5px 0', borderRadius:5, borderLeft:'4px solid green'}}>{p.name} - {p.disease || p.age} - Room {p.room} <span style={{color:'green'}}>✔ DB Saved</span></div>)}
    </div>
  );
}
export default App;