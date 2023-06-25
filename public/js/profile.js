
const newAdventure = async (event) => {
    event.preventDefault()
    const button = event.target
    const userId = button.getAttribute('data-user')

    try {
        const postResponse = await fetch('/api/story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }),
        });
    
        if (!postResponse.ok) {
          throw new Error('Failed to add CharacterStory');
        }
    
        
        document.location.replace('/scene/1')
        console.log('Character added successfully');
      } catch (err) {
        console.error('Error adding CharacterStory:', err);
      }
}




document.querySelector('#start-adventure-button').addEventListener('click', newAdventure)
