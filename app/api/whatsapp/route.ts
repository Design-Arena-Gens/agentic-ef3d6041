import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { loadPriceList } from '@/lib/priceList';
import {
  transcribeAudio,
  extractTextFromImage,
  extractMaterialsFromText,
} from '@/lib/aiProcessor';

const MessagingResponse = twilio.twiml.MessagingResponse;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const from = formData.get('From') as string;
    const body = formData.get('Body') as string || '';
    const numMedia = parseInt(formData.get('NumMedia') as string || '0');
    const mediaContentType0 = formData.get('MediaContentType0') as string;
    const mediaUrl0 = formData.get('MediaUrl0') as string;

    console.log('WhatsApp message received:', { from, body, numMedia, mediaContentType0 });

    const priceList = await loadPriceList();

    if (priceList.length === 0) {
      return sendWhatsAppResponse(
        'Sorry, our price list is not available at the moment. Please contact us directly.'
      );
    }

    let extractedText = body;

    // Handle voice notes (audio)
    if (numMedia > 0 && mediaContentType0?.startsWith('audio/')) {
      console.log('Processing audio message');
      try {
        extractedText = await transcribeAudio(mediaUrl0);
        console.log('Transcription:', extractedText);
      } catch (error) {
        console.error('Audio transcription error:', error);
        return sendWhatsAppResponse(
          'Sorry, I had trouble processing your voice note. Please try sending a text message instead.'
        );
      }
    }

    // Handle images
    if (numMedia > 0 && mediaContentType0?.startsWith('image/')) {
      console.log('Processing image message');
      try {
        extractedText = await extractTextFromImage(mediaUrl0);
        console.log('Extracted text from image:', extractedText);
      } catch (error) {
        console.error('Image extraction error:', error);
        return sendWhatsAppResponse(
          'Sorry, I had trouble reading your image. Please try sending a clearer photo or text message.'
        );
      }
    }

    // Handle PDFs and documents
    if (numMedia > 0 && (
      mediaContentType0?.includes('pdf') ||
      mediaContentType0?.includes('document')
    )) {
      return sendWhatsAppResponse(
        'I see you sent a document. Please send the material list as an image or type it as a text message for faster processing.'
      );
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return sendWhatsAppResponse(
        'Hello! Send me your building material requirements as:\n\n• Text message\n• Voice note\n• Photo of your list\n\nI\'ll send you the prices right away! 📋'
      );
    }

    // Extract materials and generate response
    const { response } = await extractMaterialsFromText(extractedText, priceList);

    return sendWhatsAppResponse(response);

  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return sendWhatsAppResponse(
      'Sorry, I encountered an error processing your request. Please try again or contact us directly.'
    );
  }
}

function sendWhatsAppResponse(message: string) {
  const twiml = new MessagingResponse();
  twiml.message(message);

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}

// Handle Twilio webhook validation
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'WhatsApp webhook is active',
    timestamp: new Date().toISOString(),
  });
}
