import * as yup from 'yup';

export default {
  async loc(loc: string) {
    const schema = yup.object().shape({
      loc: yup.string()
        .required('mensalRawNumber required!')
        .oneOf([
          'beira',
          'chimoio',
          'inhambane',
          'lichinga',
          'maputo',
          'nacional',
          'nampula',
          'pemba',
          'quelimane',
          'tete',
          'xai-xai'
        ])
    })
    await schema.validate(
      { loc }, 
      { abortEarly: false}
    )
  }
}