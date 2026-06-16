package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.busbeacon.repo.TicketRepository;
import rs.ac.busbeacon.entity.Ticket;
import java.util.List;

@RestController
@RequestMapping(path = "/api/ticket")
@RequiredArgsConstructor

public class TicketController {

    private final TicketRepository repository;

    @GetMapping
    public List<Ticket> getTicket() {
        return repository.findAll();
    }
}
