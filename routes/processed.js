/*import modules*/
var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var oembed = require("oembed-auto");
var bodyParser = require("body-parser");
var PythonShell = require('python-shell');
var fs = require('fs');
var path = require('path');
var database = require('./dbconnection');
var bbPromise = require('bluebird');
var spawn = require('child_process').spawn;  

app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*POST to run Python scripts*/
router.post('/pythonscripts', function (req, res, next) {

    /*Function to move files from inputs folder to input_processing folder*/
    var a = req.body;
    var arg=[];
   for (var i = 0; i < a.length; i++) {
       arg [i]= a[i].name; 
       console.log(arg);
       
      updatefilesjson(arg[i], "In_process");
      loadProcess(i);
   }
   function loadProcess(i){
    return new bbPromise(function(resolve, reject) {
          var process = spawn('python',["./scripts/P_Extract_Discounts.py",arg[i]] );
    
          process.stdout.on('data', function(data) {
               console.log(data.toString());
            //    var testFolder1 = './processed/';
            // fs.readdir(testFolder1, (err, files) => {
            //     files.forEach(file => {
            //         console.log(file);
                    //updatefilesjson(file, "processed"); //callback of updatefilesjson function
                    deletefilesjson(arg[i]); //callback of deletefilesjson function


                });
           // })
          
           // console.log("done");
          //});
    
          process.stderr.on('data', function(err) {
              console.log(arg[i]);
              
            reject(err.toString());
            updatefilesjson(arg[i], "process_failed"); //callback of updatefilesjson function
             //   });
           // });
            
          });
    
          process.on('exit', function() {
            resolve();
          });
        });
    }
      



      function updatefilesjson(UpdateFilename, Status, callback) {
        let data = [Status, UpdateFilename];
        console.log(data);
        let sql = `UPDATE FILES SET status = ? WHERE filename = ?`;
        database.run(sql, data, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Row(s) updated: ${this.changes}`);
            }
       
        });
    }
    
   //console.log(arg);
  
   /*Delete json file after processing*/
function deletefilesjson(removeFileName) {
    let filenamedata = removeFileName;
    // delete a row based on id
    database.run(`DELETE FROM FILES WHERE filename=?`, filenamedata, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });

   
}


    var commands = arg.map(function(value) {
        //console.log(value);
        return loadProcess.bind(null, value);
    });
    
      return bbPromise.map(commands, function(command) {
          //console.log(command);
        //return command();
      
    })
      .then(function() {
        console.log('Child Processes Completed');
      });

    
    });


    



    
        
    
    

      /*return new bbPromise(function(resolve, reject){
        var spawn = require("child_process").spawn;
     
    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script 
     
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will
    var process = spawn('python',["./scripts/P_Extract_Discounts.py",file] );
 
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        console.log("done");
        //res.send(data.toString());
    })

   }
})

});*/
    


module.exports = router;