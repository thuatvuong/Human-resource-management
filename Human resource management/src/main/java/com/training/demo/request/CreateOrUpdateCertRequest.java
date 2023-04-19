package com.training.demo.request;

import lombok.*;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CreateOrUpdateCertRequest {
    @Pattern(regexp = "^[a-zA-Z0-9-]{1,12}$", message = "Id wrong format!")
    @NotEmpty(message = "Id cannot empty")
    private String id;

    @NotEmpty(message = "Certificate's name cannot empty")
    private String certName;

    @NotNull(message = "Cost cannot empty")
    private BigDecimal cost;

    @NotNull(message = "Category's id cannot empty")
    private Integer cateId;
}
