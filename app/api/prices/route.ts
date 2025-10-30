import { NextResponse } from 'next/server';
import { loadPriceList } from '@/lib/priceList';

export async function GET() {
  try {
    const items = await loadPriceList();
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load price list', items: [] }, { status: 500 });
  }
}
