package com.training.demo.repository;

import com.training.demo.entities.Cert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertRepository extends JpaRepository<Cert, String> {


}
