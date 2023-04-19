package com.training.demo.entities;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cert")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Cert {

    @Id
    @Column(name = "id", columnDefinition = "varchar(12)")
    private String id;

    @Column(name = "cert_name", nullable = false)
    private String name;

    @Column(name = "cost", nullable = false, precision = 5, scale = 1)
    private BigDecimal cost;

    @ManyToOne
    @JoinColumn(name = "CategoryId", referencedColumnName = "id")
    private Category category;
}
