interface SelectOptionProps {
  values: string[] | number[];
}

const SelectOption: React.FC<SelectOptionProps> = ({ values }) => {
  return (
    <div className="relative inline-block">
      <select
        name="numSelect"
        id="numSelect"
        className="block appearance-none bg-white border border-gray-300 hover:border-gray-400
                   rounded-md py-1 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
      >
        {values.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
