import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'vaccinesVoucher',
  title: 'Comprovantes de vacinação',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      initialValue: () => uuidv4(),
    },
    {
      name: 'vaccinesVoucher',
      title: 'Comprovantes de vacinação',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'addedBy',
      title: 'Adicionado por',
      type: 'reference',
      to: [{type: 'login'}],
    },
    {
      name: 'card',
      title: 'Carteira de vacinação',
      type: 'reference',
      to: [{type: 'card'}],
    },
  ],
  mutations: [
    {
      name: 'createVoucher',
      mutation: async (args, context) => {
        const {document} = args
        const {id} = document
        const uuid = uuidv4()
        await client.patch(id).set('id', uuid).commit()
        return {...document, id: uuid}
      },
    },
  ],
}