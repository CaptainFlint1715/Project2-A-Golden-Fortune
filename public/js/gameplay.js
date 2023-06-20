fetch('/path/to/Scenedata.json')
      .then(response => response.json())
      .then(data => {
        // Update the scene text
        const sceneTextElement = document.getElementById('scene-text');
        sceneTextElement.textContent = data[0].text; // Display the first scene text initially

        // Add event listeners for the options
        document.getElementById('option1').addEventListener('click', () => chooseOption(data[0].id));
        document.getElementById('option2').addEventListener('click', () => chooseOption(data[1].id));
        document.getElementById('option3').addEventListener('click', () => chooseOption(data[2].id));
      })
      .catch(error => {
        console.error('Error loading scene data:', error);
      });

    // Function to handle option selection
    function chooseOption(optionId) {
      // Handle the chosen option here
      console.log('Option chosen:', optionId);
    }