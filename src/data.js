export const headlineCards = [
    {
        id: 1,
        title: "The Future of AI in Healthcare",
        excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnosis and patient care",
        category: "Technology",
        readTime: "5 min read",
        author: {
            name: "Dr. Sarah Chen",
            avatar: "/authors/sarah-chen.jpg"
        },
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
        date: "2025-10-01",
        views: 1240,
        likes: 89
    },
    {
        id: 2,
        title: "Sustainable Architecture Trends",
        excerpt: "New approaches to eco-friendly building design and urban planning",
        category: "Architecture",
        readTime: "8 min read",
        author: {
            name: "Mark Reynolds",
            avatar: "/authors/mark-reynolds.jpg"
        },
        thumbnail: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3",
        date: "2025-09-28",
        views: 856,
        likes: 76
    },
    {
        id: 3,
        title: "The Rise of Plant-Based Cuisine",
        excerpt: "How vegetarian and vegan food is reshaping restaurant menus worldwide",
        category: "Food",
        readTime: "6 min read",
        author: {
            name: "Lisa Thompson",
            avatar: "/authors/lisa-thompson.jpg"
        },
        thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3",
        date: "2025-09-25",
        views: 1102,
        likes: 134
    },
    {
        id: 4,
        title: "Digital Minimalism in 2025",
        excerpt: "Practical steps to declutter your digital life and improve productivity",
        category: "Lifestyle",
        readTime: "7 min read",
        author: {
            name: "James Wright",
            avatar: "/authors/james-wright.jpg"
        },
        thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3",
        date: "2025-09-22",
        views: 967,
        likes: 92
    }
];

// Article statuses for filtering/categorizing
export const articleStatuses = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
};

// Categories with their respective colors (for category badges/tags)
export const categories = {
    Technology: {
        color: '#8A38F5', // Using our primary purple
        icon: 'tech-icon.svg'
    },
    Architecture: {
        color: '#2D9CDB',
        icon: 'architecture-icon.svg'
    },
    Food: {
        color: '#27AE60',
        icon: 'food-icon.svg'
    },
    Lifestyle: {
        color: '#F2994A',
        icon: 'lifestyle-icon.svg'
    }
};

// Sample filters for the cards (can be used for filtering functionality)
export const filters = [
    { id: 'latest', label: 'Latest' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'trending', label: 'Trending' }
];
