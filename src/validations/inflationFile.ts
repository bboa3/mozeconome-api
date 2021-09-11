
export default {
  validator(fileName: string) {
    
    const fileNames = fileName.split('-');
    const name = fileNames[0];
    const year = fileNames[1];

     const regex = /\d+/g;
     

    if(!name || !year || !year.match(regex)) {

      return false;

    }

    if(
      name.match(/beira/i) ||
      name.match(/chimoio/i) ||
      name.match(/inhambane/i)||
      name.match(/lichinga/i)||
      name.match(/maputo/i)||
      name.match(/nacional/i)||
      name.match(/nampula/i)||
      name.match(/pemba/i)||
      name.match(/quelimane/i)||
      name.match(/tete/i)||
      name.match(/xai_xai/i)
    ) {
      return true
    }

    return false;
  },

  create(fileName: string) {
    if(!this.validator(fileName)) {
      const error = new Error(`Filename ${fileName} is invalid. Valid filename example: maputo-2021.xlsx`);
      error.name = 'InvalidFilenameError';

      return error;
    }


    return fileName;
  }
}