package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.busbeacon.repo.BusRepository;
import rs.ac.busbeacon.entity.bus;
import java.util.List;

@RestController
@RequestMapping(path = "/api/bus")
@RequiredArgsConstructor

public class BusController {

    private final BusRepository repository;

    @GetMapping
    public List<bus> getBus() {
        return repository.findAll();
    }
}
