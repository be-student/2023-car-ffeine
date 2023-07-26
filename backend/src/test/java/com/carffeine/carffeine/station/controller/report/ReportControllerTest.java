package com.carffeine.carffeine.station.controller.report;

import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.service.report.ReportService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(ReportController.class)
@AutoConfigureRestDocs
class ReportControllerTest {

    @MockBean
    private ReportService reportService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 충전소_id가_존재하지_않다면_NOT_FOUND_예외가_발생한다() throws Exception {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        long memberId = 12L;

        // when
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .id(1L)
                .memberId(memberId)
                .build();

        when(reportService.saveFaultReport(station.getStationId(), memberId)).thenReturn(faultReport);

        // then
        mockMvc.perform(post("/api/stations/{stationId}/reports", station.getStationId())
                        .header(HttpHeaders.AUTHORIZATION, memberId))

                .andExpect(status().isNoContent())
                .andDo(customDocument("save-report",
                        requestHeaders(headerWithName("Authorization").description("회원 id.")),
                        pathParameters(parameterWithName("stationId").description("충전소 id")))
                );
    }
}