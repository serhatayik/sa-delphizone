//All the JS code to append markup for the search and pagination links is in this file.
//Create pagination links depending on the number of students. We want 10 max per page.
//The first 10 students are shown when the page loads, and each pagination link displays the correct students.
//Clicking on “1” in the pagination links should should show students 1 to 10, etc...
//The correct HTML markup gets appended in the correct place (see filter-example.html) when the page loads.
//Searching is not case sensitive, you can type "Delano" or "delano"
//When the search button is pressed, the results should show up.
//Pagination links should update depending on the number of search results. 

//get all the main elements on the page
var page = document.querySelector(".page");
var studentList = document.querySelector(".student-list");
var eachStudent = document.querySelectorAll(".student-item");
var studentDetails = document.querySelector(".student-details");
var navlink = document.querySelector('.navlink');

//Set the pages variable
var currentPage = 1;
var numPages = 0;
var studentsPerPage = 10;
var index;


//Recreate Search Element in Js
var searchBar = function createBar (searchString) {

	var studentSearch = document.createElement("div");
	var input = document.createElement("input");
	var searchButton = document.createElement("button");

	input.type="text";

	var txtNode = document.createTextNode("Search");
	if ( typeof txtNode == "object" ) {
		searchButton.appendChild(txtNode);
	}

	studentSearch.setAttribute("class", "student-search");
	input.setAttribute("id", "inputSearch");
	searchButton.setAttribute("id", "search-button");
	
	//append these elements to the page
	studentSearch.appendChild(input);
	studentSearch.appendChild(searchButton);

	input.placeholder = "Type name here..";

	return studentSearch;
}

//Recreate pagination system in Js
var paginationFilter = function pageFilter (nbOfEntries) {
	var pagination = document.createElement('div');
	var ulList = document.createElement('ul');
	var liList = document.createElement('li');
	var pageLink = document.createElement('a');

	pagination.setAttribute("class", "pagination");
	pageLink.setAttribute("class", "navlink");
	pageLink.setAttribute("href", "#");

	pagination.appendChild(ulList);
	ulList.appendChild(liList);
	liList.appendChild(pageLink);

	return pagination;	
};

//Finding the number of students
var numberOfStudents = function () {
	var numberOfStudents = eachStudent.length;
	return (numberOfStudents);
}

//Finding the number of pages
var numberOfPages = function () {
	var numberOfPages = parseInt(numberOfStudents() / studentsPerPage);
	if ( numberOfStudents() % studentsPerPage > 0 ){
		numPages += 1;
	}
	return numberOfPages;
}
//Hiding all the students
var hideAll = function () {
	for (var i = 0; i < numberOfStudents(); i++) {
		eachStudent[i].style.display = "none";
	}
};

//Display only the 10 first items on the page
function showStudents (number) {
	for (var i = 0; i < studentsPerPage; i++) {
		index = number * studentsPerPage - studentsPerPage + i;
		eachStudent[index].style.display = "block";
		console.log(index);
	} 
};



function createPages () {
	for (var i = 0; i <= numberOfPages(); i++) {
		page.appendChild(paginationFilter());
		var navlink = document.getElementsByClassName(".navlink");
		var linkText = document.createTextNode(i);
		//navlink.appendChild('linkText');
		console.log(linkText);
	}
};


function changePage (pageNumber) {
	var studentList = student
//number multiplies like a template in the show student function in order 
}

var searchFunction = function searchFeature(searchString) {
	console.log("Is my search feature working?");
	//Get the value entered in the search box
	var inputString = document.getElementById('inputSearch');
	//var stringValue = inputString.value;
	//Onkeyup we want to filter the content by the string entered in the search box

	inputString.onkeyup = function() {
			//toUpperCase to make it case insensitive
			var filter = inputString.value.toUpperCase();
		//loop through all the lis 
		for (var i = 0; i < eachStudent.length; i++) {
			//Do this for all the elements (h3, email, joined-details, date)
			var tagName = document.getElementsByTagName("h3");
			var studentInfo = eachStudent[i].innerText;
			/*console.log(studentInfo, filter, studentInfo.toUpperCase().indexOf(filter));*/
			//display all the results where indexOf() does not return -1
			if (studentInfo.toUpperCase().indexOf(filter) != -1)  {
				eachStudent[i].style.display = 'list-item';
			} else {
				eachStudent[i].style.display = 'none';
			}
		}
	}
}


function addElements() {
	createPages();
}

function changePage (number) {
	document.addEventListener( "DOMContentLoaded", hideAll());
	document.addEventListener( "DOMContentLoaded", showStudents(number));
}

changePage(1);


window.onload = addElements();



