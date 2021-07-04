import * as yup from 'yup';

export default {
  async take(take: string) {
    const schema = yup.object().shape({
      take: yup.number()
        .required()
        .min(1)
    })
    await schema.validate(
      { take }, 
      { abortEarly: false}
    )
  },

  async iso(iso: string) {
    const schema = yup.object().shape({
      iso: yup.string()
        .required()
        .min(3)
        .max(3)
        .uppercase()
    })
    await schema.validate(
      { iso }, 
      { abortEarly: false}
    )
  }
}