const VaccineGrid = ({vaccines}) => {
    return (
      <div className="mt-2">
        {vaccines.map((vaccine) => (
          <div
            key={vaccine.id}
            className="border-2 border-gray-300 rounded-lg p-2 mb-2 relative"
          >
            {vaccine.vaccineURL && (
              <img
                src={vaccine.vaccineURL}
                alt="comprovante"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    );
}

export default VaccineGrid;