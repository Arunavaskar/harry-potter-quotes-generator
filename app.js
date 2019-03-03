/* HARRY POTTER QUESTIONS BEGIN HERE*/
var state = {
	current: 0,
  questions: [ 
    { /*QUESTION #1*/
		text: "New students need to learn the secrets of the castle. How many staircases does Hogwarts have?",
		choices: ["A) 142", "B) 300", "C) 197", "D) 256"],
		correct: 0
    },
    { /*QUESTION #2*/
		text: "Fred Weasley’s chosen Potterwatch code name was _______, which was the secretive radio programme set up by the Order of the Phoenix.",
		choices: ["A) Dulph", "B) Will", "C) Tix", "D) Rapier"],
		correct: 3
		},
		{ /*QUESTION #3*/
    	text: "Cedric Diggory did not let Harry use the prefect's bathroom in The Goblet of Fire.",
    	choices: ["A) True", "B) False"],
    	correct: 1
		},
		{ /*QUESTION #4*/
		text: "Harry first took the Knight Bus in The Prisoner of Azkaban. How much does a ticket cost if it includes hot chocolate?",
		choices: ["A) 5 sickles", "B) 20 sickles", "C) 14 sickles", "D) 9 sickles"],
		correct: 2
    },
    { /*QUESTION #5*/
		text: "On the wall across from the Room of Requirement, there is a tapestry showing the wizard, ______, trying to teach trolls ballet.",
		choices: ["A) Barnabus the Barmy.", "B) Barnabus.", "C) The Barmy.", "D) None of the Above"],
		correct: 0
    },
    { /*QUESTION #6*/
		text: "In the Hall of Prophecy there are rows and rows of glowing orbs, Row 97 contains the prophecy about Harry and Voldemort.",
		choices: ["A) True", "False"],
		correct: 0 
		},
		{ /*QUESTION #7*/
    	text: "Where do the Dursleys live?",
    	choices: ["A) 12 Grimmauld Place", "B) 14 Magnolia Lane", "C) 4 Privet Drive", "D) 2 Rookridge Way"],
    	correct: 2
		},
		{ /*QUESTION #8*/
    	text: "The word _____ appears in the Oxford English Dictionary.",
    	choices: ["A) Dementor", "B) Muggle", "C) Apparate", "D) Butterbeer"],
    	correct: 1
		},
		{ /*QUESTION #9*/
    	text: "Who created the Sorcerer's (Philosopher's) Stone?",
    	choices: ["A) Dumbledore", "B) Voldemort", "C) Tom Riddle", "D) Nicholas Flamel"],
    	correct: 3
		},
		{ /*QUESTION #10*/
    	text: "Vernon Dursley work at Grunnings which is a manufacturing company that produces wands.",
    	choices: ["A) True", "B) False"],
    	correct: 1
    }
  ],
  incorrectFeedback: ["Are you sure you are a true Harry Potter Fan?\n","True fans know this question!\n","Is this the best you can do?\n", "Are you sure you are a wizarding world expert?\n"],
  correctFeedback: ["Correct! Maybe you are a true wizard after all!\n","Correct! You are on your way to proving your wizardry mastery.\n","That's right for an easy question!\n", "Yes, I am starting to see your wizardry wit!\n"],
  score: 0,
};
/* HARRY POTTER QUESTIONS END HERE*/

$(document).ready(function() {
	$(".start").click(function(event) {
		$(".quiz-start").hide();
		$(".question-view").removeClass("hide");
		event.preventDefault();
		showQuestion();
	});

	$('.choices').on('click','li',function(){
		if(!$('li.chosen').length){
			var guess = $(this).attr('id');
			$(this).addClass('chosen');
			checkAnswer(guess);
			$(".next-question").removeClass("hide");
		} 
	});
	
	$(".next-question").click(function(event) {
		if ((state.current) != state.questions.length) {
			$(".next-question").addClass("hide");
			$(".feedback").html('');
			$(".score").addClass("hide");
			$(".remaining-questions").html('');
			showQuestion();
		} else {
			$(".question-view").addClass("hide");
			$(".quiz-end").removeClass("hide");
			if (state.score == 1) {
				$(".score-display").text("Nice try, but you didn't prove your wizardy wit. You earned " + state.score + " score out of " + state.questions.length + "! I knew you were not a true wizarding world expert all along.");
			} else if (state.score < 5 || state.score == 0) {
				$(".score-display").text("Was that the best you could do? You earned " + state.score + " points out of " + state.questions.length + "!");
			} else if (state.score == 5) {
				$(".score-display").text("Wow, you never back down! You earned " + state.score + "  points out of " + state.questions.length + "!");
			} else if (state.score > 5 && state.score < 8) {
				$(".score-display").text("You crushed this quiz! You earned " + state.score + "  points out of " + state.questions.length + "! You defeated Jefferson.");
			} else if (state.score >= 8) {
				$(".score-display").text("Wow, you did it! You earned " + state.score + "  points out of " + state.questions.length + "! You proved me wrong. You are in fact a true wizarding world expert!");
			}	
		}
	});

	$(".restart").click(function(event) {
		state.current = 0;
		state.score = 0;
		$(".quiz-end").addClass("hide");
		$(".score").addClass("hide");
		$(".feedback").html('');
		$(".remaining-questions").html('');
		$(".quiz-start").show();
	});
	
});

function showQuestion(){
	var currentQuestionNumber = (state.current + 1)
	$(".question-header").text(state.questions[state.current].text); 
	$(".question-number").text(currentQuestionNumber); 
	$(".question-image").attr( "src", state.questions[state.current].image);
	$(".remaining-questions").append("<p>" + (state.questions.length-currentQuestionNumber) + " question(s) remaining." + "</p>");
	$(".choices").html('');
	for (var i = 0; i < state.questions[state.current].choices.length; i++) {
		$(".choices").append('<li id="'+i+'">'+state.questions[state.current].choices[i]+'</li>');
	}
}

function checkAnswer(guess){
	$(".score").removeClass("hide");
	if (guess == state.questions[state.current].correct) {
		$(".feedback").append(
		"<p>" + state.correctFeedback[Math.floor(Math.random()*state.correctFeedback.length)] + "</p>"); 
		state.score++;
		state.current++;
	} else {
		$('#'+state.questions[state.current].correct).addClass('correct-answer');
		$(".feedback").append("<p>" + state.incorrectFeedback[Math.floor(Math.random()*state.incorrectFeedback.length)] + "</p>" + "<p>" + "\ANSWER: " + state.questions[state.current].choices[state.questions[state.current].correct] + "</p>");
		$(".feedback p:nth-child(2)").addClass("bold");
		state.current++; 
	}
}
