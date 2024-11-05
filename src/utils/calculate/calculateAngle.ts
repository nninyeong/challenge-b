export const calculateAngle = (center: { x: number; y: number }, point: { x: number; y: number }): number => {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // 라디안을 도 단위로 변환
  return angle >= 0 ? angle : 360 + angle; // 음수를 방지해 0-360도로 맞춤
};
