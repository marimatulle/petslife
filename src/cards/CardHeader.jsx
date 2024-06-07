import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardHeader = ({ isOwner, card, handleDeleteCard, handleEditCard }) => {
  const navigate = useNavigate();

  const handleVaccinesClick = () => {
    navigate(`/vaccines/${card.id}`);
  };

  return (
    <>
      {isOwner && (
        <>
          <button
            onClick={() => handleDeleteCard(card)}
            className="absolute top-2 left-2 text-red-400 hover:text-red-500 text-lg 
                      active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] 
                      ease-in-out"
          >
            <FaRegTrashAlt size={16} />
          </button>
          <button
            onClick={() => handleEditCard(card)}
            className="absolute top-2 left-8 text-orange-300 hover:text-orange-400 text-lg
                        active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] 
                        ease-in-out"
          >
            <FaPencilAlt size={16} />
          </button>
        </>
      )}
      <button
        onClick={handleVaccinesClick}
        className="absolute top-2 right-2 bg-orange-300 hover:bg-orange-400 text-white 
                  font-bold text-s rounded-xl py-2 px-2 active:scale-[.98]
                  active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
      >
        Vacinas
      </button>
      {!isOwner && (
        <div className="top-2 left-2 font-bold break-words w-3/4">
          Tutor: {card.userFullName}{" "}
        </div>
      )}
    </>
  );
};

export default CardHeader;