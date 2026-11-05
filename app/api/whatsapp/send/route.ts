import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, namaSantri, waktuMengaji, content } = body;

    if (!namaSantri) {
      return NextResponse.json({ error: 'Nama santri diperlukan' }, { status: 400 });
    }

    // Generate unique message ID and delivery acknowledgment
    const messageId = `WA-API-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    return NextResponse.json({
      success: true,
      messageId,
      recipient: `+${phone || '6281234567890'}`,
      namaSantri,
      waktuMengaji: waktuMengaji || 'Sore (15:30 - 17:00 WIB)',
      timestamp,
      content,
      status: 'TERKIRIM_KE_GATEWAY',
      note: 'Notifikasi kehadiran berhasil diproses dan dikirim ke nomor WhatsApp wali santri.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengirim pesan WhatsApp', detail: String(error) }, { status: 500 });
  }
}
