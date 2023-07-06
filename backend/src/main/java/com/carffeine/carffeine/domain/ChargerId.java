package com.carffeine.carffeine.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChargerId implements Serializable {

    private String stationId;

    private String chargerId;
}