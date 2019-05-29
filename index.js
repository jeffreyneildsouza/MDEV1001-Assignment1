const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){

    //1 - Create an in memory database with a ‘Classroom’ and ‘Department’ table containing the above relations.
    console.log("\n Creating ‘Classroom’ and ‘Department’ tables \n");
    db.run("CREATE TABLE Classroom(Building TEXT, Room_number NUMBER, Capacity NUMBER)");

    db.run("INSERT INTO Classroom VALUES('Packard',101,500)");
    db.run("INSERT INTO Classroom VALUES('Painter',514,10)");
    db.run("INSERT INTO Classroom VALUES('Taylor',3128,70)");
    db.run("INSERT INTO Classroom VALUES('Watson',100,30)");
    db.run("INSERT INTO Classroom VALUES('Watson',120,50)");

    db.run("CREATE TABLE Department(Dept_name  TEXT, Building TEXT, Budget NUMBER)");

    db.run("INSERT INTO Department VALUES('Biology','Watson',90000)");
    db.run("INSERT INTO Department VALUES('Comp. Sci.','Taylor',100000)");
    db.run("INSERT INTO Department VALUES('Elec. Eng.','Taylor',85000)");
    db.run("INSERT INTO Department VALUES('Finance','Painter',120000)");
    db.run("INSERT INTO Department VALUES('History','Painter',50000)");
    db.run("INSERT INTO Department VALUES('Music','Packard',80000)");
    db.run("INSERT INTO Department VALUES('Physics','Watson',70000)");


    // 2 - Print the room number and building name for those rooms whose capacity is greater than 50.

    db.all("SELECT Building, Room_number FROM Classroom WHERE Capacity > 50", function(err,row){
        console.log("\n Rooms whose capacity is greater than 50 : \n");
        console.log(row);
    });

 

    //3 - Print the names of those departments whose budgets are greater than $85,000.
    db.all("SELECT Dept_name FROM Department WHERE Budget > 85000", function(err,row){
        console.log("\n Departments whose budgets are greater than $85,000 : \n");
        console.log(row);
    }); 

  
    //4 - For each department, print the total capacity available.
    db.all("SELECT d.Dept_name, SUM(c.Capacity) as 'Total Capacity' FROM Classroom AS c, Department AS d WHERE d.Building = c.Building GROUP BY d.Dept_name", function(err,row){
        
        console.log("\n Total capacity available for each department : \n");
        console.log(row);
    });
  /*     
  

*/ 
});