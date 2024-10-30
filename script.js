document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-details');
  const closeBtn = document.querySelector('.close-btn');

  // Define the content for each experience
  const experiences = {
    aiPromptBattle: `
      <h2>AI Prompt Battle</h2>
      <p>I created the AI Prompt Battle to bring fun and competition to AI in all fields. This project won the Cyberjam Hackathon. The AI Prompt Battle was recently used at the Chicago Fashion Coalition event and the Vitalia Biohacking Conference.</p>
    `,
    tedTalk: `
      <h2>TEDxArlington Heights Talk</h2>
      <p>I was selected to deliver a TEDxArlington Heights Talk on the accessibility and fun of AI. I worked for six months to pitch my idea, develop my script and prepare to deliver the TEDxArlington Heights Talk in October.</p>
    `,
    captainInterview: `
      <h2>Coffee With Captain Appearance</h2>
      <p>I appeared on "Coffee With Captain," a Crypto/NFT podcast hosted by a Bored Ape Yacht Club holder, in front of 1,700 listeners.</p>
      <audio controls>
        <source src="images/captainInterview.mp3" type="audio/mp3">
        Your browser does not support the audio.
      </audio>
    `,
    brc: `
      <h2>Bored Racket Club</h2>
      <p>I am the founder and CEO of Bored Racket Club, a global community of Bored Apes and pickleball players. I applied for a Made for Apes license and designed, created, and advertised branded pickleball paddles. I sold out of the paddles at the premier industry conference, and I hosted global events in Chicago and Lisbon for community members. I even was accepted into a selective startup incubator and received $30,000 in funding.</p>
      <a href="https://www.boredrackets.com/">Bored Racket Club Website</a>
    `,
    hermanShout: `
      <h2>imnotArt Internship</h2>
      <p>During my internship at Chicago's first art gallery, imnotArt, I had the opportunity to work with Improbable, the London-based Metaverse company. I created a public metaverse for imnotArt, equipped with music, games, and even a special MLB collaboration trivia!</p>
    `,
    visionPro: `
      <h2>imnotArt Internship</h2>
      <p>At my internship at imnotArt, I onboarded members of the Chicago community to AI, the metaverse, and the Apple Vision Pro.</p>
    `,
    ethChi: `
      <h2>ETH Chicago 2023 Conference</h2>
      <p>I volunteered for ETH Chicago 2023 where I made valuable connections with university students involved in web3. I also visited Drive Capital to meet venture capitalists.</p>
    `,
    nakamoto: `
      <h2>Nakamoto Internship</h2>
      <p>In the summer of 2024, traveled to downtown Chicago everyday for my job at Nakamoto. I worked on applying AI to many industries for our clients, and even presented to the CEO of @properties to showcase AI's integration to the real estate industry. I also researched the integration of AI and blockchain.</p>
    `,
    tennis: `
      <h2>Tennis</h2>
      <p>I've played tennis for as long as I can remember and made the varsity team starting my freshman year, winning conference champion at 3rd singles that year. Since then, I've played in the state lineup. I also coach middle school tennis players in the summers.</p>
    `,
    marvila: `
      <h2>Bored Racket Club @ MBA Bodega</h2>
      <p>At ApeFest Lisbon, I had the opportunitiy to sell my Bored Racket Club products at the Made By Apes Bodega. I was able to meet my customers in-person from over 10 countries and sold out of my inventory.</p>
    `,
    lisbonEvent: `
      <h2>Bored Racket Club Lisbon Event</h2>
      <p>I organized and hosted the first international Bored Racket Club event for ApeFest Lisbon. People from all around the world and of all skill levels came to play pickleball with the Bored Racket Club.</p> 
    `,
    metaCollective: `
      <h2>Meta Collective</h2>
      <p>I founded Meta Collective, Illinois' first Web3-devoted high school club, as a Freshman. I lead weekly meetings, discussing the happenings of cryptocurrencies, NFTs, and more emerging financial markets. We've increased our group's digital wallet value by over 600% trading these assets, hosted and attended events around the state, and promoted the interdisciplinary nature of Web3 around the school!</p>
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

  // Function to adjust gallery layout based on screen width
  function updateGalleryLayout() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 768) {
      gallery.style.gridTemplateColumns = 'repeat(4, 1fr)'; // 4 columns on larger screens
    } else {
      gallery.style.gridTemplateColumns = '1fr'; // 1 column on smaller screens
    }
  }

  // Run on initial load
  updateGalleryLayout();

  // Listen for window resize and update layout dynamically
  window.addEventListener('resize', updateGalleryLayout);
});
