import * as yup from 'yup';

interface RawNumber {
  mensalRawNumber: string
  homologaRawNumber: string
}

export default {
  async rawNumber({ mensalRawNumber, homologaRawNumber }: RawNumber) {
    const schema = yup.object().shape({
      mensalRawNumber: yup.number()
        .required('mensalRawNumber required!')
        .min(1, `The raw number ${mensalRawNumber} is invalid`)
        .max(10000, `The raw number ${mensalRawNumber} is invalid`),
      homologaRawNumber: yup.number()
        .required('homologaRawNumber required!')
        .min(1, `The raw number ${homologaRawNumber} is invalid`)
        .max(10000, `The raw number ${homologaRawNumber} is invalid`)
    })
    await schema.validate(
      { 
        mensalRawNumber, 
        homologaRawNumber
      }, 
      { abortEarly: false}
    )
  }
}