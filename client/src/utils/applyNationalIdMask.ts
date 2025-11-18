const applyNationalIdMask = (numbers: string) => {
  const parts: string[] = [];
  if (numbers.length > 0) {
    parts.push(numbers.substring(0, 3));
  }
  if (numbers.length > 3) {
    parts.push(numbers.substring(3, 7));
  }
  if (numbers.length > 7) {
    parts.push(numbers.substring(7, 12));
  }
  if (numbers.length > 12) {
    parts.push(numbers.substring(12, 14));
  }
  if (numbers.length > 14) {
    parts.push(numbers.substring(14, 15));
  }

  return parts.join('-');
};

export default applyNationalIdMask;
