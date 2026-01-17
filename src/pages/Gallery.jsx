// src/pages/Gallery.jsx
import React, { useState, useEffect } from 'react';
import '../styles/gallery.css';
import { galleryImages, categories } from '../data/galleryData'; // Import from data file

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState("all");
    const [filteredImages, setFilteredImages] = useState(galleryImages);

    // Update filtered images when activeFilter changes
    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredImages(galleryImages);
        } else {
            setFilteredImages(galleryImages.filter(img => img.category === activeFilter));
        }
    }, [activeFilter]);

    const openLightbox = (image) => {
        const index = filteredImages.findIndex(img => img.id === image.id);
        setSelectedImage(image);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const goToPrev = () => {
        const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[newIndex]);
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[newIndex]);
        setCurrentIndex(newIndex);
    };

    const handleKeyDown = (e) => {
        if (!selectedImage) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrev();
        if (e.key === 'ArrowRight') goToNext();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentIndex]);

    return (
        <section className="gallery-section">
            {/* Top accent */}
            <div className="services-top-accent"></div>
            
            {/* Header */}
            <div className="gallery-header">
                <h1>Hassan Tailoring Gallery</h1>
                <p>
                    Explore our collection of bespoke creations. From traditional Ankara
                    to modern suits, each piece showcases exceptional craftsmanship and
                    attention to detail.
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="gallery-filters">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid">
                {filteredImages.map((image) => (
                    <div
                        key={image.id}
                        className="masonry-item"
                        style={{
                            gridRowEnd: `span ${Math.ceil(image.height / 100)}`
                        }}
                        onClick={() => openLightbox(image)}
                    >
                        <div className="image-container">
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                width={image.width}
                                height={image.height}
                            />
                            <div className="image-overlay">
                                <span className="image-category">
                                    {categories.find(c => c.id === image.category)?.name || image.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeLightbox}>
                            &times;
                        </button>

                        <button className="nav-btn prev-btn" onClick={goToPrev}>
                            ‹
                        </button>

                        <div className="lightbox-image-container">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="lightbox-image"
                            />
                            <div className="lightbox-info">
                                <h3>{selectedImage.alt}</h3>
                                <p className="lightbox-category">
                                    {categories.find(c => c.id === selectedImage.category)?.name || selectedImage.category}
                                </p>
                                <p className="lightbox-counter">
                                    {currentIndex + 1} / {filteredImages.length}
                                </p>
                            </div>
                        </div>

                        <button className="nav-btn next-btn" onClick={goToNext}>
                            ›
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;