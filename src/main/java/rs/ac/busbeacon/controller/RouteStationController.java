package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rs.ac.busbeacon.entity.RouteStation;
import rs.ac.busbeacon.service.RouteStationService;

import java.util.List;

@RestController
@RequestMapping("/api/route-station")
@RequiredArgsConstructor
public class RouteStationController {

    private final RouteStationService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RouteStation addStation(
            @RequestParam Integer routeId,
            @RequestParam Integer stationId,
            @RequestParam Integer stationOrder
    ) {
        return service.addStation(routeId, stationId, stationOrder);
    }

    @GetMapping
    public List<RouteStation> getByRoute(@RequestParam Integer routeId) {
        return service.getByRoute(routeId);
    }

    @DeleteMapping("/route/{routeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByRoute(@PathVariable Integer routeId) {
        service.deleteByRoute(routeId);
    }
}