function setup(a) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple', true)
    request.onload = function() {
            var data = JSON.parse(this.response)
            if (request.status >= 200) {
                console.log(data)
                document.write(data.results[1].question)
            } else {
                console.log('error')
            }
        }
        // Send request
    request.send()
    console.log(a)
    return data.results
}
var setupMessage = "Called API"
var question = setup(setupMessage)
var points = 0
var lives = 5
var questionNum = -1
var fileName = location.href.split("/").slice(-1)
alert(location)

game(question, questionNum, lives, points)

function game(question, questionNum, lives, points) {
    while (lives > 0 || questionNum > 10) {
        var questionNum = questionNum + 1
        if (fileName === "q.html") {
            File.write.write(question[questionNum].question)
        } else if (fileName === "a.html") {
            document.write(question[questionNum].correct_answer)
        }
    }



}