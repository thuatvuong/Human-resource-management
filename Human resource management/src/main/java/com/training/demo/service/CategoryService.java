package com.training.demo.service;

import com.training.demo.dto.CategoryDto;
import com.training.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

     @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDto> getListCategory() {
        return categoryRepository.findListCategories();
    }
}
