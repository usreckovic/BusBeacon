package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.busbeacon.entity.Station;
import rs.ac.busbeacon.service.StationService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/station")
@RequiredArgsConstructor

public class StationController {

    private final StationService service;

    @GetMapping
    public List<Station> getStation() {
        return service.getAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Station> getStationById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getById(id));
    }

    @PostMapping
    public Station createStation(@RequestBody Station entity) {
        return service.create(entity);
    }

    @PutMapping(path = "/{id}")
    public Station updateStation(@PathVariable Integer id, @RequestBody Station entity) {
        return service.update(id, entity);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteStationById(@PathVariable Integer id) {
        service.deleteById(id);
    }
}

