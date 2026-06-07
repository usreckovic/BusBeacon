package rs.ac.busbeacon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity(name = "ticket")
@NoArgsConstructor
@Getter
@Setter

public class ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ticketId;

    @Column(nullable = false)
    private Integer routeId;

    @Column(nullable = false)
    private Integer seatNumber;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String qrCode;

    private LocalDateTime createdAt;

    @JsonIgnore
    private LocalDateTime deletedAt;

    private LocalDateTime paidAt;

}
