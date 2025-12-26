function TagInput({
  value,
  onChange,
  suggestions = [],
}: {
  value: string[];
  onChange: (v: string[]) => void;
  suggestions: string[];
}) {
  const toggle = (tag: string) => {
    onChange(
      value.includes(tag)
        ? value.filter(t => t !== tag)
        : [...value, tag]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map(tag => (
        <button
          type="button"
          key={tag}
          onClick={() => toggle(tag)}
          className={`px-3 py-1 rounded-full text-sm border
            ${value.includes(tag)
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700'}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
