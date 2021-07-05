import swaggerJsDoc from 'swagger-jsdoc';


const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'MozEconomia',
      version: '1.0.0',
      description: `
        MozEconomia is a project to display information on website about the Mozambican economy in graphs and exchange rates. 
        This API is built to serve that information to the website to be displayed. You can see the API code and more information on the GitHub repository: https://github.com/bboa3/mozeconome-api.

        Once this API is deployed, will be open to anyone or any project, it is an open-source project.

        If you have any doubt or issues, please get me on LinkedIn Linkedin: https://www.linkedin.com/in/arlindo-boa-23048b1b0/ or by email: arlindojosboa@gmail.com
      `
    },
    servers: [
      {
        url: process.env.URL
      }
    ]
  },

  apis: [ './src/routes.ts' ]
}



const swaggerSpecs = swaggerJsDoc(options);

export default swaggerSpecs;

