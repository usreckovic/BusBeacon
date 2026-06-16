package rs.ac.busbeacon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "bus")
@NoArgsConstructor
@Getter
@Setter

public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer busId;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String imagePath;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private boolean ac;

    private LocalDateTime createdAt;

    @JsonIgnore
    private LocalDateTime deletedAt;

    private LocalDateTime updatedAt;

}
