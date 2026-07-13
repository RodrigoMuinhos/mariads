package com.isismariana.backend.image;

import java.time.Instant;

public record TattooImageResponse(
        Long id,
        String title,
        String altText,
        String category,
        String imageUrl,
        Instant createdAt
) {
    public static TattooImageResponse fromEntity(TattooImage image) {
        return new TattooImageResponse(
                image.getId(),
                image.getTitle(),
                image.getAltText(),
                image.getCategory(),
                image.getImageUrl(),
                image.getCreatedAt()
        );
    }
}