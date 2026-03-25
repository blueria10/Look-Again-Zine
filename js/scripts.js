


// --- SETUP BACKGROUND (100 COPIES) ---
const bgContainer = document.createElement('div');
bgContainer.className = 'bg-container';
document.body.prepend(bgContainer);

const bgImages = [];
const set4to9 = [4, 5, 6, 7, 8, 9];
const set13to19 = [13, 14, 15, 16, 17, 18];

// Create 100 upright tiles
for (let i = 0; i < 100; i++) {
const img = document.createElement('img');
img.src = '';
img.className = 'bg-tile';
bgContainer.style.backgroundColor = '#000000';

// Random Position only
img.style.top = Math.random() * 100 + 'vh';
img.style.left = Math.random() * 100 + 'vw';

bgContainer.appendChild(img);
bgImages.push(img);
}

//Background Swap Logic
const radioButtons = document.querySelectorAll('input[name="r"]');

radioButtons.forEach((radio) => {
radio.addEventListener('change', () => {
    bgImages.forEach(img => {
    if (radio.id === 'r1') { 
            // ONLY Slide 1 shows Page 1 copies
            img.src = '';
            bgContainer.style.backgroundColor = '#000000';
            document.querySelectorAll('.bg-word').forEach(word => word.remove());


            } else if (radio.id === 'r4') { 
            // SET 1: Pages 4-9
            const num = set4to9[Math.floor(Math.random() * set4to9.length)];
            img.src = `images/page${num}.jpg`;
            img.style.opacity = '0.1';
            bgContainer.style.backgroundColor = '#28292d';
            document.querySelectorAll('.bg-word').forEach(word => word.remove());



            } else if (radio.id === 'r9') { 
            // SET 2: Pages 13-19
            const num = set13to19[Math.floor(Math.random() * set13to19.length)];
            img.src = `images/page${num}.jpg`;
            img.style.opacity = '0.1';
            //make the words opacity 0.1
            document.querySelectorAll('.bg-word').forEach(word => word.remove());

            bgContainer.style.backgroundColor = '#28292d';

            } else if(radio.id === 'r8'){
            // ONLY Slide 13 shows Page 13 copies
            img.src = '';
            bgContainer.style.backgroundColor = '#000000';
            document.querySelectorAll('.bg-word').forEach(word => word.remove());

            // Create 15 instances of the phrase
            for (let i = 0; i < 30; i++) {
                const word = document.createElement('div');
                word.className = 'bg-word';
                word.innerText = 'Now look again.';
                word.style.backgroundColor = 'white';
                word.style.color = 'black';
                
                // Randomize position
                word.style.left = Math.random() * 90 + '%';
                word.style.top = Math.random() * 90 + '%';
                // Randomize font size for variety
                word.style.fontSize = (Math.random() * 12 + 15) + 'px';
                
                bgContainer.appendChild(word);

            }


            } else if(radio.id === 'r10'){
            // ONLY Slide 19 shows Page 19 copies
            img.src = '';
            bgContainer.style.backgroundColor = '#000000';
            document.querySelectorAll('.bg-word').forEach(word => word.remove());


            } else if(radio.id === 'r3' || radio.id === 'r5'){
            // ONLY Slide 4 and 5 have black background
            bgContainer.style.backgroundColor = 'black';
            img.src = '';
            document.querySelectorAll('.bg-word').forEach(word => word.remove());
            }else {
            // EVERY OTHER PAGE: opacity for page 1 down
            img.src = '';
            img.style.opacity = '0.05';
            bgContainer.style.backgroundColor = '#000000';
            document.querySelectorAll('.bg-word').forEach(word => word.remove());
            }
    });
});
});

//SETUP CUSTOM CURSOR
const cursor = document.getElementById('custom-cursor');
const slider = document.querySelector('.slidershow');
const radios = document.querySelectorAll('input[name="r"]');

document.addEventListener('mousemove', (e) => {
  const rect = slider.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const sliderWidth = rect.width;
  const isOverZoomable = e.target.closest('.slide_multi img');

  // ZONE 1: Turn Page (Right 10%) - HIGHEST PRIORITY
  if (mouseX > sliderWidth * 0.9 && mouseX < sliderWidth+30) {
    cursor.style.display = 'block';
    cursor.dataset.active = "true";
    cursor.classList.remove('zoom-mode', 'zoom-out-mode'); // Clear zoom icons
    document.body.classList.add('is-over-right-side');
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

  // ZONE 2: Zoom Area (The rest of the image)
  } else if (isOverZoomable) {
    cursor.style.display = 'block';
    cursor.dataset.active = "false"; // Deactivate "Turn" mode
    document.body.classList.remove('is-over-right-side');
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    if (isOverZoomable.classList.contains('active')) {
      cursor.classList.add('zoom-out-mode');
      cursor.classList.remove('zoom-mode');
    } else {
      cursor.classList.add('zoom-mode');
      cursor.classList.remove('zoom-out-mode');
    }

  // ZONE 3: Everywhere else
  } else {
    cursor.style.display = 'none';
    cursor.dataset.active = "false";
  }
});



// Handle the click for BOTH Turning and Zooming
slider.addEventListener('click', (e) => {
  // Check if we are in the "Turn Page" zone
  if (cursor.dataset.active === "true") {
    let currentId = Array.from(radios).findIndex(r => r.checked);
    
    if (currentId < radios.length - 1) {
      radios[currentId + 1].checked = true;
      radios[currentId + 1].dispatchEvent(new Event('change'));
    } else {
      radios[0].checked = true; 
      radios[0].dispatchEvent(new Event('change'));
    }
  } 
  // If NOT turning, check if we clicked a multi-slide image to zoom
  else {
    const clickedImg = e.target.closest('.slide_multi img');
    if (clickedImg) {
      clickedImg.classList.toggle('active');
    }
  }
});



