const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');

if (slides.length > 0) {
  let currentIndex = 0;
  let autoPlayInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }
    showSlide(currentIndex);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoPlay();
      currentIndex = index;
      showSlide(currentIndex);
      startAutoPlay();
    });
  });

  startAutoPlay();
}
// ==============
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }
}

function toggleTheme() {
  body.classList.toggle('dark-mode');
  
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
}

themeToggle.addEventListener('click', toggleTheme);

loadTheme();
// ==============
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter'); // NOUVEAU
const doctorCards = document.querySelectorAll('.doctor');

if (searchInput && categoryFilter && doctorCards.length > 0) {
  

  function filterDoctors() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    
    doctorCards.forEach(card => {
      const doctorName = card.getAttribute('data-name').toLowerCase();
      const doctorSpecialty = card.getAttribute('data-specialty');
      
      
      const matchesSearch = doctorName.includes(searchTerm) || 
                           doctorSpecialty.toLowerCase().includes(searchTerm);
      
     
      const matchesCategory = selectedCategory === 'all' || 
                              doctorSpecialty === selectedCategory;
      

      const shouldShow = matchesSearch && matchesCategory;
      
      if (shouldShow) {
        card.classList.remove('hidden');

        card.style.animation = 'none';
        card.offsetHeight; 
        card.style.animation = 'fadeIn 0.5s ease-in-out';
      } else {
        card.classList.add('hidden');
        card.style.animation = 'none'; 
      }
    });
  }


  searchInput.addEventListener('input', filterDoctors);
  categoryFilter.addEventListener('change', filterDoctors); 
  

  filterDoctors();
}
