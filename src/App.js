import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0f172a',color:'#e2e8f0'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize: 36, marginBottom: 12}}>🚀 Sample React App</h1>
        <p>This app was built with Jenkins and deployed to EC2.</p>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{padding:'10px 16px', fontSize:16, borderRadius:12, border:'1px solid #334155', background:'#1e293b', color:'#e2e8f0', cursor:'pointer'}}
        >
          Clicks: {count}
        </button>
        <p style={{marginTop: 16, opacity: 0.8}}>Edit <code>src/App.js</code> and push to see CI/CD redeploy.</p>
      </div>
    </div>
  );
}
