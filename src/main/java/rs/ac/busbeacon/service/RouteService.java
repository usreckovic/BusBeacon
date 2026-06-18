package rs.ac.busbeacon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.busbeacon.entity.Route;
import rs.ac.busbeacon.repo.RouteRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RouteService {

    private final RouteRepository repository;

    public List<Route> getAll() {
        return repository.findAllByDeletedAtIsNull();
    }

    public Optional<Route> getById(Integer id) {
        return repository.findByRouteIdAndDeletedAtIsNull(id);
    }

    public Route create(Route entity) {
        entity.setCreatedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    public Route update(Integer id, Route entity) {
        Route route = getById(id).orElseThrow();
        route.setBus(entity.getBus());
        route.setDepartureTime(entity.getDepartureTime());
        route.setArrivalTime(entity.getArrivalTime());
        route.setName(entity.getName());
        route.setUpdatedAt(LocalDateTime.now());
        return repository.save(route);
    }

    public void deleteById(Integer id) {
        Route route = getById(id).orElseThrow();
        route.setDeletedAt(LocalDateTime.now());
        repository.save(route);
    }
}