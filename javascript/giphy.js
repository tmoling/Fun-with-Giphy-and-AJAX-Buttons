$(document).ready(function(){

  //create an array of button variables
	var topic = ["Jerry", "Elaine", "George", "Kramer"];
	displayTopic();

	$('.searchArea').append("<form><input type='text' id='seinfeldInput'></input><input id ='addSeinfeld' type ='submit' value ='Submit'></input></form><br>");

function displayTopic(){
		$('.buttons').empty();
		for(var i = 0; i < topic.length; i++){
			var thesePretzels = $('<button>')
			thesePretzels.addClass('festivus');
			thesePretzels.attr('data-name', topic[i]);
			thesePretzels.text(topic[i]);
			$('.buttons').append(thesePretzels);
		}
}

$('#addSeinfeld').on('click', function(){

  //helps in creating extra button for searching
  topic.push($('#seinfeldInput').val().trim());

	displayTopic();
	
	return false; 
})

$(document).on('click', '.festivus', showCharacter);
$(document).on('click', '#gif', animateGIF);


function showCharacter(){

	var yadaYada = $(this).attr('data-name');
	var newCharacter = yadaYada; 
	
  //add in giphy url, key, get method
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+newCharacter+"&api_key=sjb4PqrQknVK7mzCOnC9XPlh3klbBEWc"+"&limit=10";

	$(".seinfeldGif").empty();

  //the still command helps in freezing images upon page load
  $.ajax({url: queryURL, method:'GET'}).done(function(response){
		for(var i = 0; i < response.data.length; i++){
			$('.seinfeldGif').prepend("<img src = " + response.data[i].images.downsized_still.url + " id = 'gif' still = " + response.data[i].images.downsized_still.url+" animate = " + response.data[i].images.downsized.url+" data-name = " + newCharacter + "><p>Rating: " + response.data[i].rating +"</p></div> </div>");
		}
	})
}

//animate gifs upon clicking
//stop gifs upon clicking
function animateGIF(){
	console.log(this);
	console.log($(this).attr('still'))
	if($(this).attr("src") === $(this).attr('animate')){
		$(this).attr("src", $(this).attr('still'));
	}
	else{
		$(this).attr("src", $(this).attr('animate'));
	}
}
});