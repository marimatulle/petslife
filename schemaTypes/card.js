export default {
  name: 'card',
  title: 'Carteiras de vacinação',
  type: 'document',
  fields: [
    {
      name: 'petName',
      title: 'Nome do pet',
      type: 'string',
    },
    {
      name: 'iconImages',
      title: 'Ícones',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'about',
      title: 'Descrição',
      type: 'string',
    },
    {
      name: 'petSpecie',
      title: 'Espécie do animal',
      type: 'string',
    },
    {
      name: 'petBreed',
      title: 'Raça do animal',
      type: 'string',
    },
    {
      name: 'vaccinesVoucher',
      title: 'Comprovantes de vacinação',
      type: 'reference',
      to: [{type: 'vaccinesVoucher'}],
      options: {
        filter: '_id in path("vaccinesVoucher")',
      },
    },
    {
      name: 'createdBy',
      title: 'Criado por',
      type: 'reference',
      to: [{type: 'login'}],
    },
  ],
}
