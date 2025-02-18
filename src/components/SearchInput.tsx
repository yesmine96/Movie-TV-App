interface SearchInputProps {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // To update search term from parent
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  searchTerm,
  setSearchTerm,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update search term in the parent component
  };

  return (
    <div className="max-w-sm mx-auto mt-10 ">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="w-full h-10 border border-gray-300 rounded-md shadow-sm px-2"
      />{" "}
    </div>
  );
};

export default SearchInput;
