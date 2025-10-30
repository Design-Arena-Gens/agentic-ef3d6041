# 🏗️ Building Materials WhatsApp Assistant

An AI-powered WhatsApp assistant that automatically provides price quotes for building materials. Customers can send their requirements via:
- 🎤 Voice notes
- 📸 Images of material lists
- 💬 Text messages
- 📄 Documents

The system automatically processes these inputs and responds with accurate pricing from your inventory list.

## ✨ Features

- **Multi-format Input Processing**
  - Voice note transcription using OpenAI Whisper
  - OCR for images using GPT-4 Vision
  - Plain text message parsing

- **Automated Price Matching**
  - AI-powered material name extraction
  - Fuzzy matching with your price list
  - Instant quote generation

- **Easy Price Management**
  - Upload Excel (.xlsx, .xls) or Word (.docx) files
  - Web-based admin panel
  - Real-time price updates

- **24/7 Availability**
  - Automated responses even when you're away
  - WhatsApp integration via Twilio
  - Scalable cloud deployment

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Pros:**
- Free tier available
- Zero configuration
- Automatic HTTPS
- One-command deployment
- Global CDN

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel deploy --prod`
3. Set environment variables in Vercel dashboard

### Option 2: Railway

**Pros:**
- Easy deployment
- Free tier with generous limits
- Built-in PostgreSQL if needed

**Steps:**
1. Connect GitHub repo to Railway
2. Add environment variables
3. Deploy automatically on push

### Option 3: Render

**Pros:**
- Free tier available
- Easy setup
- Automatic deployments

### Option 4: DigitalOcean App Platform

**Pros:**
- Predictable pricing
- Good performance
- Easy scaling

## 📋 Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- OpenAI API account
- Twilio account with WhatsApp enabled
- Vercel account (for deployment)

### 2. Get API Keys

**OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and save it securely

**Twilio WhatsApp:**
1. Sign up at https://www.twilio.com
2. Go to Messaging → Try it out → Send a WhatsApp message
3. For production, apply for WhatsApp Business approval
4. Copy your Account SID and Auth Token

### 3. Local Development

```bash
# Clone or create project
cd building-materials-whatsapp-assistant

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your API keys
OPENAI_API_KEY=sk-...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Run development server
npm run dev
```

Visit http://localhost:3000 to see the app.

### 4. Deploy to Vercel

```bash
# Build first to check for errors
npm run build

# Deploy to production
vercel deploy --prod

# Or use the provided token
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-ef3d6041
```

### 5. Configure Environment Variables on Vercel

Go to your Vercel dashboard → Project Settings → Environment Variables and add:

```
OPENAI_API_KEY=sk-...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_APP_URL=https://agentic-ef3d6041.vercel.app
```

### 6. Configure Twilio Webhook

1. Go to Twilio Console → Messaging → Settings → WhatsApp Sandbox
2. Set webhook URL to: `https://agentic-ef3d6041.vercel.app/api/whatsapp`
3. Set HTTP method to POST
4. Save configuration

### 7. Upload Your Price List

1. Visit https://agentic-ef3d6041.vercel.app/admin
2. Login with your admin password
3. Upload an Excel or Word file with your materials and prices

**Excel format example:**
| name | price | unit | category | description |
|------|-------|------|----------|-------------|
| Cement | 350 | bag | Building | OPC 53 Grade |
| Steel Rod 8mm | 55 | kg | Steel | TMT Bar |
| Sand | 1800 | ton | Aggregate | M-Sand |

### 8. Test the System

1. Send a WhatsApp message to your Twilio number
2. Try different formats:
   - Text: "I need 10 bags of cement and 5 tons of sand"
   - Voice note: Record your requirements
   - Image: Take a photo of a written material list

## 📱 Customer Usage

Once deployed, your customers can:

1. **Send WhatsApp to your business number**
2. **Submit requirements in any format:**
   - Voice: "Hi, I need price for cement, steel rods, and bricks"
   - Text: "Please quote: 20 bags cement, 100kg steel, 10 cubic ft sand"
   - Image: [Photo of handwritten or printed material list]
3. **Receive instant price quote**

Example response:
```
📋 Price Quote for Your Materials

1. Cement
   Price: ₹350.00 per bag

2. Steel Rod 8mm
   Price: ₹55.00 per kg

3. Sand
   Price: ₹1800.00 per ton

💰 Estimated Total: ₹2205.00

📞 For bulk orders or custom quantities, please call us or visit our shop.
✅ Prices are subject to availability and market changes.
```

## 🔧 Customization

### Modify Response Format

Edit `lib/aiProcessor.ts` → `generatePriceResponse()` function

### Change Currency

Update the `₹` symbol in `lib/aiProcessor.ts`

### Add More Material Categories

Simply upload a new Excel file with additional items

### Customize Admin Panel

Edit `app/admin/page.tsx`

## 🛠️ Troubleshooting

### Voice notes not working
- Check OpenAI API key is valid
- Ensure you have credits in OpenAI account
- Verify Whisper API access

### Images not being processed
- Confirm GPT-4 Vision access
- Check image URL is accessible
- Verify OpenAI API limits

### WhatsApp messages not received
- Verify Twilio webhook URL is correct
- Check Twilio account is active
- Confirm WhatsApp sandbox is configured
- Test webhook with Twilio debugger

### Price list not loading
- Check file format (Excel/Word)
- Verify column names match expected format
- Ensure file is uploaded successfully
- Check server logs in Vercel

## 💡 Best Practices

1. **Keep prices updated** - Upload new price lists regularly
2. **Monitor usage** - Check OpenAI and Twilio usage to manage costs
3. **Test thoroughly** - Try different input formats before going live
4. **Set spending limits** - Configure budget alerts in OpenAI and Twilio
5. **Backup price data** - Keep a copy of your price list file

## 💰 Cost Estimation

**OpenAI API:**
- Whisper (voice): ~$0.006 per minute
- GPT-4o (text extraction): ~$0.01-0.02 per request
- Estimated: $10-20/month for 500-1000 requests

**Twilio WhatsApp:**
- Sandbox: Free (testing only)
- Production: ~$0.005 per message
- Estimated: $5-10/month for 1000-2000 messages

**Vercel:**
- Free tier: Up to 100GB bandwidth
- Upgrade if needed: $20/month

**Total estimated cost: $15-50/month** depending on usage

## 🔒 Security

- Admin panel password protected
- Environment variables for sensitive keys
- No database credentials exposed
- HTTPS enforced on Vercel

## 📄 License

MIT License - feel free to modify and use for your business

## 🤝 Support

For issues or questions:
1. Check troubleshooting section above
2. Review Vercel logs for errors
3. Test API keys are valid
4. Verify Twilio webhook configuration

---

Built with Next.js, OpenAI, and Twilio | Deployed on Vercel