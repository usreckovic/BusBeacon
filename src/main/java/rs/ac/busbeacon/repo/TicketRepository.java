package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.Ticket;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findAllByDeletedAtIsNull();

    Optional<Ticket> findOneByTicketIdAndDeletedAtIsNull(Integer ticketId);

    boolean existsByTicketNumber(String ticketNumber);
}