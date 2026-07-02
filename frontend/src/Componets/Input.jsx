function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  minLength,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
}

export default Input;