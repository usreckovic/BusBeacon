package rs.ac.busbeacon.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import rs.ac.busbeacon.entity.Route;
import rs.ac.busbeacon.entity.RouteStation;
import rs.ac.busbeacon.entity.Station;
import rs.ac.busbeacon.entity.Ticket;
import rs.ac.busbeacon.repo.RouteRepository;
import rs.ac.busbeacon.repo.RouteStationRepository;
import rs.ac.busbeacon.repo.StationRepository;
import rs.ac.busbeacon.repo.TicketRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class TicketService {

    private final TicketRepository ticketRepository;
    private final RouteStationRepository routeStationRepository;
    private final RouteRepository routeRepository;
    private final StationRepository stationRepository;

    private static final int ONE_WAY_PRICE_PER_SEGMENT = 500;
    private static final int RETURN_PRICE_PER_SEGMENT = 250;

    public List<Ticket> getAll() {
        return ticketRepository.findAllByDeletedAtIsNull();
    }

    public Optional<Ticket> getById(Integer id) {
        return ticketRepository.findOneByTicketIdAndDeletedAtIsNull(id);
    }

    private String generateUniqueTicketNumber() {
        Random random = new Random();
        String ticketNumber;
        do {
            long number = 1_000_000_000L + (long)(random.nextDouble() * 9_000_000_000L);
            ticketNumber = String.valueOf(number);
        } while (ticketRepository.existsByTicketNumber(ticketNumber));
        return ticketNumber;
    }

    public int calculatePrice(Integer fromStationId, Integer toStationId, String tripType) {
        Integer routeId = routeStationRepository.findRouteIdByStations(fromStationId, toStationId);
        if (routeId == null) {
            throw new IllegalArgumentException("No route connects these stations");
        }
        List<RouteStation> stations = routeStationRepository.findByRouteRouteIdOrderByStationOrderAsc(routeId);

        Integer fromOrder = stations.stream()
                .filter(rs -> rs.getStation().getStationId().equals(fromStationId))
                .map(RouteStation::getStationOrder)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("From station not on this route"));

        Integer toOrder = stations.stream()
                .filter(rs -> rs.getStation().getStationId().equals(toStationId))
                .map(RouteStation::getStationOrder)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("To station not on this route"));

        int segmentCount = Math.abs(fromOrder - toOrder);

        if ("One-Way".equalsIgnoreCase(tripType)) {
            return segmentCount * ONE_WAY_PRICE_PER_SEGMENT;
        } else {
            return segmentCount * (ONE_WAY_PRICE_PER_SEGMENT + RETURN_PRICE_PER_SEGMENT);
        }
    }

    public Ticket create(Integer fromStationId, Integer toStationId, String tripType, String travelDateStart, String travelDateEnd) {
        Integer routeId = routeStationRepository.findRouteIdByStations(fromStationId, toStationId);
        if (routeId == null) {
            throw new IllegalArgumentException("No route connects these stations");
        }

        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new IllegalArgumentException("Route not found"));

        Station fromStation = stationRepository.findById(fromStationId)
                .orElseThrow(() -> new IllegalArgumentException("From station not found"));
        Station toStation = stationRepository.findById(toStationId)
                .orElseThrow(() -> new IllegalArgumentException("To station not found"));

        int price = calculatePrice(fromStationId, toStationId, tripType);

        Ticket ticket = new Ticket();
        ticket.setRoute(route);
        ticket.setFromStation(fromStation);
        ticket.setToStation(toStation);
        ticket.setTripType(tripType);
        ticket.setPrice(price);
        ticket.setTicketNumber(generateUniqueTicketNumber());
        ticket.setTravelDateStart(LocalDate.parse(travelDateStart));
        if (travelDateEnd != null && !travelDateEnd.isEmpty()) {
            ticket.setTravelDateEnd(LocalDate.parse(travelDateEnd));
        }
        ticket.setCreatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public Ticket update(Integer id, Ticket entity) {
        Ticket ticket = getById(id).orElseThrow();
        ticket.setFromStation(entity.getFromStation());
        ticket.setToStation(entity.getToStation());
        ticket.setTripType(entity.getTripType());
        ticket.setTravelDateStart(entity.getTravelDateStart());
        ticket.setPrice(entity.getPrice());
        ticket.setTravelDateEnd(entity.getTravelDateEnd());
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    public void deleteById(Integer id) {
        Ticket ticket = getById(id).orElseThrow();
        ticket.setDeletedAt(LocalDateTime.now());
        ticketRepository.save(ticket);
    }
}