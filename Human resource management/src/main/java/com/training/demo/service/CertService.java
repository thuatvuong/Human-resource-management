package com.training.demo.service;

import com.training.demo.entities.Category;
import com.training.demo.entities.Cert;
import com.training.demo.exception.BadRequestException;
import com.training.demo.exception.NotFoundException;
import com.training.demo.repository.CategoryRepository;
import com.training.demo.repository.CertRepository;
import com.training.demo.request.CreateOrUpdateCertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CertService {

    @Autowired
    private CertRepository certRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Category findCategoryById(Integer id){
        return categoryRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Category with " + id + " does not exist");
        });
    }

    public Cert findCertById(String id){
        return certRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Cert with " + id + " does not exist");
        });
    }
    @Transactional
    public Cert createCert(CreateOrUpdateCertRequest request){
        Category category = findCategoryById(request.getCateId());

        String certId = request.getId();
        certRepository.findById(certId)
                .ifPresent(el -> {
                    throw new BadRequestException(certId + " already exist");
                });

        Cert cert = Cert.builder()
                .id(certId)
                .name(request.getCertName())
                .cost(request.getCost())
                .category(category)
                .build();
        return certRepository.save(cert);
    }

    public Page<Cert> getCert(Pageable pageable) {
        return certRepository.findAll(pageable);
    }

    @Transactional
    public void deleteById(String id) {
        certRepository.deleteById(id);
    }

    @Transactional
    public Cert updateById(String id, CreateOrUpdateCertRequest request) {
        Category category = findCategoryById(request.getCateId());
        Cert cert = findCertById(id);
        cert.setName(request.getCertName());
        cert.setCost(request.getCost());
        cert.setCategory(category);
        return cert;
    }
}
