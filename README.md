# NextJS + Cypress boilerplate

## Kom igång

1. Lägg till atlas url till din databas i `.env` filen
2. Kör `npm install` för att installera dependencies
3. Publicera databasen med `npm run push`
4. Seeda sedan databasen med `npm run seed`
5. Starta utvecklingsservern med `npm run dev`
6. Kör cypress testerna med `npm test` (startar automatiskt MongoDB och Next.js)

Nu borde du vara reda att skriva nya tester och bygga ut din app.

## Kör Replica Set lokalt på din dator

Om du vill använda din lokal databas för utveckling så måste du köra mongodb med i ett replica set för att Prisma ska fungera.

### Ändra konfigureringsfilen

**MacOS:** `code /opt/homebrew/etc/mongod.conf`
**Windows:** `code "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"`
**Linux:** `sudo code /etc/mongod.conf`

Öppna filen och lägg till följande kod:

```yaml
replication:
  replSetName: rs0
```

### Starta om servicen

**MacOS:** `brew services restart mongodb-community@8.0`
**Windows:** `Restart-Service "MongoDB"`
**Linux:** `sudo systemctl restart mongod`

### Initiera replica set'et

Starta Mongo shell'en `mongosh` i terminalen och initiera replica set'et `rs.initiate()`.

Nu är du klar!
