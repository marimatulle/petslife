const Description = (card) => (
  <>
    <h2 className="font-bold text-xl mb-2 mt-4 text-center">
      {card.animalName}
    </h2>
    <p>
      <strong>Espécie:</strong> {card.animalSpecies}
    </p>
    <p>
      <strong>Raça:</strong> {card.animalBreed}
    </p>
    <p>
      <strong>Sexo:</strong> {card.animalSex}
    </p>
    <p>
      <strong>Idade:</strong> {card.animalAge}
    </p>
    <p>
      <strong>Cor:</strong> {card.animalColor}
    </p>
    <p>
      <strong>Castrado:</strong> {card.isNeutered}
    </p>
    <p>
      <strong>Doenças pré-existentes:</strong> {card.preExistingIllnesses}
    </p>
  </>
);

export default Description