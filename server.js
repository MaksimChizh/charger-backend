const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'secret';
let users = []; 

// База даних станцій
const stations = [
    {
        id: '1',
        name: 'Центральна станція №1',
        address: 'Майдан Волі, 1',
        latitude: 49.5535,
        longitude: 25.5948,
        status: 'available',
        connectorType: 'Type 2 / CCS',
        pricePerKwh: 12.5,
        powerKw: 50,
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500',
        description: 'Потужна швидкісна станція. Поруч розташований торговий центр та кафе. Працює цілодобово.'
    },
    {
        id: '2',
        name: 'Зарядка ТРЦ Подоляни',
        address: 'вул. Текстильна, 28',
        latitude: 49.5745,
        longitude: 25.6055,
        status: 'occupied',
        connectorType: 'Type 2',
        pricePerKwh: 11.0,
        powerKw: 22,
        imageUrl: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=500',
        description: 'Зручна зарядка під час шопінгу. Знаходиться на підземній парковці сектор А-3.'
    }
];

// Маршрут для списку всіх станцій
app.get('/api/stations', (req, res) => res.json(stations));

// Маршрут для ДЕТАЛЕЙ однієї станції (ЦЕ ВИПРАВЛЯЄ 404)
app.get('/api/stations/:id', (req, res) => {
    const station = stations.find(s => s.id === req.params.id);
    if (station) {
        res.json(station);
    } else {
        res.status(404).json({ message: 'Станцію не знайдено' });
    }
});

// Решта маршрутів (login, register, profile)
app.post('/api/auth/register', (req, res) => {
    users.push(req.body);
    res.status(201).json({ message: 'Ok' });
});

app.post('/api/auth/login', (req, res) => {
    res.json({ token: 'fake-jwt-token', user: req.body });
});

app.get('/api/user/profile', (req, res) => {
    res.json({ firstName: 'Максим', lastName: 'Чиж', balance: 250 });
});

app.listen(PORT, () => console.log(`Сервер працює на http://localhost:${PORT}`));