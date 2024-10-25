document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-details');
  const closeBtn = document.querySelector('.close-btn');

  // Define the content for each experience here
  const experiences = {
    aiPromptBattle: `
      <h2>AI Prompt Battle</h2>
      <p>The AI Prompt Battle was created to bring fun and competition to AI in all fields. It won the Cyberjam Hackathon and was used at the Chicago Fashion Coalition event and the Vitalia Biohacking Conference.</p>
    `,
    tedTalk: `
      <h2>TEDxArlington Heights Talk</h2>
      <p>I was chosen to deliver a TEDxArlington Heights Talk on the accessibilty and approachability of AI created with my AI Prompt Battle through fun and competition. I worked for 6 months to memorize and write my script for the day of the conference.</p>
    `,
    captainInterview: `
      <h2>Coffee With Captain Appearance</h2>
      <p>I appeared on "Coffee With Captain," a Crypto/NFT podcast hosted by a Bored Ape Yacht Club holder.</p>
      <audio controls>
        <source src="images/captainInterview.mp3" type="audio/mp3">
        Your browser does not support the audio.
      </audio>
    `,
    brc: `
      <h2>Bored Racket Club</h2>
      <p>I created a global community of Bored Apes and pickleball players through designing, creating, and advertising BAYC #3794-branded pickleball paddles. We've held events in Chicago and Lisbon for our customers.</p>
      <a href="https://www.boredrackets.com/">Bored Racket Club Website</a>
    `,
    hermanShout: `
      <h2>imnotArt Internship</h2>
      <p>During my internship at Chicago's first art gallery, imnotArt, I had the opportunity to work with Improbable, the London-based Metaverse company. I created a public metaverse for imnotArt, equipped with music, games, and even a special MLB collaboration trivia!</p>
    `,
    visionPro: `
      <h2>imnotArt Internship</h2>
      <p>At my internship at imnotArt, I was able onboard the Chicago community to AI, the metaverse, and the Apple Vision Pro.</p>
    `,
    ethChi: `
      <h2>ETH Chicago 2023 Conference</h2>
      <p>I volunteered for ETH Chicago 2023 in the Willis Tower and was able to make valuable connections with university students involved in Web3. We even visited Drive Capital to meet venture capitalists.</p>
    `,
    nakamoto: `
      <h2>Nakamoto Internship</h2>
      <p>In the summer of 2024, I was able to travel to downtown Chicago everyday for my job at Nakamoto. I worked on applying AI to many industries for our clients, and even presented to the CEO of @properties for my project. I also researched the applications of AI and blockchain for doing business.</p>
    `,
    tennis: `
      <h2>Tennis</h2>
      <p>I've played tennis as long as I can remember and made the varsity team on my freshman and ended up winning conference champion at 3rd singles that year. Since then, I've played in the state lineup on a runner-up team. I also coach young tennis players in the summers. I'll be playing my final season this spring.</p>
    `,
    marvila: `
      <h2>Bored Racket Club @ MBA Bodega</h2>
      <p>At ApeFest Lisbon, I had the opportunitiy to sell my Bored Racket Club products at the Made By Apes Bodega. I was able to meet my customers in-person from over 10 countries and sold out of my inventory.</p>
    `,
    lisbonEvent: `
      <h2>Bored Racket Club Lisbon Event</h2>
      <p>I organized and hosted the first international Bored Racket Club event for ApeFest Lisbon. People from 6 countries and of all skill levels came to play pickleball with the Bored Racket Club.</p> 
    `
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const detailsKey = item.getAttribute('data-details');
      if (experiences[detailsKey]) {
        modalContent.innerHTML = experiences[detailsKey];
        modal.style.display = 'block';
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});
