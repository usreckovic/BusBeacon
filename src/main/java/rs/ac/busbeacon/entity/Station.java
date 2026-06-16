package rs.ac.busbeacon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "station")
@NoArgsConstructor
@Getter
@Setter

public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stationId;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String adress;

    private LocalDateTime createdAt;

    @JsonIgnore
    private LocalDateTime deletedAt;

    private LocalDateTime updatedAt;

}
