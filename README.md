# RelaxMap — Backend API

> Серверна платформа для каталогізації локацій для відпочинку: створення локацій, категоризація за типами та регіонами, система оцінок та відгуків користувачів.

## 1. Про проєкт

**RelaxMap Backend** — це REST API на базі Node.js та Express, що забезпечує функціонування клієнтського застосунку для пошуку та оцінювання місць відпочинку.

Бізнес-завдання, що вирішує система:

- централізоване ведення бази локацій з фото, описом, координатами та рейтингом;
- структуризація контенту за типами та регіонами України;
- формування довіри через верифіковані відгуки користувачів;
- управління користувацьким профілем та авторським контентом.

База даних: MongoDB (Mongoose). Авторизація: сесійна з ротацією токенів.

## 2. Ключові можливості

**Користувачі та доступ:**

- реєстрація та вхід за email / пароль;
- сесійне оновлення токенів та безпечний вихід;
- профіль користувача, перегляд чужих профілів;
- оновлення імені та аватара.

**Локації:**

- публічний каталог із пагінацією, пошуком, фільтрами та сортуванням;
- детальна картка локації;
- створення та редагування локацій авторизованими користувачами.

**Зворотний зв'язок:**

- оцінка від 1 до 5 та текстовий відгук;
- перегляд відгуків за локацією;
- агрегований рейтинг та лічильник відгуків.

**Довідники:**

- перелік типів локацій: `GET /api/categories/types`;
- перелік регіонів: `GET /api/categories/regions`.

## 3. Технологічний стек

| Категорія      | Технологія                               |
| -------------- | ---------------------------------------- |
| Runtime        | Node.js, ES Modules                      |
| HTTP Framework | Express 5                                |
| БД / ODM       | MongoDB, Mongoose 9                      |
| Auth / Crypto  | bcrypt, crypto.randomUUID                |
| Валідація      | Celebrate, Joi                           |
| Файли          | Multer, Cloudinary SDK v2                |
| Безпека        | Helmet, CORS, cookie-parser, http-errors |
| Конфігурація   | dotenv                                   |
| Логування      | pino-http, pino-pretty                   |
| Якість коду    | ESLint, Prettier, EditorConfig           |
| Dev-режим      | Nodemon                                  |

## 4. Архітектура проєкту

```text
src/
├── server.js              # ініціалізація Express, CORS, маршрути, обробка помилок
├── db/connectToMongoDB.js # підключення до MongoDB
├── routes/                # визначення ендпоїнтів
├── controllers/           # бізнес-логіка запитів
├── services/              # сесії, користувачі, категорії
├── models/                # Mongoose-схеми
├── validations/           # Joi-схеми Celebrate
├── middleware/            # authenticate, multer, logger, errorHandler
├── utils/                 # Cloudinary, Mongoose-хелпери
└── constants/             # час життя токенів, regex, сортування
```

Принципи: тонкі маршрути, валідація на вході, сервісний шар для повторного використання, централізована обробка помилок.

## 5. Швидкий старт

**Вимоги:** Node.js 20+, MongoDB 6+, акаунт Cloudinary, npm 10+.

```bash
# 1. Клонування
git clone https://github.com/stanislave-droid/relax_map.git
cd relax_map_back

# 2. Встановлення залежностей
npm install

# 3. Конфігурація оточення
cp .env.example .env
# заповніть значення згідно з розділом 6

# 4. Запуск у режимі розробки
npm run dev

# 5. Запуск у продуктивному режимі
npm start
```

Сервер за замовчуванням: `https://relax-map-back-z38k.onrender.com/`.

Перевірка довідників:

```bash
curl https://relax-map-back-z38k.onrender.com/api/categories/types
curl "https://relax-map-back-z38k.onrender.com/api/locations?page=1&limit=10"
```

## 6. Змінні оточення

Файл `.env` (приклад — `.env.example`):

