export function convertNumberToString(params: {
  value: number;
  digits?: number;
  onlyInteger?: boolean;
}) {
  const { value, digits = -1, onlyInteger = false } = params;

  let _formedValue = value.toString();

  if (onlyInteger) {
    _formedValue = Math.floor(value).toString();
  } else if (digits >= 0) {
    _formedValue = value.toFixed(digits);
  }

  return _formedValue;
}
