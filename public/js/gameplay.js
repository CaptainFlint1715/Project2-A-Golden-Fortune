// executes when choice is selected
const choiceHandler = async (event) => {
  event.preventDefault();

  const button = event.target;
  console.log('hello')

  const choiceId = button.getAttribute('data-id')
  // const trigger = button.getAttribute('data-trigger')


  try {
    const postResponse = await fetch('/api/choice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: choiceId }),
    });

    if (!postResponse.ok) {
      throw new Error('Failed to add choice to CharacterChoice');
    }

    console.log('Choice added to CharacterChoice successfully');
  } catch (err) {
    console.error('Error adding choice to CharacterChoice:', err);
  }

  // document.location.replace(`/scene/${trigger}`)

};

document.querySelector('#choose-path').addEventListener('click', choiceHandler);






    //     // Retrieve the scene text from the response
//     const sceneData = await response.json();
//     const sceneText = sceneData.text;

//     // Animate the text onto the page
//     const animatedTextElement = document.getElementById('animated-text');
//     animatedTextElement.innerHTML = ''; // Clear previous content if any
//     const animatedText = anime.timeline();
//     animatedText
//       .add({
//         targets: animatedTextElement,
//         innerHTML: [0, sceneText.length],
//         easing: 'linear',
//         duration: 1000,
//       })
//       .add({
//         targets: animatedTextElement,
//         opacity: [0, 1],
//         easing: 'linear',
//         duration: 500,
//       });

// function chooseOption(option) {
//   // Perform any necessary logic based on the chosen option
//   switch (option) {
//     case 1:
//       // Perform actions for Option 1
//       console.log('Option 1 chosen');
//       break;
//     case 2:
//       // Perform actions for Option 2
//       console.log('Option 2 chosen');
//       break;
//     case 3:
//       // Perform actions for Option 3
//       console.log('Option 3 chosen');
//       break;
//     default:
//       console.log('Invalid option chosen');
//   }


// document
//   .querySelectorAll('.choice-option')
//   .addEventListener('choose', choiceHandler)
