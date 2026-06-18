package rs.ac.busbeacon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.busbeacon.entity.Route;
import rs.ac.busbeacon.entity.RouteStation;
import rs.ac.busbeacon.entity.Station;
import rs.ac.busbeacon.repo.RouteRepository;
import rs.ac.busbeacon.repo.RouteStationRepository;
import rs.ac.busbeacon.repo.StationRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RouteStationService {

    private final RouteStationRepository repository;
    private final RouteRepository routeRepository;
    private final StationRepository stationRepository;

    public RouteStation addStation(Integer routeId, Integer stationId, Integer stationOrder) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new RuntimeException("Route not found"));
        Station station = stationRepository.findById(stationId)
                .orElseThrow(() -> new RuntimeException("Station not found"));

        RouteStation rs = new RouteStation();
        rs.setRoute(route);
        rs.setStation(station);
        rs.setStationOrder(stationOrder);
        return repository.save(rs);
    }

    public List<RouteStation> getByRoute(Integer routeId) {
        return repository.findByRouteRouteIdOrderByStationOrderAsc(routeId);
    }

    public void deleteByRoute(Integer routeId) {
        repository.deleteByRouteId(routeId);
    }
}