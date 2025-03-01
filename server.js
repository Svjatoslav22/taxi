import { log } from 'console';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'site')));

const cars = [
    {
        name: 'Toyota Camry',
        image: 'img/toyota_camry.jpg',
        driver: 'Олексій',
        price: '500 грн/година',
        max_speed: "150 км/год",

        seats: 6,
        description: 'Зручний та комфортний седан для вашої подорожі.'
    },
    {
        name: 'Mercedes-Benz E-Class',
        image: 'img/mercedes_e_class.jpg',
        driver: 'Ірина',
        price: '700 грн/година',
      max_speed: "180 км/год",

        seats: 6,
        description: 'Елегантний автомобіль для ділових поїздок.'
    },
    {
        name: 'BMW 5 Series',
        image: 'img/bmw_5_series.jpg',
        driver: 'Володимир',
        price: '600 грн/година',
      max_speed: "180 км/год",
        
        seats: 6,
        description: 'Спортивний седан з чудовими характеристиками.'
    },
    {
        name: 'Audi A6',
        image: 'img/audi_a6.jpg',
        driver: 'Анна',
        price: '650 грн/година',
      max_speed: "180 км/год",
      seats: 6,
        description: 'Стильний та технологічний автомобіль для комфортної подорожі.'
    },
    {
        name: 'Volkswagen Passat',
        image: 'img/volkswagen_passat.jpg',
        driver: 'Максим',
        price: '550 грн/година',
      max_speed: "180 км/год",
      seats: 6,
        description: 'Надійний вибір для будь-якої подорожі.'
    },
    {
        name: 'Honda Accord',
        image: 'img/honda_accord.jpg',
        driver: 'Катерина',
        price: '500 грн/година',
      max_speed: "220 км/год",
      seats: 6,
        description: 'Економічний та зручний автомобіль з комфортом для пасажирів.'
    },
    {
        name: 'Ford Mondeo',
        image: 'img/ford_mondeo.jpg',
        driver: 'Юрій',
        price: '520 грн/година',
      max_speed: "190 км/год",
      seats: 6,
        description: 'Надійний автомобіль для подорожей містом і за його межами.'
    },
    {
        name: 'Skoda Superb',
        image: 'img/skoda_superb.jpg',
        driver: 'Олена',
        price: '480 грн/година',
      max_speed: "130 км/год",
      seats: 6,
        description: 'Просторий салон та комфорт для великих компаній.'
    },
    {
        name: 'Hyundai Sonata',
        image: 'img/hyundai_sonata.jpg',
        driver: 'Олександр',
        price: '490 грн/година',
      max_speed: "280 км/год",
      seats: 6,
        description: 'Сучасний автомобіль з усіма необхідними зручностями.'
    },
    
];

app.get('/api/cars', (req, res) => {
    res.json(cars);
});

const EMAIL_USER = 'svtm1234567@gmail.com';
const EMAIL_PASS = 'xlro yaxk dpvs mrue';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    },
    debag: true,
    logger: true
});

app.post('/send-buy', (req, res) => {
    const { name, phone, taxiService } = req.body;

    const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER,
        subject: `Нове замовлення від ${name}`,
        text: `Ім'я: ${name}\nТелефон: ${phone}\nПослуга: ${taxiService}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Помилка надсилання:', error);
            return res.status(500).send('Не вдалося надіслати повідомлення.');
        }
        console.log('Лист надіслано:', info.response);
        res.send('Ваше замовлення успішно надіслано!');
    });
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
