

document.addEventListener('DOMContentLoaded', () => {
    const textConversation = document.querySelector('.text-conversation');
    const textNodes = Array.from(textConversation.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
    
    // Function to animate text with typewriter effect
    const animateText = () => {
      anime({
        targets: textNodes,
        opacity: 1,
        duration: 2000,
        easing: 'linear',
        delay: (_, index) => index * 100,
      });
    };
  
    animateText();
  });
  