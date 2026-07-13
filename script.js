// Глобальные переменные
  let photos = [];          // Массив для хранения всех фото
  let currentPhotoIndex = 0; // Текущий индекс фото
  const room = document.getElementById('room');
  const viewerSection = document.getElementById('viewerSection');
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');

  // Обработка перетаскивания файлов
  dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
  });

  // Обработка выбора файлов через клик
  dropZone.addEventListener('click', () => {
      fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
  });

  // Основная функция обработки файлов
  function handleFiles(files) {
      Array.from(files).forEach(file => {
          if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (e) => {
                  photos.push(e.target.result);

                  // Если это первое фото, показываем раздел просмотра
                  if (photos.length === 1) {
                      showViewer();
                  }

                  // Если есть несколько фото, создаем слайдер
                  if (photos.length > 1) {
                      createPhotoSlider();
                  }
              };
              reader.readAsDataURL(file);
          }
      });
  }

  // Показываем раздел просмотра
  function showViewer() {
      viewerSection.style.display = 'block';
      room.innerHTML = '';

      photos.forEach((photo, index) => {
          const img = document.createElement('img');
          img.src = photo;
          img.style.display = index === 0 ? 'block' : 'none';
          img.dataset.index = index;
          room.appendChild(img);

          // Добавляем эффект при загрузке
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
              img.style.opacity = '1';
          }, 100);
      });
  }

  // Создаем слайдер для нескольких фото
  function createPhotoSlider() {
      const existingImages = room.querySelectorAll('img');

      photos.forEach((photo, index) => {
          // Если изображение уже есть, обновляем его
          if (existingImages[index]) {
              existingImages[index].src = photo;
          } else {
              // Если нет, создаем новое
              const img = document.createElement('img');
              img.src = photo;
              img.style.display = index === currentPhotoIndex ? 'block' : 'none';
              img.dataset.index = index;
              img.style.opacity = '0';
              img.style.transition = 'opacity 0.5s ease';
              room.appendChild(img);

              setTimeout(() => {
                  img.style.opacity = '1';
              }, 100);
          }
      });
  }

  // Функции навигации
  function moveLeft() {
      const currentImg = room.querySelector(`img[data-index="${currentPhotoIndex}"]`);
      if (currentImg) {
          currentImg.style.display = 'none';
      }

      currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
      const nextImg = room.querySelector(`img[data-index="${currentPhotoIndex}"]`);
      if (nextImg) {
          nextImg.style.display = 'block';
      }

      // Добавляем эффект переключения
      room.style.transform = 'translateX(-20px)';
      setTimeout(() => {
          room.style.transform = 'translateX(0)';
      }, 200);
  }

  function moveRight() {
      const currentImg = room.querySelector(`img[data-index="${currentPhotoIndex}"]`);
      if (currentImg) {
          currentImg.style.display = 'none';
      }

      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      const nextImg = room.querySelector(`img[data-index="${currentPhotoIndex}"]`);
      if (nextImg) {
          nextImg.style.display = 'block';
      }

      // Добавляем эффект переключения
      room.style.transform = 'translateX(20px)';
      setTimeout(() => {
          room.style.transform = 'translateX(0)';
      }, 200);
  }

  function resetView() {
      currentPhotoIndex = 0;
      room.querySelectorAll('img').forEach((img, index) => {
          img.style.display = index === 0 ? 'block' : 'none';
      });

      // Анимация сброса
      room.style.transform = 'scale(0.9)';
      setTimeout(() => {
          room.style.transform = 'scale(1)';
      }, 300);
  }

  // Клавиатурная навигация
  document.addEventListener('keydown', (e) => {
      if (photos.length === 0) return;

      switch(e.key) {
          case 'ArrowLeft':
              moveLeft();
              break;
          case 'ArrowRight':
              moveRight();
              break;
          case 'Home':
              resetView();
              break;
      }
  });

  // Показываем прогресс загрузки
  function showProgress(message) {
      const progressDiv = document.createElement('div');
      progressDiv.className = 'progress';
      progressDiv.textContent = message;
      progressDiv.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 20px;
          border-radius: 10px;
          z-index: 1000;
      `;
      document.body.appendChild(progressDiv);

      setTimeout(() => {
          progressDiv.remove();
      }, 2000);
  }

  // Добавляем поддержку сенсорных устройств (для мобильных)
  let touchStartX = 0;
  let touchEndX = 0;

  room.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  });

  room.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  });

  function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        moveRight();
    }
    if (touchEndX > touchStartX + 50) {
        moveLeft();
    }
}

console.log('3D Tour Maker загружен! 🚀');
