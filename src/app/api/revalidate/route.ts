import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: '청첩장 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    await revalidatePath(`/card/${id}`);
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json({ message: '청첩장 캐시 업데이트에 문제가 생겼습니다.' }, { status: 500 });
  }
}
