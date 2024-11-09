export const calculateAngle = (pivot: { x: number; y: number }, pointerPosition: { x: number; y: number }): number => {
  const dx = pointerPosition.x - pivot.x;
  const dy = pointerPosition.y - pivot.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // 라디안을 도 단위로 변환
  return angle >= 0 ? angle : 360 + angle; // 음수를 방지해 0-360도로 맞춤
};
