import React, { useState } from 'react';

export default function App() {
  const [getValue,  setGetValue]  = useState('');   // 第 1 个输入框（GET）
  const [bodyParam, setBodyParam] = useState('');   // 第 2 个输入框（POST body）
  const [urlParam,  setUrlParam]  = useState('');   // 第 3 个输入框（POST param）
  const [resp,      setResp]      = useState('');   // 后端返回结果

  const sendGet = () => {
    fetch(`http://127.0.0.1:5000/receive/${encodeURIComponent(getValue)}`)
      .then(r => r.json())
      .then(data => setResp(data.message))
      .catch(console.error);
  };

  const sendPost = () => {
    fetch('http://127.0.0.1:5000/postdata', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        bodyParam,
        paramValue: urlParam
      })
    })
      .then(r => r.json())
      .then(data => setResp(data.message))
      .catch(console.error);
  };

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>React ⇄ Flask Demo</h2>

      {/* GET 区域 */}
      <input
        style={{ width: '100%', padding: 8 }}
        placeholder="GET 参数（输入框 1）"
        value={getValue}
        onChange={e => setGetValue(e.target.value)}
      />
      <button style={{ marginTop: 8 }} onClick={sendGet}>
        发送 GET
      </button>

      {/* POST 区域 */}
      <hr />
      <input
        style={{ width: '100%', padding: 8 }}
        placeholder="POST bodyParam（输入框 2）"
        value={bodyParam}
        onChange={e => setBodyParam(e.target.value)}
      />
      <input
        style={{ width: '100%', padding: 8, marginTop: 6 }}
        placeholder="POST paramValue（输入框 3）"
        value={urlParam}
        onChange={e => setUrlParam(e.target.value)}
      />
      <button style={{ marginTop: 8 }} onClick={sendPost}>
        发送 POST
      </button>

      {/* 显示后端响应 */}
      <hr />
      <strong>Server response:</strong>
      <pre>{resp}</pre>
    </div>
  );
}

