const DdayCounter = ({ weddingInfoDate }: { weddingInfoDate: string }) => {
  const targetDate = new Date(weddingInfoDate);
  const currentDate = new Date();
  const diffInMs = targetDate.getTime() - currentDate.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)).toLocaleString();
  return (
    <>
      <div>{diffInDays === "0" ? "결혼식이 오늘 입니다." : "결혼까지 D-" + diffInDays + "일 남았습니다."}</div>
    </>
  )
}

export default DdayCounter