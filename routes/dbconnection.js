const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('./database/Supplier.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Supplier database.');
});
//db.run('DROP TABLE FILES')
//db.run('CREATE TABLE FILES(filename TEXT,uploaded_by  TEXT,status TEXT,date_of_upload TEXT,PRIMARY KEY (filename))');
//db.run('CREATE TABLE LOG(filename TEXT,status TEXT,error_message TEXT)');


//db.run('DELETE FROM FILES')

//insert one row into the langs table
//  db.run(`INSERT INTO FILES(filename,uploaded_by,status,date_of_upload) VALUES(?,?,?,?)`, ['abc.pdf','pardhu','Failed','date'], function(err) {
//   if (err) {
//     return console.log(err.message);
//   }
//   // get the last insert id
//   console.log(`A row has been inserted with rowid ${this.lastID}`);
// }); 

 db.serialize(() => {
    db.each(`SELECT *
             FROM FILES`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.filename + "\t" + row.status);
    });
  });
   
  /*db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  }); */

module.exports = db;