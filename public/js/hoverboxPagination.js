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
var hoverbox = document.querySelector(".hoverbox");
var eachItem = document.querySelectorAll(".hoverbox-item");
var hoverboxDetails = document.querySelector(".hoverbox-details");
var navlink = document.querySelector('.navlink');

//Set the pages variable
var currentPage = 1;
var numPages = 0;
var hoverboxsPerPage = 10;
var index;


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


//Display only the 10 first items on the page
function showImages (number) {
	for (var i = 0; i < hoverboxsPerPage; i++) {
		index = number * hoverboxsPerPage - hoverboxsPerPage + i;
		eachItem[index].style.display = "block";
		console.log(index);
	} 
};


//Finding the number of pages
var numberOfPages = function () {
	var numberOfPages = parseInt(numberOfStudents() / studentsPerPage);
	if ( numberOfStudents() % studentsPerPage > 0 ){
		numPages += 1;
	}
	return numberOfPages;
}
function createPages () {
	for (var i = 0; i <= numberOfPages(); i++) {
		page.appendChild(paginationFilter());
		var navlink = document.getElementsByClassName(".navlink");
		var linkText = document.createTextNode(i);
		//navlink.appendChild('linkText');
		console.log(linkText);
	}
};

var hideAll = function () {
	for (var i = 0; i < numberOfStudents(); i++) {
		eachItem[i].style.display = "none";
	}
};
function changePage (number) {
	document.addEventListener( "DOMContentLoaded", hideAll());
	document.addEventListener( "DOMContentLoaded", showImages(number));
}

changePage(1);


window.onload = addElements();



