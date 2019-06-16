var myApp = angular
            .module("myModule",[])
            .service('StudentService',function(){    //here factory is used as a custom service  
              //A service is a singleton. Instantiated only once. That is same instance is maintained throughout the lifetime of application
              //factory is a simple function which allows us to add some logic before creating the object. It returns the created object. 
              var students = [
                    {name: "Hrishikesh", age: "25", roll_no:"1"},
                    {name: "Aditya", age: "21", roll_no:"2"},
                    {name: "Swarupa", age: "23", roll_no:"3"},
                    {name: "Varun", age: "25", roll_no:"4"},
                    {name: "Shweta", age: "23", roll_no:"5"}
              ];
              
              if (localStorage.getItem("students")===null){   //This condition is for getting an item from the local storage that is from the browser. 
                //   $scope.students=[                                     //JSON object 
                //       {name: "Hrishikesh", age: "25", roll_no:"1"},
                //       {name: "Aditya", age: "21", roll_no:"2"},
                //       {name: "Swarupa", age: "23", roll_no:"3"},
                //       {name: "Varun", age: "25", roll_no:"4"},
                //       {name: "Shweta", age: "23", roll_no:"5"}
  
                //  ];
               
                localStorage.setItem("items",JSON.stringify(students)); //setitem() when passed a key name and value will add that key to the given storage object
              //Json.Stringify: This is used to convert javascript object to string
              //JSON is used to exchange data to/from a web server. So to create $scope.students object into String this is used   
              }
              else{
                  students = JSON.parse(localStorage.getItem("students")); // by using JSON.parse() object is achieved from the data
                  //getItem returns the key's value that is students in this case. 
              }
              this.add = function(){    //this is the  CRUD  operation function written for adding the student name age and roll no
                  var newStudent = {name:"test",age:"test",roll_no:false}; //newStudent is added using this
                  students.push(newStudent); //pushing the new student into the local storage
                  localStorage.setItem("students", JSON.stringify(students)); //making it a string 
                }
              this.change = function(ind) {  //Update in CRUD operation is performed using this function
                  students[ind].show = !(students[ind].show); //
                  localStorage.setItem("students", JSON.stringify(students)); //again creating object to the string
                }
              this.delete = function(ind) { //this function in CRUD operations is used to delete a particular student
                  students.splice(students.indexOf(ind), 1); //the .splice is used for removing the elements from the array
                  localStorage.setItem("students", JSON.stringify(students)); //again converting into the string. 
                }
              
            })
            .controller("myController",function($scope,StudentService){  //I have used reference to the factory by writing simplefactory in the controller
              //used a controller over here. Which basically reponsible for a model for a particular view
               //A controller is also responsible for controlling the data. 
               //A code for localStorage of the data in the browser is  written.
              

               $scope.addStudent = function(){
                 StudentService.add($scope.addStudent);
                 $scope.addStudent = {};
               }

               $scope.changeStudent = function(){
                 StudentService.change($scope.changeStudent);
                 $scope.changeStudent = {};
               }
               
               $scope.deleteStudent = function(){
                $scope.deleteAction = StudentService.delete($scope.deleteStudent);
                return deleteAction;
               }



              // init();
              //  function init(){ //Initialization function for injecting the service into the controller. 
              //    $scope.students = simplefactory.getStudents();
              //    $scope.students = simplefactory.postStudents();
              //    $scope.students = simplefactory.deleteStudents();
              //  }
               
              
            });