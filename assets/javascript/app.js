$(document).ready(function(){
	var contentBody = $(".content-body");
	var triviaGame = {

		question1: {
			question: "What is my name?",
			answer: "Cris",
			option1: "Henry",
			option2: "Conor",
			option3: "Caiden"

		},

		runTrivia: function(){
			contentBody.html("");
			contentBody.append("<h2>" + triviaGame.question1.question +"</h2>");
			contentBody.append("<h3 class='option'>" + triviaGame.question1.option1 + "</h3>");
			contentBody.append("<h3 class='option'>" + triviaGame.question1.option2 + "</h3>");
			contentBody.append("<h3 class='option'>" + triviaGame.question1.option3 + "</h3>");
			contentBody.append("<h3 class='answer'>" + triviaGame.question1.answer + "</h3>");
		},

		wrongAnswer: function(){
			contentBody.html("<h2>Wrong Anwser!</h2>");
		},

	};
	$(".option").on("click", function(){
		contentBody.html("<h2>Wrong Anwser!</h2>");
		
	})

	$("#start-btn").on("click", function(){
		triviaGame.runTrivia();
	})

	
})