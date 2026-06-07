function Button({
  text,
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  id,
  name,
  title,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      id={id}
      name={name}
      title={title}
    >
      {loading ? "Loading..." : children || text}
    </button>
  );
}

export default Button;