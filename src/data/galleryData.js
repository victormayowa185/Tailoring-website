// src/data/galleryData.js

const galleryImages = [
  // Ankara Styles
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1663044022596-25bc5df1c6e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5rYXJhJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Ankara dress with modern cut",
    category: "ankara",
    width: 800,
    height: 1200
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1663044022557-7d5d4c1d5318?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5rYXJhJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Ankara two-piece set",
    category: "ankara",
    width: 1200,
    height: 800
  },
  // Suits
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1765815442140-f88e94db8817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1aXQlMjBmYXNoaW9ufGVufDB8fDB8fHww",
    alt: "Classic navy blue suit",
    category: "suit",
    width: 800,
    height: 1000
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1644621596807-a096a25a2773?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN1aXQlMjBmYXNoaW9ufGVufDB8fDB8fHww",
    alt: "Three-piece business suit",
    category: "suit",
    width: 1000,
    height: 800
  },
  // Men's Wear
  {
    id: 5,
    src: "https://media.istockphoto.com/id/2183222014/photo/a-stylish-young-man-poses-in-a-black-coat-and-yellow-beanie-against-a-backdrop.webp?a=1&b=1&s=612x612&w=0&k=20&c=ojTEAbJU_zPls9Flqznqr7_N71vr77BkU5NVW-s2RjM=",
    alt: "Traditional men's agbada",
    category: "men",
    width: 800,
    height: 600
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1662833595899-07c57d617f56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbiUyMGJsYXplciUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    alt: "Men's casual blazer",
    category: "men",
    width: 1200,
    height: 900
  },
  // Women's Wear
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1735553816950-1c1fc4bef3e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwd2VhciUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    alt: "Women's tailored dress",
    category: "women",
    width: 900,
    height: 1200
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1767362828069-3a8c5324be53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWVuJTIwb2ZmaWNlJTIwd2VhciUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    alt: "Women's office wear",
    category: "women",
    width: 800,
    height: 1000
  },
  // Wedding
  {
    id: 9,
    src: "https://plus.unsplash.com/premium_photo-1664299735748-b9eb4dfa6561?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2VkZGluZyUyMGZhc2hpb24lMjB0YWlsb3Jpbmd8ZW58MHx8MHx8fDA%3D",
    alt: "Bridal wedding gown",
    category: "wedding",
    width: 1000,
    height: 800
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1710587384936-b6d796c0eb58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlZGRpbmclMjBmYXNoaW9uJTIwdGFpbG9yaW5nfGVufDB8fDB8fHww",
    alt: "Groom's wedding suit",
    category: "wedding",
    width: 800,
    height: 600
  },
  // More images...
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1601428213234-d415261529b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFua2FyYSUyMHRhaWxvcmluZyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    alt: "Ankara jumpsuit",
    category: "ankara",
    width: 1200,
    height: 900
  },
  {
    id: 12,
    src: "https://media.istockphoto.com/id/1455812211/photo/male-tailor-works-on-elegant-business-suit.webp?a=1&b=1&s=612x612&w=0&k=20&c=nBXLgpLinAKn7Vadqvai__u9h7vB6AtKtUvIZwsrXvI=x",
    alt: "Double-breasted suit",
    category: "suit",
    width: 900,
    height: 1200
  },
];

// Categories data
const categories = [
  { id: "all", name: "All Work" },
  { id: "ankara", name: "Ankara Wear" },
  { id: "suit", name: "Bespoke Suits" },
  { id: "men", name: "Men's Wear" },
  { id: "women", name: "Women's Wear" },
  { id: "wedding", name: "Wedding Attire" },
];

export { galleryImages, categories };