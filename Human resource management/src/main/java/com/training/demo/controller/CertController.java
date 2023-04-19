package com.training.demo.controller;

import com.training.demo.request.CreateOrUpdateCertRequest;
import com.training.demo.service.CertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class CertController {
    private CertService certService;

    @Autowired
    public CertController(CertService certService) {
        this.certService = certService;
    }

    @PostMapping("/cert/add")
    public ResponseEntity<?> createCert(@Valid @RequestBody CreateOrUpdateCertRequest request){
        return ResponseEntity.ok(certService.createCert(request));
    }

    @GetMapping("/cert")
    public ResponseEntity<?> getCert(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                     @RequestParam(value = "size", defaultValue = "2") Integer size){
        return ResponseEntity.ok(certService.getCert(PageRequest.of(page - 1, size)));
    }

    @GetMapping("/cert/{id}")
    public ResponseEntity<?> getCertById(@PathVariable String id){
        return ResponseEntity.ok(certService.findCertById(id));
    }

    @DeleteMapping("/cert/{id}")
    public ResponseEntity<?> deleteCert(@PathVariable String id){
        certService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/cert/{id}")
    public ResponseEntity<?> updateCert(@PathVariable String id,
                                        @Valid @RequestBody CreateOrUpdateCertRequest request){
        certService.updateById(id, request);
        return ResponseEntity.ok(certService.updateById(id, request));
    }
}
