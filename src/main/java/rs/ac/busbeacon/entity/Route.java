package rs.ac.busbeacon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.busbeacon.entity.Bus;

import java.time.LocalDateTime;

@Entity(name = "route")
@NoArgsConstructor
@Getter
@Setter
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeId;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    private LocalDateTime departureTime;

    private LocalDateTime arrivalTime;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
