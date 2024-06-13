let div =document.querySelector('#questions')

const btn = document.querySelector("#next");

let index = 0;
let result = 0;
let totalMarks = 0;
let questionsArr = [];

// shuffle array----->>>


function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

// Render Question ---->>>

  const renderQuestion = (arr) => {
    if (index < questionsArr.length) {
      const answerArr = [
        ...arr[index].incorrectAnswers,
        arr[index].correctAnswer,
      ];
      div.innerHTML += `
        <h5>Q${index + 1}: ${arr[index].question.text}</h5>
        <ul>
        ${shuffleArray(answerArr).map(
          (items) => `
          <li>
          <input type="radio" name="choice" class="choice" id=${items} value=${items}><label for=${items}>${items}</label>
          </li>`
        )}
        </ul>
        `;
    } else {
      console.log("question completed");
      window.location = "result.html";
      localStorage.setItem(
        "result",
        JSON.stringify({
          totalMarks,
          result,
        })
      );
    }
  };




  const getQuestions = async () => {
    //using async await
  
    try {
      const data = await fetch("https://the-trivia-api.com/v2/questions");
      const response = await data.json();
      console.log(response);
      totalMarks = response.length * 10;
      questionsArr = response;
      renderQuestion(response);
    } catch (error) {
      console.log("error===>", error);
    }

};

getQuestions();

// button next  ----->>>

btn.addEventListener("click", () => {
  const choice = document.querySelectorAll(".choice");
  div.innerHTML = "";
  choice.forEach((item) => {
    if (item.checked) {
      if (item.nextSibling.innerHTML === questionsArr[index].correctAnswer) {
        result += 10;
      }
    }
  });
  index += 1;
  renderQuestion(questionsArr);
});






