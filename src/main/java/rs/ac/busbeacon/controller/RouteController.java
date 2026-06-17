package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.busbeacon.entity.Route;
import rs.ac.busbeacon.service.RouteService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/route")
@RequiredArgsConstructor
public class RouteController {

    private final RouteService service;

    @GetMapping
    public List<Route> getRoute() {
        return service.getAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Route> getBusById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getById(id));
    }

    @PostMapping
    public Route createRoute(@RequestBody Route entity) {
        return service.create(entity);
    }

    @PutMapping(path = "/{id}")
    public Route updateRoute(@PathVariable Integer id, @RequestBody Route entity) {
        return service.update(id, entity);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteBusById(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
