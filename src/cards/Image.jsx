import ClipLoader from "react-spinners/ClipLoader";
import { FaDog, FaCat } from "react-icons/fa";

const Image = ({
  isOwner,
  card,
  handleImageUpload,
  setIsHovered,
  loadingCards,
  isHovered,
}) => {
  return (
    <div className="flex justify-center mt-8">
      {isOwner ? (
        <label
          onMouseEnter={() => setIsHovered({ [card.id]: true })}
          onMouseLeave={() => setIsHovered({ [card.id]: false })}
          className="relative cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, card)}
          />
          {loadingCards[card.id] ? (
            <ClipLoader color="#fb923c" loading={true} size={50} />
          ) : card.photoURL ? (
            <img
              className="w-24 h-24 rounded-full mx-auto"
              src={card.photoURL}
              alt="Avatar do pet"
            />
          ) : card.animalSpecies === "Cachorro" ? (
            <FaDog className="text-gray-400 w-24 h-24 mx-auto" />
          ) : (
            <FaCat className="text-gray-400 w-24 h-24 mx-auto" />
          )}
          {isHovered[card.id] && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110">
              <span className="text-center">Alterar imagem</span>
            </div>
          )}
        </label>
      ) : (
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={card.photoURL}
          alt="Avatar do pet"
        />
      )}
    </div>
  );
};


export default Image