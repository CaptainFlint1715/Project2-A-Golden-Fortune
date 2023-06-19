const choiceHandler = async (event) => {
  event.preventDefault()

  const button = event.target
  const triggered_scene_id = button.getAttribute('data-triggered-scene')
  
  try {
    const response = await fetch(`/scene/${triggered_scene_id}`)

    if (!response.ok) {
      throw new Error('failed to get next scene')
    }

    console.log('next scene fetched successfully')
  } catch (err) {
    console.error(err)
  }

}



function chooseOption(option) {
  // Perform any necessary logic based on the chosen option
  switch (option) {
    case 1:
      // Perform actions for Option 1
      console.log('Option 1 chosen');
      break;
    case 2:
      // Perform actions for Option 2
      console.log('Option 2 chosen');
      break;
    case 3:
      // Perform actions for Option 3
      console.log('Option 3 chosen');
      break;
    default:
      console.log('Invalid option chosen');
  }

  // Redirect or update the scene as per the chosen option
  // Add your code to navigate to the next scene or update the content dynamically
}

document
  .querySelectorAll('.choice-option')
  .addEventListener('choose', choiceHandler)