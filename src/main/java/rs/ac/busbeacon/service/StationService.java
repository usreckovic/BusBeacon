package rs.ac.busbeacon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import rs.ac.busbeacon.entity.Station;
import rs.ac.busbeacon.repo.StationRepository;

@Service
@RequiredArgsConstructor
public class StationService {

    private final StationRepository repository;

    public List<Station> getAll() {
        return repository.findAllByDeletedAtIsNull();
    }

    public Optional<Station> getById(Integer id) {
        return repository.findOneByStationIdAndDeletedAtIsNull(id);
    }

    public Station create(Station entity) {
        Station station = new Station();
        station.setCity(entity.getCity());
        station.setAddress(entity.getAddress());
        station.setGates(entity.getGates());
        station.setCreatedAt(LocalDateTime.now());
        return repository.save(station);
    }

    public Station update(Integer id, Station entity) {
        Station station = getById(id).orElseThrow();
        station.setCity(entity.getCity());
        station.setAddress(entity.getAddress());
        station.setGates(entity.getGates());
        station.setUpdatedAt(LocalDateTime.now());
        return repository.save(station);
    }

    public void deleteById(Integer id) {
        Station station = getById(id).orElseThrow();
        station.setDeletedAt(LocalDateTime.now());
        repository.save(station);
    }
}