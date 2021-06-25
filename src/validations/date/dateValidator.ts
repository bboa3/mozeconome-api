import * as yup from 'yup';


const dateValidator = async (date: Date) => {
  const schema = yup.object().shape({
    callDate: yup.date()
    .required('Date is required')
    .min(new Date, 'Data invalida')
  })
  
  await schema.validate({
    callDate: date
  }, {
    abortEarly: false
  })
}


export default dateValidator;