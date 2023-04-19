package com.training.demo.repository;

import com.training.demo.dto.CategoryDto;
import com.training.demo.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = "SELECT new com.training.demo.dto.CategoryDto(c.id, c.name) FROM Category c")
    List<CategoryDto> findListCategories();
}
