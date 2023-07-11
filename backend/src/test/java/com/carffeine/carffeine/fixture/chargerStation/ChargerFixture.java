package com.carffeine.carffeine.fixture.chargerStation;

import com.carffeine.carffeine.domain.chargerStation.charger.Charger;
import com.carffeine.carffeine.domain.chargerStation.charger.ChargerState;
import com.carffeine.carffeine.domain.chargerStation.charger.ChargerStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class ChargerFixture {

    public static final Charger 선릉역_충전기_1번_사용가능 = Charger.builder()
            .stationId("ME101010")
            .chargerId("01")
            .price(BigDecimal.valueOf(324.4))
            .method("단독")
            .address("서울특별시 강남구 선릉로100길 2 선릉역1")
            .capacity(BigDecimal.valueOf(50.0))
            .type("급속")
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("01")
                    .chargerState(ChargerState.STANDBY)
                    .latestUpdateTime(LocalDateTime.now())
                    .build())
            .build();

    public static final Charger 선릉역_충전기_2번_사용_중 = Charger.builder()
            .stationId("ME101010")
            .chargerId("02")
            .price(BigDecimal.valueOf(324.4))
            .method("단독")
            .address("서울특별시 강남구 선릉로100길 2 선릉역2")
            .capacity(BigDecimal.valueOf(50.0))
            .type("급속")
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("02")
                    .chargerState(ChargerState.CHARGING_IN_PROGRESS)
                    .latestUpdateTime(LocalDateTime.now())
                    .build())
            .build();
}