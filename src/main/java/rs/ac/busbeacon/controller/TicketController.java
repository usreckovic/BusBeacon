package rs.ac.busbeacon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.busbeacon.entity.Ticket;
import rs.ac.busbeacon.service.TicketService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAll();
    }

    @GetMapping("/price")
    public ResponseEntity<Integer> getPrice(
            @RequestParam Integer fromStationId,
            @RequestParam Integer toStationId,
            @RequestParam String tripType
    ) {
        int price = ticketService.calculatePrice(fromStationId, toStationId, tripType);
        return ResponseEntity.ok(price);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Integer id) {
        return ticketService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket createTicket(
            @RequestParam Integer fromStationId,
            @RequestParam Integer toStationId,
            @RequestParam String tripType,
            @RequestParam String travelDateStart,
            @RequestParam(required = false) String travelDateEnd
    ) {
        return ticketService.create(fromStationId, toStationId, tripType, travelDateStart, travelDateEnd);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Integer id, @RequestBody Ticket ticket) {
        return ticketService.update(id, ticket);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTicket(@PathVariable Integer id) {
        ticketService.deleteById(id);
    }
}