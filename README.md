# VoiakaGM-shop-nest-prisma

## Для разработки

## Установка и запуск

``` bash
$ git clone git@github.com:TMWAG/voiakagm-shop-nest-v2-prisma.git
$ cd voiakagm-shop-nest-prisma
$ docker compose build && docker compose up -d
```

## Документация

### [Эндпоинты API](http://localhost:5000/api/docs)

### [Модель БД]()

## Переменные окружения

Для работы необходимо создать файл .env, содержащий следующие значения:

Ключ|Значение|Примечание
:---:|:---:|:---:
PORT|5000|Порт на котором будет запущенно приложение
POSTGRES_HOST|postgres|Хост БД
POSTGRES_PORT|5432|Порт БД
POSTGRES_USER|shop|Имя пользователя БД
POSTGRES_DB|shopdb|Название БД
POSTGRES_PASSWORD| - |Пароль БД, лучше сгенерировать 256-bit ключ
SECRET_KEY| - |Ключ шифрования JWT токена, лучше сгенерировать 256-bit ключ
EMAIL_HOST|smtp.gmail.com|Адрес почтового сервера
EMAIL_USER| - |Почта ящика-отправителя
EMAIL_PASS| - |Пароль почты ящика-отправителя
HOST_URL|*TBA*|URL Хоста

## Дополнительное ПО для разработки

### PGAdmin (Контейнеризованный)

#### Данные для входа 

+ Почта: dev@mail.com

+ Пароль: password

+ [Страница](http://localhost:5050)