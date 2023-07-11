package com.carffeine.carffeine.service.chargerStation.dto;

import java.math.BigDecimal;

public record CoordinateRequest(
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal latitudeDelta,
        BigDecimal longitudeDelta
) {
}