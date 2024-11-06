import Papa from 'papaparse';
import { useGetAllinvitationCard } from './useMypage';
import browserClient from '@/utils/supabase/client';
import { Notify } from 'notiflix';

export const useDownloadCsv = () => {
  const { data: invitationCards } = useGetAllinvitationCard();

  const downloadCsv = async () => {
    const invitationCard = invitationCards?.[0];
    const invitationCardId = invitationCard?.id;

    if (!invitationCardId) {
      console.error('Invitation card ID not found.');
      Notify.info('청첩장이 없습니다.');
      return;
    }

    const { data, error } = await browserClient
      .from('attendance')
      .select('name, division, person_count, whether_food')
      .eq('invitation_id', `${invitationCardId}`);

    if (error) {
      console.error('Error fetching data:', error);
      Notify.failure('명단을 가져오는 중 에러가 발생했습니다.');
      return;
    }

    const dataWithMessage =
      data.length === 0
        ? [{ name: '데이터가 존재하지 않습니다', division: '', person_count: '', whether_food: '' }]
        : data;

    const processedData = dataWithMessage?.map((item) => ({
      이름: item.name,
      구분: item.division,
      '참석 인원': item.person_count,
      '식사 여부': item.whether_food === '' ? '' : item.whether_food ? 'y' : 'n',
    }));

    const csv = Papa.unparse(processedData, {
      quotes: true,
      delimiter: ',',
      newline: '\r\n',
      header: true,
    });

    const bom = '\uFEFF';
    const csvWithBom = bom + csv;

    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', '참석 인원 명단.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { downloadCsv };
};
