'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { createClient } from '@/utils/supabase/client';
import { useGetAllinvitationCard } from '@/hooks/queries/mypage/useMypage';

const Page = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const { data: invitationCards } = useGetAllinvitationCard();
  const invitationCard = invitationCards?.[0];

  const handleClick = async () => {
    setLoading(true);

    // Supabase에서 데이터 가져오기
    const { data, error } = await supabase
      .from('attendance')
      .select('name, division, person_count, whether_food')
      .eq('invitation_id', `${invitationCard?.id}`);

    if (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      return;
    }

    // 데이터를 CSV로 변환
    const csv = Papa.unparse(data, {
      quotes: true, // 문자열에 항상 인용 부호를 추가
      delimiter: ',', // 기본 구분자는 쉼표
      newline: '\r\n', // 새 줄
      header: true, // 헤더 추가
    });

    // UTF-8 BOM 추가 (Excel 등에서 깨짐 방지)
    const bom = '\uFEFF'; // UTF-8 BOM
    const csvWithBom = bom + csv;

    // CSV 다운로드
    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'articles.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(false);
  };

  return (
    <div>
      <span>Page</span>
      <button
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  );
};

export default Page;