| Змінна                  | Призначення                      | Обов'язкова |
| ----------------------- | -------------------------------- | ----------- |
| `PORT`                  | Порт HTTP-сервера, напр. `3000`  | Так         |
| `NODE_ENV`              | `development` / `production`     | Так         |
| `MONGO_URL`             | Рядок підключення MongoDB        | Так         |
| `FRONTEND_DOMAIN`       | Дозволений CORS-origin фронтенду | Так         |
| `CLOUDINARY_CLOUD_NAME` | Ім'я хмари Cloudinary            | Так         |
| `CLOUDINARY_API_KEY`    | API-ключ Cloudinary              | Так         |
| `CLOUDINARY_API_SECRET` | API-секрет Cloudinary            | Так         |

> Файл `.env` не зберігається в репозиторії. Для production використовуйте менеджер секретів хостинг-платформи.

## 7. Скрипти

| Команда       | Дія                                          |
| ------------- | -------------------------------------------- |
| `npm start`   | Продуктивний запуск: `node src/server.js`    |
| `npm run dev` | Розробницький запуск з автоперезавантаженням |
| `npm test`    | Не налаштовано (заплановано)                 |

## 8. Огляд API

Базовий URL: `/api`. Формат обміну: JSON. Авторизація: cookies `sessionId`, `accessToken`, `refreshToken`.

### 8.1 Автентифікація — `/api/auth`

| Метод | Ендпоїнт    | Доступ    | Тіло запиту                 |
| ----- | ----------- | --------- | --------------------------- |
| POST  | `/register` | Публічний | `{ name, email, password }` |
| POST  | `/login`    | Публічний | `{ email, password }`       |
| POST  | `/refresh`  | Cookie    | —                           |
| POST  | `/logout`   | Приватний | —                           |

Приклад реєстрації:

```bash
curl -X POST https://relax-map-back-z38k.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"name":"Олена","email":"olena@example.com","password":"SecurePass123"}'
```

### 8.2 Локації — `/api/locations`

| Метод | Ендпоїнт       | Доступ    | Опис                                                               |
| ----- | -------------- | --------- | ------------------------------------------------------------------ |
| GET   | `/`            | Публічний | Список: `page, limit, region, type, search, sortBy, sortDirection` |
| GET   | `/:locationId` | Публічний | Деталі локації                                                     |
| POST  | `/`            | Приватний | Створення + `multipart/form-data image`                            |
| PATCH | `/:locationId` | Приватний | Оновлення полів та фото                                            |

Приклад пошуку:

```bash
curl "https://relax-map-back-z38k.onrender.com//api/locations?search=Карпати&region=Івано-Франківська&type=Гори&page=1&limit=10&sortBy=rate&sortDirection=desc"
```

### 8.3 Користувачі — `/api/users`

| Метод | Ендпоїнт             | Доступ    | Опис                                     |
| ----- | -------------------- | --------- | ---------------------------------------- |
| GET   | `/current`           | Приватний | Поточний користувач                      |
| GET   | `/:userId`           | Публічний | Публічний профіль                        |
| GET   | `/:userId/locations` | Публічний | Локації автора з пагінацією              |
| PATCH | `/me/avatar`         | Приватний | Оновлення `name` та `avatar` (multipart) |

### 8.4 Категорії — `/api/categories`

| Метод | Ендпоїнт   | Опис         |
| ----- | ---------- | ------------ |
| GET   | `/types`   | Типи локацій |
| GET   | `/regions` | Регіони      |

### 8.5 Відгуки — `/api/feedbacks`

| Метод | Ендпоїнт                      | Доступ    | Опис                         |
| ----- | ----------------------------- | --------- | ---------------------------- |
| GET   | `/?page=1&limit=3`            | Публічний | Усі відгуки                  |
| GET   | `/:locationId?page=1&limit=3` | Публічний | Відгуки локації              |
| POST  | `/:locationId`                | Приватний | `{ rate: 1-5, description }` |

