const newAdventure = async (event) => {
    event.preventDefault()

    try {
        const postResponse = await fetch('/api/story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: req.session.user_id }),
        });
    
        if (!postResponse.ok) {
          throw new Error('Failed to add CharacterStory');
        }
    
        console.log('Character successfully');
      } catch (err) {
        console.error('Error adding CharacterStory:', err);
      }
}




document.querySelector('#start-adventure-button').addEventListener('click', newAdventure)
