import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';

export const generateStaticParams = async () => {
  const { data } = await supabase.from('invitation').select('id');
  return (
    data?.map((invitation) => ({
      id: invitation.id,
    })) || []
  );
};

const fetchInvitationData = async (id: string) => {
  const { data, error } = await supabase.from('invitation').select('*').eq('id', id).single();

  if (error || !data) notFound();

  return data;
};

const CardPage = async ({ params }: { params: { id: string } }) => {
  const { isPrivate } = await fetchInvitationData(params.id);

  return <div>{isPrivate ? <div>아직 공개되지 않은 청첩장입니다.</div> : <div>청첩장 내용</div>}</div>;
};

export default CardPage;
