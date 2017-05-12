var question1 = {
	"question": "Who is the best player in the world?",
	"choices": [
		"Messi",
		"C.Ronaldo",
		"bendtner",
		"Ahmad Al anbagi"
	],
	"answer": "Ahmad Al anbagi"
};

var question2 = {
	"question": "which team is the invincibles",
	"choices": [
		"Manchester United",
		"Arsenal",
		"tottenshit",
		"chelsea"
	],
	"answer": "Arsenal"
};

var question3 = {
	"question": "which team won the premier leauge 2002/2003?",
	"choices": [
		"Arsenal",
		"Manchester United",
		"liverpool",
		"Leeds United"
	],
	"answer": "Manchester United"
};

var question4 = {
	"question": "which team won the Seria A 2000/2001",
	"choices": [
		"AC MILAN",
		"INTER MILAN",
		"Juventus",
		"Roma"
	],
	"answer": "Roma"
};

var question5 = {
	"question": "Which team won the La Liga 1995/1996",
	"choices": [
		"Real Madrid",
		"Barcelona",
		"deportivo la coruna",
		"Atletico Madrid"
	],
	"answer": "Atletico Madrid"
};

var question6 = {
	"question": "Crystal Palace manager is ?",
	"choices": [
		"Eddie Howe",
		"Mike Phelan",
		"Steve Agnew",
		"Sam Allardyce"
	],
	"answer": "Sam Allardyce"
};

var question7 = {
	"question": "Where are we going this weekend?",
	"choices": [
		"Vegas",
		"Colorado",
		"Michigan",
		"California"
	],
	"answer": "Vegas"
};

var question8 = {
	"question": "who used the hand of god in the worldcup ",
	"choices": [
		"Pele",
		"D.Maradona",
		"Ronaldinho",
		"Messi"
	],
	"answer": "D.Maradona"
};

var question9 = {
	"question": "Who won the European Soccer Championship in 2000?",
	"choices": [
		"France",
		"Italy",
		"Germany",
		"Greece"
	],
	"answer": "France"
};

var question10 = {
	"question": "Which team did not take part in the European Soccer Championship 2012?",
	"choices": [
		"England",
		"Ukraine",
		"Poland",
		"Greece"
			],
	"answer": "England"
};

var game = {
	"questions": [
		question1, question2, question3, question4, question5, question6, question7, question8, question9, question10
	],
	"correctCount": 0,
	"incorrectCount": 0,
	"unansweredCount": 0
}

var questionsRemaining = game["questions"].slice();

var timer;

$("#backgroundMusic")[0].play();
$("#backgroundMusic")[0].loop = true;

var resetTimer = function() {
	var timeRemaining = 30;
	$("#timer").text(timeRemaining);
	timer = setInterval(function() {
		timeRemaining--;
		if(timeRemaining !== 1) {
			$("#timer").text(timeRemaining);
		}
		if(timeRemaining === 0) {
			var correctAnswerElement = $("<div>").text("The correct answer is: " + $(".choice").attr("answer"));
			clearQuestion();
			clearInterval(timer);
			var messageElement = $("<div>").text("Out of Time!");
			$(".question-container").append(messageElement);
			
			$(".question-container").append(correctAnswerElement);
			game["unansweredCount"]++;
			delayNextQuestion();
		}
	} , 1000);
}

var displayQuestion = function() {
	if(questionsRemaining.length > 0) {
		var question = questionsRemaining[0]["question"];
		var choices = questionsRemaining[0]["choices"];
		var answer = questionsRemaining[0]["answer"];

		var questionElement = $("<div>").text(question);
		questionElement.addClass("question");
		$(".question-container").append(questionElement);
		for(var i = 0; i < choices.length; i++) {
			var choiceElement = $("<div>").text(choices[i]);
			choiceElement.addClass("choice");
			choiceElement.attr("answer", answer);
			$(".question-container").append(choiceElement);
		}
		// remove the question that was just asked from the questions array
		questionsRemaining.shift();
	} else {
		var messageElement = $("<div>").text("We're done here! This never happened.");
		$(".question-container").append(messageElement);
		var correctAnswerElement = $("<div>").text("Correct Answers: " + game["correctCount"]);
		$(".question-container").append(correctAnswerElement);
		var incorrectAnswerElement = $("<div>").text("Incorrect Answers: " + game["incorrectCount"]);
		$(".question-container").append(incorrectAnswerElement);
		var unansweredElement = $("<div>").text("Unanswered: " + game["unansweredCount"]);
		$(".question-container").append(unansweredElement);
		spawnRestartButton();
	}
}

var clearQuestion = function() {
	$(".question-container").empty();
}

var delayNextQuestion = function() {
	setTimeout(function() {
		clearQuestion();
		if(questionsRemaining.length > 0) {
			resetTimer();
		}
		displayQuestion();
	}, 4000);
}

var spawnRestartButton = function() {
	var button = $("<button>").text("Restart");
	button.attr("id", "button-restart");
	$(".question-container").append(button);
}

$(document).on("click", ".choice", function() {
	if($(this).text() === $(this).attr("answer")) {
		clearQuestion();
		clearInterval(timer);
		var messageElement = $("<div>").text("Correct, you do have an idea about Soccer");
		$("#win")[0].play();
		$(".question-container").append(messageElement);
		game["correctCount"]++;
		delayNextQuestion();
	} else {
		var correctAnswerElement = $("<div>").text("The correct answer is: " + $(this).attr("answer"));
		clearQuestion();
		clearInterval(timer);
		$("#lose")[0].play();
		var messageElement = $("<div>").text("Nah ma man");
		$(".question-container").append(messageElement);
		$(".question-container").append(correctAnswerElement);
		game["incorrectCount"]++;
		delayNextQuestion();
	}
});

$(document).on("click", "#button-start", function() {
	$("#button-start").css("display", "none");
	$("#crest").css("display", "none");
	resetTimer();
	displayQuestion();
});

$(document).on("click", "#button-restart", function() {
	$(".question-container").empty();
	questionsRemaining = game["questions"].slice();
	game["correctCount"] = 0;
	game["incorrectCount"] = 0;
	game["unansweredCount"] = 0;
	resetTimer();
	displayQuestion();
});