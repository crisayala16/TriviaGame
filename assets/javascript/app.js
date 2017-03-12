$(document).ready(function(){
	var contentBody = $(".content-body");
	var incorrectAnswers = 0;
	var correctAnswers = 0;
	var answerArray = [];
	var onIndex = 0;
	var intervalId;
	var intervalId2;
	var number;
	var number2 = 4;
	var queryUrl;
	//This timer is for the questions
	function decrement(){
		number--;

		$("#timer").html("<h1>Time remaining: " + number + "</h1>");

		if(number === 0){
			clearInterval(intervalId);
			onIndex++;
			answerArray = [];
			incorrectAnswers++;
			triviaGame.runTrivia(onIndex);
			number = 30;
		}	
	}
	//This timer is for showing the giphy
	function decrement2(){
		number2--;
		if(number2 === 0){
			onIndex++;
			answerArray = [];
			triviaGame.runTrivia(onIndex);
			clearInterval(intervalId2);
		}
	}

	var triviaGame = {
		questions: [{

			question: "Who played the title character in the teen sitcom musical Hannah Montana?",
			options: ["Mily Cyrus", "Taylor Swift", "Miranda Cosgrove","Katy Perry"]

		},
		{
			question: "What country was host to the 1930 inaugural FIFA Football World Cup?",
			options: ["Uruguay", "South Africa", "Japan", "Brazil"]
		},
		{

			question: "What is the melting point of ice in Fahrenheit?",
			options: ["32", "16", "36","10"] 
		},
		{
			question: "Who painted a late 15th-century mural known as the Last Supper?",
			options: ["Leonardo da Vinci", "Michelangelo", "Titian", "Filippino Lippi"]
		},
		{
			question: "The final link of the first transcontinental railroad across the United States was completed in which state?",
			options: ["Utah", "Nevada", "Colorado", "Texas"]
		},
		{
			question: "Long Island is a part of which US state?",
			options: ["New York", "Pennsylvania", "New Jersey", "Massachusetts"]
		},

		],
        //Resets the options to their original values.
		resetOptions: function(){
			triviaGame.questions[0].options = ["Mily Cyrus", "Taylor Swift", "Miranda Cosgrove","Katy Perry"];
			triviaGame.questions[1].options = ["Uruguay", "South Africa", "Japan", "Brazil"];
			triviaGame.questions[2].options = ["32", "16", "36","10"];
			triviaGame.questions[3].options = ["Leonardo da Vinci", "Michelangelo", "Titian", "Filippino Lippi"];
			triviaGame.questions[4].options = ["Utah", "Nevada", "Colorado", "Texas"];
			triviaGame.questions[5].options = ["New York", "Pennsylvania", "New Jersey", "Massachusetts"];

		},

		runTrivia: function(index){
			$("#start-btn").remove();
			contentBody.html("");
			contentBody.append("<div id='timer'></div>");
			number = 30;
			clearInterval(intervalId2);
			intervalId = setInterval(decrement, 1000);

			var answer = triviaGame.questions[index].options[0];
			//shuffles the options
			function shuffleOptions(d){
				for(var c = d.length - 1; c > 0; c--) {
					var b = Math.floor(Math.random() * (c + 1));
					var a = d[c];
					d[c] = d[b];
					d[b] = a;
				}
				return d
			};
			answerArray.push(answer);
			console.log(answerArray);
			queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + triviaGame.questions[onIndex].options[0] + "&api_key=dc6zaTOxFJmzC";
			shuffleOptions(triviaGame.questions[index].options);
			//displays the question and options onto the page
			contentBody.append("<h2 class='questionOutput'>" + triviaGame.questions[index].question + "</h2>");
			contentBody.append("<input  type='button' class='option' value='" + triviaGame.questions[index].options[0] + "'></input>");
			contentBody.append("<input  type='button' class='option' value='" + triviaGame.questions[index].options[1] + "'></input>");
			contentBody.append("<input  type='button' class='option' value='" + triviaGame.questions[index].options[2] + "'></input>");
			contentBody.append("<input  type='button' class='option' value='" + triviaGame.questions[index].options[3] + "'></input>");

		}
	};
	//On click event for start button
	$(document).on("click", "#start-btn",function(){
		triviaGame.runTrivia(onIndex);
	})
	//on click event for when an option is clicked
	$(document).on("click", ".option", function(){
		if($(this).val() == answerArray[0]){
			clearInterval(intervalId);
			contentBody.html("<h2>Correct!</h2>");
			contentBody.append("<div id='giphy'></div>");
			$.ajax({
				url: queryUrl,
				method: "GET"
			}).done(function(response){
				$("#giphy").html("<img src='" + response.data[0].images.fixed_height.url + "'>");
			})
			correctAnswers++;
			answerArray = [];

		}
		else{
			clearInterval(intervalId);
			contentBody.html("<h2>Incorrect!</h2>");
			contentBody.append("<h2>The correct answer was: <strong>" + answerArray[0] + "</strong></h2>");
			contentBody.append("<div id='giphy'></div>");
			$.ajax({
				url: queryUrl,
				method: "GET"
			}).done(function(response){
				$("#giphy").html("<img src='" + response.data[0].images.fixed_height.url + "'>");
			})
			incorrectAnswers++;
			answerArray = [];

		}
		if(onIndex < triviaGame.questions.length - 1){
		number2 = 4;
		intervalId2 = setInterval(decrement2, 1000);
		}
		else{
			contentBody.append("<h2>Correct Answers: " + correctAnswers + "</h2>");
			contentBody.append("<h2>Incorrect Answers: " + incorrectAnswers + "</h2>");
			clearInterval(intervalId);
			clearInterval(intervalId2);
			contentBody.append("<input type='button' id='start-btn' value='Restart'></input>");
			onIndex = 0;
			triviaGame.resetOptions();
			correctAnswers = 0;
			incorrectAnswers = 0;

		}
		clearInterval(intervalId);
	})

})