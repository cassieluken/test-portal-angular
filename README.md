# test-portal-angular
Simplilearn TCS assignment 2 - test portal

PHASE 2: Quiz Portal
-----------------------------------------
Quiz.component: has two modes(quiz & result) quiz mode is loaded ngOnInit and the dropdown switches the quizzes. When the submit button is clicked a confirm alert will show, if yes is clicked the application will continue to submit, if no is clicked the user will return to their test. After yes is clicked, the mode will switch to result to display the questions and whether or not they were correct or incorrect. Questions that were not answered are marked as incorrect. From here the user can also use the drop down to select the other quiz. 
Both modes have a go to top and go to bottom button functionality that on scroll of a certain px the buttons will appear to maneuver the single page quiz quicker.

servies: quiz.service used to switch quiz content

models: option model, question model, quiz model, config model not used...

data: two json files for the quizzes (angular and javaScript)

technologies used: Angular, bootstrap, html/css

the node_modules was deleted for size purposes
