const CardTemplate = ({ callback, children }) => (
  <div
    className="border border-gray-300 p-4 rounded-lg bg-white shadow relative"
    onClick={callback}>
    {children}
  </div>
);

export default CardTemplate;
