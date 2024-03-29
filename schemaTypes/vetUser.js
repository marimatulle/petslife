export default {
  name: 'vetUser',
  title: 'Veterinário',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Nome completo',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Nome de usuário',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Foto de perfil',
      type: 'image',
    },
    {
      name: 'login',
      title: 'Login',
      type: 'reference',
      to: [{type: 'login'}],
    },
  ],
}