let myLibrary = [];
const input = [...document.querySelectorAll('input')];

function Book(title,author,numPages,readstatus) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readstatus = readstatus;
  console.log(readstatus);
}
// display form to add book


document.getElementById("addBook").addEventListener("click",openForm);

function openForm(){
document.getElementById("myForm").style.display = "block";
}

function closeForm(){
  document.getElementById("myForm").style.display = "none";

}
  
//add event listener to submit the library form
 
let submitForm = document.getElementById("submitBook");
submitForm.addEventListener('click',addBookToLibrary);
submitForm.addEventListener('submit',addBookToLibrary);

let form = document.getElementById('myForm');


function addBookToLibrary(e) {
  
 
  e.preventDefault();
  const myform = document.getElementById('myForm');
  let title = input[0].value;
  let author = input[1].value;
  let numPages = input[2].value;
  let select = document.getElementById("readstatus");
  let readstatus = select.options[select.selectedIndex].value;


  let book = new Book(title,author,numPages,readstatus);
  myLibrary.push(book);

  setData();
  myform.reset();
  let display = new Display();
  display.add(myLibrary);
  

}

//display constructor 
function Display(){

}

Display.prototype.add = function(myLibrary){
 let output = '<div><table id="booklist"><tr><th>Title</th><th>Author</th><th>Pages</th><th>Read Status</th><th>Delete</th></tr>';
 for(let i in myLibrary){

  output += '<tr id='+i+'><td>'+myLibrary[i].title+'</td><td>'+myLibrary[i].author+'</td><td>'+myLibrary[i].numPages+'</td><td><button class="readstatus-button" id="button'+i+'">'+myLibrary[i].readstatus+'</button></td><td><button class="delete" id='+i+'>Delete</button></td></tr>';
}
 output+='</table></div>'

let booklist = document.getElementById('displayform');
 booklist.innerHTML = output; 


//deleteing Book 
const deletBtn = document.querySelectorAll('.delete')
deletBtn.forEach((element)=>{
  element.addEventListener('click',(e)=>{
      
      let deleteBook = e.target.id;
      let display = new Display();
      display.delete(deleteBook);
      
  setTimeout(function(){
    deletBtn.disabled = true;false},2000);
       })
});

//toggling for readstatus

const readstatusBtn = document.querySelectorAll('.readstatus-button')

readstatusBtn.forEach((element)=>{
  element.addEventListener('click',(e)=>{
      
      let readstatusButtonId = e.target.id;
      let readstatusId = readstatusButtonId.replace('button','');
      const toggle = document.getElementById(readstatusButtonId);
      
      if(myLibrary[readstatusId].readstatus=="Read"){

         toggle.innerText = "Not Read";
         myLibrary[readstatusId].readstatus = "Not Read";
         setData();
     
        }else{

        toggle.innerText = 'Read';
        myLibrary[readstatusId].readstatus = "Read";
        setData();
      } 

      
       })
});

}

//prototype to remove book and also remove in local storage

Display.prototype.delete = function(bookId){
const toDeleteBook = document.getElementById(bookId);

toDeleteBook.remove();

myLibrary.splice(bookId,1);

setData();
}

//set data in local storage

function setData(){
  localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
}

function restore(){
  let display = new Display();
  if(!localStorage.myLibrary){
    display.add(myLibrary);

}else{
  let objects = localStorage.getItem('myLibrary');
  objects = JSON.parse(objects);
  myLibrary = objects;
  display.add(myLibrary);
  }
}
//uncomment to clear local storage
// localStorage.clear();



//to restore data from local storage
restore();

