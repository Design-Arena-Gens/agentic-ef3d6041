import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>🏗️ Building Materials WhatsApp Assistant</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          Automate your material pricing through WhatsApp. Customers can send voice notes, images, or text, and get instant price quotes!
        </p>

        <div className="grid">
          <div className="stat-card">
            <h3>Admin Panel</h3>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>
              Upload and manage your price lists from Excel or Word documents
            </p>
            <Link href="/admin" style={{ color: 'white', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
              Go to Admin →
            </Link>
          </div>

          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>WhatsApp Integration</h3>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>
              Connect your Twilio WhatsApp number to start receiving customer requests
            </p>
          </div>

          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h3>AI Processing</h3>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>
              Automatically transcribe voice, extract text from images, and match materials with prices
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2>📋 Setup Instructions</h2>

          <div className="info" style={{ marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Step 1: Configure Environment Variables</h3>
            <p>Add these to your Vercel environment variables:</p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><code>OPENAI_API_KEY</code> - Your OpenAI API key</li>
              <li><code>TWILIO_ACCOUNT_SID</code> - Your Twilio Account SID</li>
              <li><code>TWILIO_AUTH_TOKEN</code> - Your Twilio Auth Token</li>
              <li><code>TWILIO_WHATSAPP_NUMBER</code> - Your Twilio WhatsApp number (format: whatsapp:+14155238886)</li>
              <li><code>ADMIN_PASSWORD</code> - Password to access admin panel</li>
            </ul>
          </div>

          <div className="info">
            <h3 style={{ marginBottom: '0.5rem' }}>Step 2: Set Up Twilio WhatsApp</h3>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Sign up for Twilio and activate WhatsApp Sandbox or get approved number</li>
              <li>Configure webhook URL: <code>https://agentic-ef3d6041.vercel.app/api/whatsapp</code></li>
              <li>Set webhook method to POST</li>
            </ol>
          </div>

          <div className="info">
            <h3 style={{ marginBottom: '0.5rem' }}>Step 3: Upload Your Price List</h3>
            <p>Go to the Admin Panel and upload your Excel or Word price list. The system will parse and store your prices.</p>
          </div>

          <div className="info">
            <h3 style={{ marginBottom: '0.5rem' }}>Step 4: Test the System</h3>
            <p>Send a WhatsApp message to your Twilio number with material requirements (text, voice note, or image) and receive instant pricing!</p>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2>✨ Features</h2>
          <ul style={{ marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8' }}>
            <li>🎤 <strong>Voice Note Processing</strong> - Transcribe customer voice messages automatically</li>
            <li>📸 <strong>Image OCR</strong> - Extract text from photos of material lists</li>
            <li>📄 <strong>PDF/Document Support</strong> - Process uploaded documents</li>
            <li>💬 <strong>Text Messages</strong> - Parse plain text requirements</li>
            <li>💰 <strong>Instant Price Quotes</strong> - Match materials with your price list and respond automatically</li>
            <li>🤖 <strong>24/7 Availability</strong> - Customers get prices even when you're away</li>
            <li>📊 <strong>Easy Price Management</strong> - Upload Excel/Word files to update prices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
