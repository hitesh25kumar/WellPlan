import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "wellplan.db";
const database_version = "1.0";
const database_displayname = "Well plan da";
const database_size = 200000;

export default class Database {

  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM Product LIMIT 1').then(() => {
                  console.log("Database is ready ... executing query ...");
              }).catch((error) =>{
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction((tx) => {
                      tx.executeSql('CREATE TABLE IF NOT EXISTS Product (taskId, taskName, taskDate, taskMonth, taskYear, taskTime,taskHour,taskMin, taskDesc, priority, dailyReminder, taskStatus, createdTime)');
                  }).then(() => {
                      console.log("Table created successfully");
                  }).catch(error => {
                      console.log(error);
                  });
              });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      });
  };

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          console.log('error: ', error);
          // this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };

  listProduct() {
    return new Promise((resolve) => {
      const tasks = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Product p ORDER BY taskStatus DESC , taskId ', []).then(([tx,results]) => {
            console.log("Query completed");
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(`Task ID: ${row.taskId}, Prod Name: ${row.taskName}`)
              const { taskId,priority, taskName, taskDate, taskMonth, taskYear, taskTime, taskHour, taskMin, taskDesc,dailyReminder,taskStatus,createdTime } = row;
              tasks.push({
                taskId, taskName, taskDate, taskMonth, taskYear, taskTime, taskHour, taskMin, taskDesc, priority, dailyReminder, taskStatus, createdTime
              });
            }
            console.log('tasks:. ', tasks);
            resolve(tasks);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  productById(id) {
    console.log(id);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx,results]) => {
            console.log(results);
            if(results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
            }
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  addProduct(prod) {
    console.log('prod: ', prod);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Product VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)', [prod.taskId, prod.taskName, prod.taskDate, prod.taskMonth, prod.taskYear, prod.taskTime, prod.taskHour, prod.taskMin, prod.taskDesc, prod.priority, prod.dailyReminder, prod.taskStatus, prod.createdTime]).then(([tx, results]) => {
            resolve(results);
            console.log('results: ', results);
          });
        }).then((result) => {
          console.log('result:2 ', result);
          this.closeDatabase(db);
        }).catch((err) => {
          console.log('err: ', err);
          console.log(err);
        });
      }).catch((err) => {
        console.log('err:2 ', err);
        console.log(err);
      });
    });  
  }

  updateProduct(taskId, prod) {
    console.log('prod: ', prod);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Product SET taskName  = ?, taskDate  = ?, taskMonth  = ?, taskYear  = ?, taskTime  = ?, taskHour = ?,taskMin = ?, taskDesc  = ?, priority  = ?, dailyReminder = ?, taskStatus = ?, createdTime = ? WHERE taskId = ?', [prod.taskName, prod.taskDate, prod.taskMonth, prod.taskYear, prod.taskTime, prod.taskHour ,prod.taskMin, prod.taskDesc, prod.priority, prod.dailyReminder, prod.taskStatus, prod.createdTime,taskId]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  deleteProduct(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
            console.log(results);
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }
}