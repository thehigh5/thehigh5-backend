import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.high5UserKey) {
      return NextResponse.json(
        { error: 'high5UserKey is required' },
        { status: 400 }
      );
    }

    const { high5UserKey } = body;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, display_name, plan, high5_user_key')
      .eq('high5_user_key', high5UserKey)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'User not found for this key' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: data.id,
        displayName: data.display_name,
        plan: data.plan,
        high5UserKey: data.high5_user_key
      }
    });
  } catch (e: any) {
    console.error('Error in /api/user/by-key:', e);
    return NextResponse.json(
      { error: 'Server error', details: e?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
