// src/pages/Gallery.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { client, urlFor } from '../sanity/client'; 
import '../styles/gallery.css';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState("all");
    const [categories, setCategories] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories and gallery images from Sanity
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch categories
                const categoriesQuery = `*[_type == "category"]{
                    _id,
                    title,
                    "slug": slug.current
                }`;
                const fetchedCategories = await client.fetch(categoriesQuery);
                // Add "All" category manually
                const allCategory = { _id: 'all', title: 'All Work', slug: 'all' };
                setCategories([allCategory, ...fetchedCategories]);

                // Fetch gallery images with category reference and image metadata
                const imagesQuery = `*[_type == "galleryImage"]{
                    _id,
                    title,
                    "slug": slug.current,
                    image{
                        asset->{
                            url,
                            metadata {
                                dimensions {
                                    width,
                                    height
                                }
                            }
                        }
                    },
                    category->{
                        _id,
                        title,
                        slug
                    },
                    description
                } | order(_createdAt desc)`;
                const fetchedImages = await client.fetch(imagesQuery);
                setGalleryImages(fetchedImages);
                setFilteredImages(fetchedImages);
            } catch (err) {
                console.error('Error fetching gallery data:', err);
                setError('Failed to load gallery. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Update filtered images when activeFilter changes
    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredImages(galleryImages);
        } else {
            setFilteredImages(galleryImages.filter(img => img.category?._id === activeFilter));
        }
    }, [activeFilter, galleryImages]);

    const openLightbox = (image) => {
        const index = filteredImages.findIndex(img => img._id === image._id);
        setSelectedImage(image);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    }, []);

    const goToPrev = useCallback(() => {
        if (filteredImages.length === 0) return;
        const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[newIndex]);
        setCurrentIndex(newIndex);
    }, [currentIndex, filteredImages]);

    const goToNext = useCallback(() => {
        if (filteredImages.length === 0) return;
        const newIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[newIndex]);
        setCurrentIndex(newIndex);
    }, [currentIndex, filteredImages]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, closeLightbox, goToPrev, goToNext]);

    if (loading) {
        return <div className="gallery-loading">Loading gallery...</div>;
    }

    if (error) {
        return <div className="gallery-error">{error}</div>;
    }

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
                        key={category._id}
                        className={`filter-btn ${activeFilter === category._id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category._id)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid">
                {filteredImages.map((image) => {
                    // Get image dimensions from metadata (if available)
                    const height = image.image?.asset?.metadata?.dimensions?.height || 800;
                    const width = image.image?.asset?.metadata?.dimensions?.width || 600;
                    // Calculate span (adjust the divisor to your liking, e.g., 100)
                    const span = Math.ceil(height / 100);
                    return (
                        <div
                            key={image._id}
                            className="masonry-item"
                            style={{
                                gridRowEnd: `span ${span}`
                            }}
                            onClick={() => openLightbox(image)}
                        >
                            <div className="image-container">
                                <img
                                    src={urlFor(image.image).width(600).url()}
                                    alt={image.title}
                                    loading="lazy"
                                    width={width}
                                    height={height}
                                />
                                <div className="image-overlay">
                                    <span className="image-category">
                                        {image.category?.title || 'Uncategorized'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
                                src={urlFor(selectedImage.image).width(1200).url()}
                                alt={selectedImage.title}
                                className="lightbox-image"
                            />
                            <div className="lightbox-info">
                                <h3>{selectedImage.title}</h3>
                                <p className="lightbox-category">
                                    {selectedImage.category?.title || 'Uncategorized'}
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