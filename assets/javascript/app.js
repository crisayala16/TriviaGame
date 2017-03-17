$(document).ready(function(){
	var contentBody = $(".content-body");
	var incorrectAnswers = 0;
	var correctAnswers = 0;
	var unanswered = 0;
	var answerArray = [];
	var onIndex = 0;
	var questionTimer;
	var gifTimer;
	var quesTNumber = 30;
	var gifTNumber = 4;
	var queryUrl;


	function getGif(){
		contentBody.append("<div id='giphy'></div>");
			$.ajax({
				url: queryUrl,
				method: "GET"
			}).done(function(response){
				var random = Math.floor(Math.random() * 11);
				$("#giphy").html("<img src='" + response.data[random].images.fixed_height.url + "'>");
			})
	}
	//This timer is for the questions
	function questionDecrement(){
		quesTNumber--;

		$("#timer").html("<h1>Time remaining: " + quesTNumber + "</h1>");
		//Code triggered when the user runs out of time for the current question
		if(quesTNumber === 0){
			clearInterval(questionTimer);
			unanswered++;
			contentBody.html("<h2>Out of Time!</h2>");
			contentBody.append("<h2>The correct answer was: " + answerArray[0] + "</h2>");
			getGif();
			gifTNumber = 4;
			gifTimer = setInterval(gifDecrement, 1000);
		}	
	}
	//This timer is for showing the gif
	function gifDecrement(){
		gifTNumber--;
		if(gifTNumber === 0){
			onIndex++;
			answerArray = [];
			triviaGame.runTrivia(onIndex);
			clearInterval(gifTimer);
		}
	}

	var triviaGame = {
		questions: [{

			question: "Which character was Walt Disney’s favorite?",
			options: ["Goofy", "Minney Mouse", "Mickey Mouse","Donald Duck"]

		},
		{
			question: "What is the name of The Last Airbender?",
			options: ["Aang", "Katara", "Appa", "Albert"]
		},
		{

			question: "Which Vice President was known for loving ice cream and wearing the same sunglasses since adolescence?",
			options: ["Joe Biden", "Dick Cheney", "Dan Quayle","Albert Gore"] 
		},
		{
			question: "Which animal went to space first?",
			options: ["Dog", "Monkey", "Cat", "Parrot"]
		},
		{
			question: "What is the longest-running show?",
			options: ["The Simpsons", "Law and Order", "Survivor", "Gunsmoke"]
		},
		{
			question: "Long Island is a part of which US state?",
			options: ["New York", "Pennsylvania", "New Jersey", "Massachusetts"]
		},
		{
			question: "It's ________!?",
			options: ["John Cena", "Jonny", "a me, Mario", "begining to look a lot like Christmas"]
		},

		],
        //Resets the options to their original values.
		resetOptions: function(){
			triviaGame.questions[0].options = ["Goofy", "Minney Mouse", "Mickey Mouse","Donald Duck"];
			triviaGame.questions[1].options = ["Aang", "Katara", "Appa", "Albert"];
			triviaGame.questions[2].options = ["Joe Biden", "Dick Cheney", "Dan Quayle","Albert Gore"];
			triviaGame.questions[3].options = ["Dog", "Monkey", "Cat", "Parrot"];
			triviaGame.questions[4].options = ["The Simpsons", "Law and Order", "Survivor", "Gunsmoke"];
			triviaGame.questions[5].options = ["New York", "Pennsylvania", "New Jersey", "Massachusetts"];
			triviaGame.questions[6].options = ["John Cena", "Jonny", "a me, Mario", "begining to look a lot like Christmas"];


		},

		runTrivia: function(index){
			contentBody.html("");
			contentBody.append("<div id='timer'></div>");
			quesTNumber = 30;
			clearInterval(gifTimer);
			questionTimer = setInterval(questionDecrement, 1000);

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
			queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + triviaGame.questions[onIndex].options[0] + "&rating=g&limit=11&api_key=dc6zaTOxFJmzC";
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
		if($(this).val() === answerArray[0]){
			clearInterval(questionTimer);
			contentBody.html("<h1>Correct!</h1>");
			getGif();
			correctAnswers++;
			answerArray = [];

		}
		else if($(this).val() !== answerArray[0]){
			clearInterval(questionTimer);
			contentBody.html("<h1>Incorrect!</h1>");
			contentBody.append("<h1>The correct answer was: " + answerArray[0] + "</h1>");
			getGif();
			incorrectAnswers++;
			answerArray = [];

		}
		if(onIndex < triviaGame.questions.length - 1){
		clearInterval(questionTimer);
		gifTNumber = 4;
		gifTimer = setInterval(gifDecrement, 1000);
		}
		else{
			contentBody.append("<h1>Correct Answers: " + correctAnswers + "</h1>");
			contentBody.append("<h1>Incorrect Answers: " + incorrectAnswers + "</h1>");
			contentBody.append("<h1>Unaswered questions: " + unanswered + "</h1>");
			clearInterval(questionTimer);
			clearInterval(gifTimer);
			contentBody.append("<input type='button' id='start-btn' value='Restart'></input>");
			onIndex = 0;
			triviaGame.resetOptions();
			correctAnswers = 0;
			incorrectAnswers = 0;
			unanswered = 0;

		}
	})

})