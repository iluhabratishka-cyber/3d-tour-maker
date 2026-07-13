3. Замените весь код на этот:

// Глобальные переменные
let photos = [];          // Массив для хранения всех фото
let currentPhotoIndex = 0; // Текущий индекс фото
const room = document.getElementById('room');
const viewerSection = document.getElementById('viewerSection');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('3D Tour Maker загружен! 🚀');
});

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
    showDropZoneFeedback();
});

// Обработка выбора файлов через клик
dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    showDropZoneFeedback();
});

// Показываем обратную связь при загрузке
function showDropZoneFeedback() {
    dropZone.innerHTML = '<p>📸 Загрузка... Подождите</p>';
    dropZone.style.background = '#e8f5e9';

    setTimeout(() => {
        if (photos.length > 0) {
            dropZone.innerHTML = '<p>✅ Фото загружено! Нажмите "Далее"</p>';
            dropZone.style.background = '#e3f2fd';
            createNextButton();
        }
    }, 1000);
}

// Создаем кнопку "Далее"
function createNextButton() {
    let nextButton = document.getElementById('nextButton');
    if (!nextButton) {
        nextButton = document.createElement('button');
        nextButton.id = 'nextButton';
        nextButton.textContent = '🎮 Перейти к просмотру';
        nextButton.style.cssText = `
            background: #4CAF50;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s;
        `;
        nextButton.onclick = showViewer;
        dropZone.appendChild(nextButton);
    }
}

// Основная функция обработки файлов
function handleFiles(files) {
    if (files.length === 0) return;

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photos.push({
                    src: e.target.result,
                    name: file.name
                });

                console.log(`Загружено фото: ${file.name}`);

                // Если это первое фото, показываем раздел просмотра
                if (photos.length === 1) {
                    setTimeout(() => {
                        showViewer();
                    }, 1500);
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// Показываем раздел просмотра
function showViewer() {
    if (photos.length === 0) {
        alert('Сначала нужно загрузить хотя бы одно фото!');
        return;
    }

    viewerSection.style.display = 'block';
    room.innerHTML = '';

    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = `Фото ${index + 1}`;
        img.style.display = index === 0 ? 'block' : 'none';
        img.dataset.index = index;
        img.className = 'photo-image';
        room.appendChild(img);

        // Анимация появления
        setTimeout(() => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        }, 100 * index);
    });

    // Добавляем информацию о загруженных фото
    const photoInfo = document.createElement('div');
    photoInfo.className = 'photo-info';
    photoInfo.innerHTML = `📸 Загружено ${photos.length} фото ${photos.length > 1 ? 'для переключения используйте кнопки' : ''}`;
    viewerSection.insertBefore(photoInfo, viewerSection.firstChild);
}

// Создаем слайдер для нескольких фото
function createPhotoSlider() {
    room.innerHTML = '';

    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = `Фото ${index + 1}`;
        img.style.display = index === currentPhotoIndex ? 'block' : 'none';
        img.dataset.index = index;
        img.className = 'photo-image';
        room.appendChild(img);
    });
}

// Функции навигации
function moveLeft() {
    if (photos.length <= 1) return;

    const currentImg = room.querySelector(`img[data-index="${currentPhotoIndex}"]`);
    if (currentImg)
 // Глобальные переменные
  let photos = [];          // Массив для хранения всех фото
  let currentPhotoInd
