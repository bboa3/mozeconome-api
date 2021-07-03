<p align="left">
  <img alt="mozeconomia" src="https://github.com/bboa3/mozeconome-api/blob/main/logo.png" width="160" />
</p>

# mozeconomia api
Exchange rates for Mozambican currency to foreign currencies.

Imagine if each people could know exactly the state of their country's economy, where the money is flowing to, inflation, etc. 
People would be more educated about money, right? People would know what to do and where to use their money, right?

Yes, That's why I'm building a website to present the whole Mozambican economy using graphics,
so everyone without or a little knowledge of economics can interpret the graphics and be more educated about economics.


### API Usage
```bash
  [ ] request exchanges rates for the current day, last 30 0r more days
  [ ] request monthly inflection rates
  [ ] request yearly inflection rates
  [ ] convert HTML to pdf for graphics download
```

### API Work
```bash
  [x] Download the file: https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf every day
    [x] extract exchange rate
    [x] Send me an email if there is an error downloading or extracting exchange rates
  [x] Endpoint to upload file, extract inflection data and then delete file
```

## How to contribute?
You can simply submit a pull request and I'll gladly review them and merge them if the changes are acceptable.
 - Fork repository.
 - I'm using AWS SES for SMTP emails. You can open an account on their website or use [Mailtrap](https://mailtrap.io/).
 - create your postgres database, make sure the user/owner has permission to create another database, it'll be used by Prisma.
 - create .env file, .env.example has all the required variable.
 - You are ready to go!!!

### Migrations
```bash
npm run migration:save
# or
yarn migration:save
```
### Start
```bash
npm run dev
# or
yarn dev
```


### Follow me on GitHub to stay updated about the project

