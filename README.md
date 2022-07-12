# Ray's URL Shortener

Test my implementation of URL Shortener at [http://url.raythx.com](http://url.raythx.com) (no HTTPS/SSL yet)

---

## Features
- Styled (...? very minimalistic...)
- Data persistence with MySQL
- Deployed on AWS
- Some [unit/integration testing](https://github.com/raythx98/SERN-CRUD/tree/main/backend/tests)

## If my server crashes

In the unfortunate event that my server crashes during evaluation, the first alternative is to contact me at [hongxian@comp.nus.edu.sg](mailto:hongxian@comp.nus.edu.sg) or through my mobile phone and I will fix it asap.

Alternative, here are the steps to run my url shortener service on local. (I will try my best to document the steps to reproduce the service...)

- ### Client
1. Ensure that node is installed
2. Install dependencies
```
npm i
```
3. Create `.env` file in the root directory, put in API url
```
REACT_APP_BASE_URL=localhost:3001/
```
4. Start react app
```
npm start
```
Client will be available at localhost:3000

- ### Database
1. Ensure that a MySQL server is setup properly on your machine
2. Create database & tables
```
CREATE SCHEMA linksystems;
CREATE TABLE links (
  link LONGTEXT NOT NULL,
  shortened_link VARCHAR(45) NOT NULL,
  link_id INT NULL AUTO_INCREMENT,
  PRIMARY KEY (link_id));
CREATE INDEX shortened_link_idx ON links (shortened_link) visible;
```
3. Create user and grant privileges
```
CREATE USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON linksystem.* TO 'root'@'localhost';
```
Database will be available (by default) at localhost:3306

- ### Server
1. Install dependencies
```
npm i
```
2. Create `.env` file in the root directory, put in database credentials and port number. Assuming that we use port `3001` and the credentials setup in the previous section
```
MYSQL_USER='root'
MYSQL_HOST='localhost'
MYSQL_PASSWORD='password'
MYSQL_DATABASE='linksystem'

PORT=3001
```
3. Start server
```
npm run devStart
```
Server will be available at localhost:3001