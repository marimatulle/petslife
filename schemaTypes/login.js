export default {
  name: 'login',
  title: 'Login',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'ID',
      type: 'reference',
      to: [{type: 'commonUser'}, {type: 'vetUser'}],
    },
  ],
}