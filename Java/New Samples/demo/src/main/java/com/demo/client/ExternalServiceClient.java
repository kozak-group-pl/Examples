package com.demo.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="external-service-integration", url="${spring.cloud.openfeign.client.config.external-service-integration.url}")
public interface ExternalServiceClient {

    @RequestMapping(method = RequestMethod.GET, value = "/external/get_resource", produces = MediaType.APPLICATION_JSON_VALUE)
    Object updateCase(@RequestParam(name = "param1") Integer param1);


}
