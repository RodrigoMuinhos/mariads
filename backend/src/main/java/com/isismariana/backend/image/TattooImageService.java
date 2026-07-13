package com.isismariana.backend.image;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.isismariana.backend.config.AppProperties;

@Service
public class TattooImageService {

    private final TattooImageRepository repository;
    private final AppProperties properties;

    public TattooImageService(TattooImageRepository repository, AppProperties properties) {
        this.repository = repository;
        this.properties = properties;
    }

    public List<TattooImageResponse> list() {
        return repository.findAll().stream().map(TattooImageResponse::fromEntity).toList();
    }

    public TattooImageResponse upload(MultipartFile file, String title, String altText, String category) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Arquivo de imagem vazio.");
        }

        String originalName = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();

        TattooImage image = new TattooImage();
        image.setTitle(normalizeText(title, originalName));
        image.setAltText(normalizeText(altText, title != null ? title : originalName));
        image.setCategory(normalizeText(category, "geral"));
        image.setOriginalFileName(originalName);
        image.setContentType(file.getContentType() == null ? "application/octet-stream" : file.getContentType());
        image.setImageData(file.getBytes());
        image.setImageUrl("");

        TattooImage saved = repository.save(image);
        saved.setImageUrl(buildPublicUrl(saved.getId()));
        return TattooImageResponse.fromEntity(repository.save(saved));
    }

    public void delete(Long id) {
        TattooImage image = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Imagem não encontrada."));
        repository.delete(image);
    }

    public TattooImage getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Imagem não encontrada."));
    }

    private String buildPublicUrl(Long id) {
        return properties.publicBaseUrl().replaceAll("/$", "") + "/api/images/" + id + "/file";
    }

    private String normalizeText(String value, String fallback) {
        if (value == null || value.trim().isEmpty()) {
            return fallback;
        }
        return value.trim();
    }

}