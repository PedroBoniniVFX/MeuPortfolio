// Portfolio data configuration - All images from Imagems_Do_Site folder
const portfolioData = [
    {
        id: '3d',
        title: '3D',
        description: 'Edição de Vídeo - Modelagem & Animação 3D',
        image: './Imagems_Do_Site/3D.png',
        category: 'vfx'
    },
    {
        id: 'adidas',
        title: 'ADIDAS',
        description: 'Edição de Vídeo - Performance & Lifestyle',
        image: './Imagems_Do_Site/Adidas.jpg',
        category: 'commercial'
    },
    {
        id: 'apple',
        title: 'APPLE',
        description: 'Edição de Vídeo - Think Different Experience',
        image: './Imagems_Do_Site/Apple.jpg',
        category: 'tech'
    },
    {
        id: 'burger-king',
        title: 'BURGER KING',
        description: 'Edição de Vídeo - Conteúdo Criativo Fast Food',
        image: './Imagems_Do_Site/Burguer KIng.jpg',
        category: 'commercial'
    },
    {
        id: 'coca-cola',
        title: 'COCA-COLA',
        description: 'Edição de Vídeo - Storytelling de Marca',
        image: './Imagems_Do_Site/Coca Cola.jpg',
        category: 'commercial'
    },
    {
        id: 'gaming',
        title: 'GAMING',
        description: 'Edição de Vídeo - Conteúdo Gaming',
        image: './Imagems_Do_Site/Gaming.png',
        category: 'gaming'
    },
    {
        id: 'the-last-of-us',
        title: 'THE LAST OF US',
        description: 'Edição de Vídeo - Efeitos Visuais',
        image: './Imagems_Do_Site/HBO Max - The Last Of US.jpeg',
        category: 'entertainment'
    },
    {
        id: 'heineken',
        title: 'HEINEKEN',
        description: 'Edição de Vídeo - Tributo Ayrton Senna',
        image: './Imagems_Do_Site/Heineken.jpg',
        category: 'commercial'
    },
    {
        id: 'liza',
        title: 'LIZA CASEIRA',
        description: 'Edição de Vídeo - Sabor em Movimento',
        image: './Imagems_Do_Site/Liza.png',
        category: 'commercial'
    },
    {
        id: 'matue',
        title: 'MATUÊ',
        description: 'Edição de Vídeo - Show Musical',
        image: './Imagems_Do_Site/Matuê Rock in rio 2024.jpg',
        category: 'music'
    },
    {
        id: 'mc-hariel',
        title: 'MC HARIEL',
        description: 'Edição de Vídeo - Documentário Musical',
        image: './Imagems_Do_Site/Mc Hariel.png',
        category: 'music'
    },
    {
        id: 'mcdonalds',
        title: 'MCDONALD\'S',
        description: 'Edição de Vídeo - Experiência Visual Gastronômica',
        image: './Imagems_Do_Site/McDonals.jpg',
        category: 'commercial'
    },
    {
        id: 'mibr',
        title: 'MIBR',
        description: 'Edição de Vídeo - Projetos Exclusivos da Org',
        image: './Imagems_Do_Site/MIBR.jpg',
        category: 'gaming'
    },
    {
        id: 'monster-energy',
        title: 'MONSTER ENERGY',
        description: 'Edição de Vídeo - Comercial 3D',
        image: './Imagems_Do_Site/Monster Energy.jpg',
        category: 'commercial'
    },
    {
        id: 'outback',
        title: 'OUTBACK MULTISHOW',
        description: 'Edição de Vídeo - Experiência Gastronômica Musical',
        image: './Imagems_Do_Site/Outback multi show.jpg',
        category: 'commercial'
    },
    {
        id: 'puma',
        title: 'PUMA',
        description: 'Edição de Vídeo - Energia & Movimento',
        image: './Imagems_Do_Site/PUMA.jpg',
        category: 'commercial'
    },
    {
        id: 'red-bull',
        title: 'RED BULL',
        description: 'Edição de Vídeo - Comercial 3D',
        image: './Imagems_Do_Site/Red Bull.jpg',
        category: 'commercial'
    },
    {
        id: 'riot-games',
        title: 'RIOT GAMES BRASIL',
        description: 'Edição de Vídeo - Valorant, LoL & Universo Riot',
        image: './Imagems_Do_Site/Riot Games.jpg',
        category: 'gaming'
    },
    {
        id: 'samsung',
        title: 'SAMSUNG',
        description: 'Edição de Vídeo - Tecnologia',
        image: './Imagems_Do_Site/samsung.jpg',
        category: 'tech'
    },
    {
        id: 'spotify',
        title: 'SPOTIFY',
        description: 'Edição de Vídeo - Conteúdo Musical',
        image: './Imagems_Do_Site/Spotify.jpg',
        category: 'music'
    },
    {
        id: 'vivo',
        title: 'VIVO',
        description: 'Edição de Vídeo - Conexão & Inovação Digital',
        image: './Imagems_Do_Site/vivo.jpg',
        category: 'tech'
    }
];

// Software data configuration
const softwareData = [
    {
        name: 'Adobe After Effects',
        logo: './assets/images/software/after-effects.png',
        class: 'after-effects'
    },
    {
        name: 'Adobe Premiere',
        logo: './assets/images/software/premiere.png',
        class: 'premiere'
    },
    {
        name: 'Adobe Photoshop',
        logo: './assets/images/software/photoshop.png',
        class: 'photoshop'
    },
    {
        name: 'DaVinci Resolve',
        logo: './assets/images/software/davinci.png',
        class: 'davinci'
    },
    {
        name: 'Blender',
        logo: './assets/images/software/blender.png',
        class: 'blender'
    },
    {
        name: 'Autodesk Maya',
        logo: './assets/images/software/maya.png',
        class: 'maya'
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, softwareData };
}