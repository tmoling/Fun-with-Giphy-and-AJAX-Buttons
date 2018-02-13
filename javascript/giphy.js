$(document).ready(function () {

	//create an array of button variables
	var topic = ["Jerry", "Elaine", "George", "Kramer"];
	displayTopic();

//search bar...class from html
//input elements are used within a form element to declare input controls that allow users to input data.
	$('.searchArea').append("<form><input type='text' id='seinfeldInput'></input><input id ='addSeinfeld' type ='submit' value ='New Character'></input></form><br>");

	//loop for appending each button in the array
	function displayTopic() {
		$('.buttons').empty();
		for (var i = 0; i < topic.length; i++) {
			//code this var
			var thesePretzels = $('<button>')
			thesePretzels.addClass('festivus');

			thesePretzels.attr('data-name', topic[i]);
			thesePretzels.text(topic[i]);
			$('.buttons').append(thesePretzels);
		}
	}


		//helps in creating extra button for searching
		//val gets the current value of the first element in the set of matched elements or set the value of every matched element.
		//trim helps in accounting for extra spaces typed into search
	$('#addSeinfeld').on('click', function () {
		topic.push($('#seinfeldInput').val().trim());
		displayTopic();
		return false;
	})

	function showCharacter() {

		var yadaYada = $(this).attr('data-name');
		var newCharacter = yadaYada;

		//add in giphy url, key, get method
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newCharacter + "&api_key=sjb4PqrQknVK7mzCOnC9XPlh3klbBEWc" + "&limit=10";

		//empty method doesn't accept any arguments
		$(".seinfeldGif").empty();

		//the still command helps in freezing images upon page load
		//ajax used here to retrieve data from url database...remember url and GET
		//response is used for getting a response to the code being sent out...data from AJAX request comes back
		//use 'then' or 'done' here
		$.ajax({ url: queryURL, method: 'GET' }).then(function (response) {
			for (var i = 0; i < response.data.length; i++) {
				$('.seinfeldGif').prepend("<img src = " + response.data[i].images.downsized_still.url + " id = 'gif' still = " + response.data[i].images.downsized_still.url + " animate = " + response.data[i].images.downsized.url + " data-name = " + newCharacter + "><p>Rating: " + response.data[i].rating + "</p></div> </div>");
			}
		})
	}

	//call the function
	$(document).on('click', '.festivus', showCharacter);

	//animate gifs upon clicking
	//stop gifs upon clicking
	function stopAndStart() {

		if ($(this).attr("src") === $(this).attr('animate')) {
			$(this).attr("src", $(this).attr('still'));
		}
		else {
			$(this).attr("src", $(this).attr('animate'));
		}
	}

	//calling the function
	$(document).on('click', '#gif', stopAndStart);

});