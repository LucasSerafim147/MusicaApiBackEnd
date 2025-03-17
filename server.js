const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let musics = [
    { 
        id: 1, 
        title: 'Bohemian Rhapsody', 
        artist: 'Queen', 
        duration: '5:55',
        cover: 'https://upload.wikimedia.org/wikipedia/en/9/95/Queen_Bohemian_Rhapsody_cover.jpg'  
    },
    { 
        id: 2, 
        title: 'Imagine', 
        artist: 'John Lennon', 
        duration: '3:03',
        cover: 'https://upload.wikimedia.org/wikipedia/en/6/60/John_Lennon_-_Imagine.jpg'
    },
    { 
        id: 3, 
        title: 'Hey Jude', 
        artist: 'The Beatles', 
        duration: '7:11',
        cover: 'https://upload.wikimedia.org/wikipedia/en/f/fc/The_Beatles_-_Hey_Jude.jpg'
    }
];

app.get('/api/musics', (req, res) => {
    res.json(musics);
});

app.get('/api/musics/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const music = musics.find(m => m.id === id);
    if (music) {
        res.json(music);
    } else {
        res.status(404).json({ error: 'Música não encontrada' });
    }
});

app.post('/api/musics', (req, res) => {
    const newMusic = {
        id: musics.length > 0 ? Math.max(...musics.map(m => m.id)) + 1 : 1,
        title: req.body.title,
        artist: req.body.artist,
        duration: req.body.duration,
        cover: req.body.cover
    };
    if (!newMusic.title || !newMusic.artist || !newMusic.duration || !newMusic.cover) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    musics.push(newMusic);
    res.status(201).json(newMusic);
});

app.put('/api/musics/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const musicIndex = musics.findIndex(m => m.id === id);
    if (musicIndex === -1) {
        return res.status(404).json({ error: 'Música não encontrada' });
    }
    const updatedMusic = {
        id,
        title: req.body.title || musics[musicIndex].title,
        artist: req.body.artist || musics[musicIndex].artist,
        duration: req.body.duration || musics[musicIndex].duration,
        cover: req.body.cover || musics[musicIndex].cover
    };
    if (!updatedMusic.title || !updatedMusic.artist || !updatedMusic.duration || !updatedMusic.cover) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    musics[musicIndex] = updatedMusic;
    res.json(updatedMusic);
});

app.delete('/api/musics/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const musicIndex = musics.findIndex(m => m.id === id);
    if (musicIndex === -1) {
        return res.status(404).json({ error: 'Música não encontrada' });
    }
    musics.splice(musicIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});