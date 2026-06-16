package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.busbeacon.entity.Bus;
import rs.ac.busbeacon.service.BusService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/bus")
@RequiredArgsConstructor
public class BusController {

    private final BusService service;

    @GetMapping
    public List<Bus> getBus() {
        return service.getAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Bus> getBusById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getById(id));
    }

    @PostMapping
    public Bus createBus(@RequestBody Bus entity) {
        return service.create(entity);
    }

    @PutMapping(path = "/{id}")
    public Bus updateBus(@PathVariable Integer id, @RequestBody Bus entity) {
        return service.update(id, entity);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteBusById(@PathVariable Integer id) {
        service.deleteById(id);
    }
}

