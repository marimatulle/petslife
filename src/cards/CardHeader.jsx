import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

const Header = ({ isOwner, card, handleDeleteCard, handleEditCard }) => {
  return isOwner ? (
    <>
      <button
        onClick={() => handleDeleteCard(card)}
        className="absolute top-2 left-2 text-red-500 text-lg"
      >
        <FaRegTrashAlt size={16} />
      </button>
      <button
        onClick={() => handleEditCard(card)}
        className="absolute top-2 right-2 text-orange-400 text-lg"
      >
        <FaPencilAlt size={16} />
      </button>
    </>
  ) : (
    <div className="text-center font-bold">Tutor: {card.userFullName} </div>
  );
};

export default Header;
