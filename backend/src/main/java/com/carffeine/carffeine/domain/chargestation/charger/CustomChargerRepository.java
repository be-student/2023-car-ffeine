package com.carffeine.carffeine.domain.chargestation.charger;

import java.util.List;

public interface CustomChargerRepository {

    void saveAll(List<Charger> chargers);
}