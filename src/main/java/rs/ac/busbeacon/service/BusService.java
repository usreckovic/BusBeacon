package rs.ac.busbeacon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rs.ac.busbeacon.entity.Bus;
import rs.ac.busbeacon.repo.BusRepository;

@Service
@RequiredArgsConstructor
public class BusService {

    private final BusRepository repository;

    public List<Bus> getAll() {
        return repository.findAllByDeletedAtIsNull();
    }

    public Optional<Bus> getById(Integer id) {
        return repository.findOneByBusIdAndDeletedAtIsNull(id);
    }

    public Bus create(Bus entity) {
        Bus bus = new Bus();
        bus.setBrand(entity.getBrand());
        bus.setCapacity(entity.getCapacity());
        bus.setAc(entity.isAc());
        bus.setImagePath(entity.getImagePath());
        bus.setYear(entity.getYear());
        bus.setCreatedAt(LocalDateTime.now());
        return repository.save(bus);
    }

    public Bus update(Integer id, Bus entity) {
        Bus bus = getById(id).orElseThrow();
        bus.setBrand(entity.getBrand());
        bus.setCapacity(entity.getCapacity());
        bus.setAc(entity.isAc());
        bus.setImagePath(entity.getImagePath());
        bus.setYear(entity.getYear());
        bus.setUpdatedAt(LocalDateTime.now());
        return repository.save(bus);
    }

    public void deleteById(Integer id) {
        Bus Bus = getById(id).orElseThrow();
        Bus.setDeletedAt(LocalDateTime.now());
        repository.save(Bus);
    }
}