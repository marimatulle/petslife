const Description = ({ title, list }) => (
  <>
    {title && (
      <h2 className="font-bold text-xl mb-2 mt-4 text-center">{title}</h2>
    )}
    {list?.map(({ key, value }, index) => (
      <p key={index}>
        <strong>{key}:</strong> {value}
      </p>
    ))}
  </>
);

export default Description;
