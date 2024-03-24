export default {
  name: 'register',
  title: 'Registro de Usuários',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required().min(6),
    },
    {
      name: 'username',
      title: 'Nome de Usuário',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Comum', value: 'comum'},
          {title: 'Veterinário', value: 'veterinario'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'crmv',
      title: 'CRMV',
      type: 'string',
      hidden: ({document}) => document?.role !== 'veterinario',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.role === 'veterinario' && !value) {
            return 'CRMV é obrigatório para veterinários'
          }
          return true
        }),
    },
  ],
}