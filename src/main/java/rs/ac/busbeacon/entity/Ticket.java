package rs.ac.busbeacon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "ticket")
@NoArgsConstructor
@Getter
@Setter

public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ticketId;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    @ManyToOne
    @JoinColumn(name = "to_station_id", nullable = false)
    private Station toStation;

    @ManyToOne
    @JoinColumn(name = "from_station_id", nullable = false)
    private Station fromStation;

    @Column(columnDefinition = "ENUM('One-Way','Round-Trip')")
    private String tripType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, unique = true)
    private String ticketNumber;

    @Column(nullable = false)
    private LocalDate travelDateStart;

    @Column
    private LocalDate travelDateEnd;

    private LocalDateTime createdAt;

    @JsonIgnore
    private LocalDateTime deletedAt;

    private LocalDateTime updatedAt;

}
