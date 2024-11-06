const DdayCounter = ({ weddingInfoDate }: { weddingInfoDate: string }) => {
  const targetDate = new Date(weddingInfoDate);
  const currentDate = new Date();
  const diffInMs = targetDate.getTime() - currentDate.getTime();
  const diffInDays = isNaN(diffInMs) ? '000' : Math.ceil(diffInMs / (1000 * 60 * 60 * 24)).toLocaleString();
  return (
    <>
      <div className="text-primary300 text-xs">{diffInDays === '0' ? '결혼식이 오늘 입니다.' : '결혼까지 ' + diffInDays + '일 남았습니다.'}</div>
    </>
  );
};

export default DdayCounter;