Успішні відповіді: `200 OK`, створення — `201 Created`. Помилки повертаються у стандартизованому форматі `http-errors` та Celebrate.

## 9. Автентифікація та безпека

- Хешування паролів bcrypt (10 раундів).
- Access-токен: 15 хвилин. Refresh-токен: 1 доба з ротацією (стара сесія видаляється).
- Cookies: `httpOnly, Secure, SameSite=None`.
- Захист заголовків — Helmet. CORS — лише для `FRONTEND_DOMAIN` з `credentials: true`.
- Валідація email за regex, пароля — 8–128 символів, ObjectId — через Mongoose-хелпер.
- Пароль вилучається з відповідей API на рівні моделі.

Рекомендації для production: HTTPS обов'язково, додати rate-limit на `/api/auth`, аудит CORS-доменів.

## 10. Моделі даних

- **User:** `name, email (unique), password (hash), avatarUrl, articlesAmount`, timestamps.
- **Location:** `image, name (3-96), description (20-6000), locationType, region, rate (0-5), ownerId, feedbacksId[], feedbacksCount, coordinates {lat, lon}`, timestamps.
- **Feedback:** `userName, ownerId, rate (1-5), description, locationId`, timestamps.
- **Category:** `type, slug, shortDescription`.
- **Region:** `region, slug, level, note`.
- **Session:** `userId, accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil`.

## 11. Завантаження файлів

Multer у режимі memory storage → буфер передається до Cloudinary:

- аватари: `relax-map/avatars`, 500×500, `fill`, `gravity:auto`;
- фото локацій: `relax-map/locations`, 750×500;
- автооптимізація: `fetch_format:auto, quality:auto`.

Обмеження типів для оновлення локацій: `image/jpeg, image/jpg, image/png`.

## 12. Обробка помилок та логування

- `notFoundHandler` — для невідомих маршрутів (404).
- `celebrate errors()` — помилки валідації (400).
- `errorHandler` — централізований формат помилок.
- `pino-http` — структуроване логування запитів.

## 13. Розгортання

1. Встановіть змінні оточення на хостингу (Render / Railway / VPS).
2. Відкрийте доступ до MongoDB Atlas за IP або VPC.
3. Налаштуйте HTTPS (обов'язково для `Secure` cookies).
4. Команда запуску: `npm install && npm start`.
5. Health-check: `GET /api/categories/types` має повертати `200`.

## 14. Команда проєкту

Проєкт реалізовано командою з 12 учасників.

- **[stanislave-droid](https://github.com/stanislave-droid)** — власник репозиторію, Team Lead. Користувачі, локації, автентифікація, Cloudinary / Multer, сортування та виправлення.
- **[Ellen-HI](https://github.com/Ellen-HI)** — оновлення сесії, модель та сервіс сесій, виправлення сесій, оновлення користувача.
- **[LiliaMamutova](https://github.com/LiliaMamutova)** — модель користувача, повідомлення про помилки реєстрації.
- **[Viktor-8888](https://github.com/Viktor-8888)** — профіль поточного користувача.
- **[Roman-Bieloshchuk](https://github.com/Roman-Bieloshchuk)** — вихід із системи.
- **[HyriaRoman](https://github.com/HyriaRoman)** — локації користувача.
- **[OlgaDovgal](https://github.com/OlgaDovgal)** — створення локацій, отримання локації за ідентифікатором, виправлення контролера.
- **[oleksandr0681](https://github.com/oleksandr0681)** — валідація оновлення локацій, налаштування Multer, роутер локацій.
- **[KateB713](https://github.com/KateB713)** — типи категорій та формат відповіді категорій.
- **[LaraMach](https://github.com/LaraMach)** — регіони та лічильник відгуків.
- **[AnastasiiaAghfir](https://github.com/AnastasiiaAghfir)** — отримання відгуків.
- **[Guijeen](https://github.com/Guijeen)** — отримання останніх відгуків, створення нового відгука локаціі.
