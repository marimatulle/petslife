import CardTemplate from '../components/CartTemplate';
import { FaRegTrashAlt, FaBandAid } from 'react-icons/fa';
import CardDescription from '../components/CardDescription';

const VaccineGrid = ({ vaccines, handleDelete, isVet }) =>
  vaccines.map((vaccine, index) => (
    <CardTemplate key={vaccine.id}>
      {isVet && (
        <button
          onClick={() => handleDelete(vaccine.id)}
          className="absolute top-2 left-2 text-red-400 hover:text-red-500 text-lg
                active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]
                ease-in-out">
          <FaRegTrashAlt size={16} />
        </button>
      )}
      {vaccine.vaccineURL ? (
        <img
          src={vaccine.vaccineURL}
          alt="comprovante"
          className="w-36 h-36 mx-auto mt-4 mb-4"
        />
      ) : (
        <FaBandAid className="text-gray-400 w-36 h-36 mt-4 mb-4 mx-auto" />
      )}
      <CardDescription
        list={[
          { key: 'Data', value: vaccine.vaccineDate },
          { key: 'Retorno', value: vaccine.returnDate },
          {
            key: 'Vet Responsável',
            value: `${vaccine.veterinary}-${vaccine.crmv}`,
          },
          { key: 'Data', value: vaccine.vaccineDate },
          { key: 'Data', value: vaccine.vaccineDate },
        ]}
      />
    </CardTemplate>
  ));

export default VaccineGrid;
