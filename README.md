# WA-Yummy

A web application that allows sending messages and multimedia content to multiple recipients through WhatsApp, facilitating communication and promotion of products or services. You can connect multiple accounts simultaneously and receive all the responses unified in one place.

[Showcase](https://i.imgur.com/uWfmKE5.mp4)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

WA-Yummy is a web application that uses the following technologies:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Socket.io](https://socket.io/) - Socket.IO enables real-time, bidirectional and event-based communication.
- [Whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/) - A WhatsApp client library for NodeJS that connects through the WhatsApp Web browser made by [@pedroslopez](https://github.com/pedroslopez) and updated by [@PurpShell](https://github.com/PurpShell)
- [Prisma ORM](https://prisma.io) - Prisma ORM with SQLite.
- [Next.js](https://nextjs.org/) - The React Framework for Production.
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [DaisyUI](https://daisyui.com/) - Tailwind CSS Components.

### Installing

A step by step series of examples that tell you how to get a development env running.

1. Clone the repository

```
git clone git@github.com:Stroik/wa-yummy.git
```

2. Install dependencies

```
cd api && npm install
```

```
cd client && npm install
```

3. Configure the environment variables for api and client

`/api/.env`

```
DATABASE_URL="file:C:\\Users\\<Your_user>\\wa-yummy\\database\\database.db"
WHITELIST=["http://localhost:3000", "http://127.0.0.1:3000"]
PORT=3001

CHROME_PATH="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
FFMPEG_PATH="C:\\ffmpeg\\bin\\ffmpeg.exe"

JWT_SECRET="some_secret"

MAIL_HOST="smtp.gmail.com"
MAIL_PORT="465"
MAIL_SECURE="true"
MAIL_USER="some_email@gmail.net"
MAIL_PASS="123456"
```

`/client/.env.local`

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="some_secret_here"
API_URL="http://localhost:3001/rest"
NEXT_PUBLIC_API_URL="http://localhost:3001/rest"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

4. Install Prisma Globally

```
npm install -g prisma
```

5. Push the database schema to the database

```
prisma db push
```

6. Create users and roles from the `/api/prisma/seed.js`

```
prisma db seed
```

7. Run the development server

```
cd api && npm run dev
```

```
cd client && npm run dev
```

### Build

1. Build the client

```
cd client && npm run build
```

2. Build the api

```
cd api && npm run build
```

3. Run the server

```
cd api && npm run start
```

4. Run the client

```
cd client && npm run start
```

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at https://whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

## License

Licensed under the MIT (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at [https://opensource.org/license/mit/](https://opensource.org/license/mit/).

Copyright 2023 - Augusto Marinaro

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE