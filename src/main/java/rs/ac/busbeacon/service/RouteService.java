package rs.ac.busbeacon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rs.ac.busbeacon.entity.Bus;
import rs.ac.busbeacon.entity.Route;
import rs.ac.busbeacon.repo.RouteRepository;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository repository;

    public List<Route> getAll() {
        return repository.findAll();
    }

    public Optional<Route> getById(Integer id) {
        return repository.findById(id);
    }

    public Route create(Route entity) {
        Route route = new Route();
        route.setBus(entity.getBus());
        route.setDepartureTime(entity.getDepartureTime());
        route.setArrivalTime(entity.getArrivalTime());
        route.setCreatedAt(LocalDateTime.now());
        return repository.save(route);
    }

    public Route update(Integer id, Route entity) {
        Route route = getById(id).orElseThrow();
        route.setBus(entity.getBus());
        route.setDepartureTime(entity.getDepartureTime());
        route.setArrivalTime(entity.getArrivalTime());
        route.setCreatedAt(LocalDateTime.now());
        return repository.save(route);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

}