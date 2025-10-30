'use client';

import { useState, useEffect } from 'react';

interface PriceItem {
  name: string;
  price: number;
  unit: string;
  category?: string;
  description?: string;
}

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [priceList, setPriceList] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('authenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
      loadPriceList();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Will be replaced by env var check on server
      setAuthenticated(true);
      sessionStorage.setItem('authenticated', 'true');
      loadPriceList();
    } else {
      showMessage('Invalid password', 'error');
    }
  };

  const loadPriceList = async () => {
    try {
      const response = await fetch('/api/prices');
      if (response.ok) {
        const data = await response.json();
        setPriceList(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load price list', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showMessage('Please select a file', 'error');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-prices', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(`Successfully uploaded ${data.count} items`, 'success');
        setPriceList(data.items);
        setFile(null);
      } else {
        showMessage(data.error || 'Upload failed', 'error');
      }
    } catch (error) {
      showMessage('Upload failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  if (!authenticated) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '5rem auto' }}>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              className="input"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Login
            </button>
          </form>
          {message && <div className={messageType === 'error' ? 'error' : 'success'} style={{ marginTop: '1rem' }}>{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>📊 Admin Panel</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Manage your building materials price list</p>

        {message && <div className={messageType === 'error' ? 'error' : 'success'}>{message}</div>}

        <div className="card" style={{ background: '#f8f9fa' }}>
          <h2>Upload Price List</h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Upload an Excel (.xlsx, .xls) or Word (.docx) file with your material prices
          </p>

          <div className="info" style={{ marginBottom: '1rem' }}>
            <strong>Excel Format:</strong> Columns should include: name, price, unit (optional: category, description, aliases)
          </div>

          <input
            type="file"
            id="file-upload"
            className="file-input"
            accept=".xlsx,.xls,.docx,.doc"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="file-label">
            📁 {file ? file.name : 'Choose file...'}
          </label>

          <button
            className="btn"
            onClick={handleUpload}
            disabled={loading || !file}
            style={{ marginLeft: '1rem' }}
          >
            {loading ? <><span className="loading"></span>Uploading...</> : 'Upload & Parse'}
          </button>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Current Price List ({priceList.length} items)</h2>

          {priceList.length === 0 ? (
            <div className="info">
              No price list uploaded yet. Upload an Excel or Word file to get started.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>Category</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {priceList.map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.name}</strong></td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>{item.unit}</td>
                      <td>{item.category || '-'}</td>
                      <td>{item.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="/" className="btn">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
