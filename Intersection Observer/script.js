const cards = document.querySelectorAll(".card");


//observer for observing cards visibilty
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) cardObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.4,
    rootMargin: "100px",
  }
);

cards.forEach((card) => cardObserver.observe(card));

//observer for observing last card to implement lazy load
const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  fetchNewCard();
  lastCardObserver.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelectorAll(".card:last-child")[0]);
},{
    rootMargin:"100px"
});

const lastCard = document.querySelectorAll(".card:last-child");console.log(lastCard);
lastCardObserver.observe(lastCard[0]);

const cardContainer=document.querySelector(".card-container")

//function for mimic api fetch
function fetchNewCard() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    cardObserver.observe(card);
    cardContainer.append(card);
  }
}
