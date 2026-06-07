package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.busbeacon.repo.StationRepository;
import rs.ac.busbeacon.entity.station;
import java.util.List;

@RestController
@RequestMapping(path = "/api/station")
@RequiredArgsConstructor

public class StationController {

    private final StationRepository repository;

    @GetMapping
    public List<station> getTicket() {
        return repository.findAll();
    }
}
