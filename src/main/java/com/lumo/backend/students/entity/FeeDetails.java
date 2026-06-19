package com.lumo.backend.students.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeeDetails {

    @Column(name = "fee_total")
    private BigDecimal totalFee;

    @Column(name = "fee_paid_amount")
    private BigDecimal paidAmount;

    @Column(name = "fee_pending_amount")
    private BigDecimal feePendingAmount;
}
